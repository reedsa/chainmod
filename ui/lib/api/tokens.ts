import {
  HistoricalPriceInterval,
  type HistoricalPriceDataPoint,
} from "alchemy-sdk";
import { alchemyClient } from "../alchemyClient";

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
