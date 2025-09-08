import {
  HistoricalPriceInterval,
  type HistoricalPriceDataPoint,
} from "alchemy-sdk";
import type { Address } from "viem";
import type {
  FormattedToken,
  Token,
  TokenLogo,
  TopTokensResponse,
} from "@/types/tokens";
import { alchemyClient } from "../alchemyClient";
import { bitqueryClient } from "../bitqueryClient";
import { GET_TOP_TOKENS } from "@/lib/service/queries";
import { formatToken } from "../utils/token";
import { APP_CONFIG } from "@/config/app";

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

export const getTopTokens = async (): Promise<FormattedToken[]> => {
  // Since 30 days ago
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  let logos: TokenLogo[] = [];
  try {
    const topTokensResponse = await bitqueryClient.request<TopTokensResponse>(
      GET_TOP_TOKENS,
      { network: "eth", time_ago: since }
    );

    // Fetch logos from Alchemy's token metadata
    const fetchLogo = async (contractAddress: Address): Promise<TokenLogo> => {
      const tokenMetadata = await alchemyClient.core.getTokenMetadata(
        contractAddress
      );
      if (!tokenMetadata) {
        return { symbol: "", logo: "" };
      }
      return { symbol: tokenMetadata.symbol, logo: tokenMetadata.logo };
    };

    const logoPromises = topTokensResponse.EVM.DEXTradeByTokens.map(
      (token: Token) => {
        const contractAddress = token.Trade.Currency.SmartContract;
        if (contractAddress === "0x") {
          return Promise.resolve({ symbol: "ETH", logo: "" });
        }
        return fetchLogo(contractAddress);
      }
    );

    logos = await Promise.all(logoPromises);

    return topTokensResponse.EVM.DEXTradeByTokens.map((token) => {
      let logo = "";
      const match = logos.find(
        (logo) => logo.symbol === token.Trade.Currency.Symbol
      );
      if (match) {
        logo = match.logo || "";
      }

      if (token.Trade.Currency.Symbol === "ETH") {
        logo = APP_CONFIG.ethTokenMetadata.logo;
      }

      return {
        ...formatToken(token),
        logo,
      };
    });
  } catch (error) {
    console.error("Could not find the top tokens. Please try again.", error);
    return [];
  }
};
