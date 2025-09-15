/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { setGlobalOptions } from "firebase-functions";
import * as logger from "firebase-functions/logger";

import { onSchedule } from "firebase-functions/v2/scheduler";
import * as admin from "firebase-admin";
import { GraphQLClient, gql } from "graphql-request";

import { defineString } from "firebase-functions/params";

import { Alchemy, Network } from "alchemy-sdk";
import type { Token, TopTokensResponse } from "@/types/index";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({ maxInstances: 10 });

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
admin.initializeApp();

const bitqueryApiKey = defineString("BITQUERY_API_KEY");
const alchemyApiKey = defineString("ALCHEMY_API_KEY");

const GET_TOP_TOKENS = gql`
  query topTokens($network: evm_network, $time_ago: DateTime!) {
    EVM(network: $network) {
      DEXTradeByTokens(
        orderBy: { descendingByField: "usd" }
        limit: { count: 10 }
        where: {
          TransactionStatus: { Success: true }
          Block: { Time: { since: $time_ago } }
        }
      ) {
        Trade {
          Currency {
            Symbol
            SmartContract
            Fungible
            Name
          }
          Amount(maximum: Block_Number)
          AmountInUSD(maximum: Block_Number)
        }
        pairs: uniq(of: Trade_Side_Currency_SmartContract)
        dexes: uniq(of: Trade_Dex_SmartContract)
        amount: sum(of: Trade_Amount)
        usd: sum(of: Trade_AmountInUSD)
        buyers: uniq(of: Trade_Buyer)
        sellers: uniq(of: Trade_Sender)
        count
      }
    }
  }
`;

export const fetchTopTokens = onSchedule("every 12 hours", async () => {
  logger.info("Fetching top tokens from Bitquery...");

  const alchemySettings = {
    apiKey: alchemyApiKey.value(), // Assumes you've set this config
    network: Network.ETH_MAINNET,
  };
  const alchemyClient = new Alchemy(alchemySettings);
  const bitqueryClient = new GraphQLClient(
    "https://streaming.bitquery.io/graphql",
    {
      headers: {
        authorization: `Bearer ${bitqueryApiKey.value()}`,
      },
    }
  );

  try {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const variables = {
      network: "eth",
      time_ago: oneDayAgo,
    };

    const bitqueryData = await bitqueryClient.request<TopTokensResponse>(
      GET_TOP_TOKENS,
      variables
    );

    if (!bitqueryData?.EVM?.DEXTradeByTokens) {
      throw new Error("Invalid data structure from Bitquery");
    }

    const tokensWithLogos = await Promise.all(
      bitqueryData.EVM.DEXTradeByTokens.map(async (token: Token) => {
        const contractAddress = token.Trade.Currency.SmartContract;
        let logo = null;

        if (contractAddress) {
          if (contractAddress === "0x") {
            logo = "https://static.cdnlogo.com/logos/e/81/ethereum-eth.svg";
          } else {
            try {
              const metadata = await alchemyClient.core.getTokenMetadata(
                contractAddress
              );

              if (!metadata) {
                return "";
              }

              logo = metadata.logo;
            } catch (e) {
              logger.warn(`Could not fetch metadata for ${contractAddress}`, e);
            }
          }
        }

        return {
          ...token,
          logo,
        };
      })
    );

    const dataToStore = {
      ...bitqueryData,
      EVM: {
        ...bitqueryData.EVM,
        DEXTradeByTokens: tokensWithLogos,
      },
    };

    const db = admin.firestore();
    const docRef = db.collection("bitquery-data").doc("top-tokens");

    await docRef.set({
      ...dataToStore,
      updatedAt: new Date().toISOString(),
    });

    logger.info("Successfully fetched and stored top tokens.");
  } catch (error) {
    logger.error("Error fetching top tokens:", error);
  }
});
