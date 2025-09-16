"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { getTokenPrices } from "@/lib/api/tokens";
import { getLatestBlocks } from "@/lib/api/blocks";
import { BlockWithTransactions, HistoricalPriceDataPoint } from "alchemy-sdk";

// Define the shape of your context data
interface ChainData {
  tokenPrices: HistoricalPriceDataPoint[];
  blocks: BlockWithTransactions[];
}

// Create the context
const ChainDataContext = createContext<ChainData | null>(null);

// Create the Provider component
export function ChainDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<ChainData | null>(null);

  useEffect(() => {
    async function fetchData() {
      const [prices, blockData] = await Promise.all([
        getTokenPrices("ETH"),
        getLatestBlocks(),
      ]);
      setData({ tokenPrices: prices, blocks: blockData });
    }

    fetchData();
    const intervalId = setInterval(fetchData, 30000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <ChainDataContext.Provider value={data}>
      {children}
    </ChainDataContext.Provider>
  );
}

// Create a custom hook for easy access to the context
export function useChainData() {
  const context = useContext(ChainDataContext);
  if (context === undefined) {
    throw new Error("useChainData must be used within a ChainDataProvider");
  }
  return context;
}
