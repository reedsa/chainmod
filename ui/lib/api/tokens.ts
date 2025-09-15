import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  HistoricalPriceInterval,
  type HistoricalPriceDataPoint,
} from "alchemy-sdk";
import type { FormattedToken, TopTokensResponse } from "@/types/tokens";
import { alchemyClient } from "../alchemyClient";
import { formatToken } from "../utils/token";

export const getTokenPrices = async (
  tokenSymbol: string
): Promise<HistoricalPriceDataPoint[]> => {
  try {
    const tokenPriceResponses =
      await alchemyClient.prices.getHistoricalPriceBySymbol(
        tokenSymbol,
        new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
        new Date().toISOString(),
        HistoricalPriceInterval.ONE_DAY
      );

    const tokenPrices: HistoricalPriceDataPoint[] =
      tokenPriceResponses.data.map((historicalPrice) => {
        return {
          ...historicalPrice,
          value: parseFloat(historicalPrice.value).toFixed(2),
        };
      });

    return tokenPrices;
  } catch (error) {
    console.error("Failed to retrieve chain data", error);
    return [];
  }
};

export const getTopTokenData = async (): Promise<TopTokensResponse | null> => {
  const docRef = doc(db, "bitquery-data", "top-tokens");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as TopTokensResponse;
  } else {
    console.log("No tokens were found. Please try again later.");
    return null;
  }
};

export const getTopTokens = async (): Promise<FormattedToken[]> => {
  // Since 30 days ago
  try {
    const topTokensResponse = await getTopTokenData();

    if (!topTokensResponse) {
      console.error("There was an error fetching the data for the top tokens.");
      return [];
    }

    return topTokensResponse.EVM.DEXTradeByTokens.map((token) =>
      formatToken(token)
    );
  } catch (error) {
    console.error("Could not find the top tokens. Please try again.", error);
    return [];
  }
};
