"use server";

import type {
  FormattedWalletToken,
  WalletResponseData,
  WalletToken,
} from "@/types/wallet";
import { formatWalletToken, sortTokensByBalance } from "../utils/token";
import { APP_CONFIG } from "@/config/app";

export const getTokensForAddress = async (address: string) => {
  let tokens: FormattedWalletToken[] = [];

  try {
    const tokenBalancesResponse = await fetch(
      "https://api.g.alchemy.com/data/v1/assets/tokens/by-address",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.ALCHEMY_API_KEY}`,
        },
        body: JSON.stringify({
          addresses: [
            {
              address: address,
              networks: ["eth-mainnet"],
            },
          ],
        }),
      }
    );

    const tokenBalancesResponseData: WalletResponseData =
      await tokenBalancesResponse.json();

    const tokenMetadata = tokenBalancesResponseData.data.tokens.map(
      (token: WalletToken) => {
        const tokenData: WalletToken = token;

        if (!token.tokenAddress) {
          tokenData.tokenMetadata = APP_CONFIG.ethTokenMetadata;
        }
        return tokenData;
      }
    );

    tokens = sortTokensByBalance(tokenMetadata).map(formatWalletToken);
  } catch (error) {
    console.error("Error fetching token balances:", error);
    throw error;
  }

  return tokens;
};
