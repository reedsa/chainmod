"use client";

import { APP_CONFIG } from "@/config/app";
import type { TransactionCounts } from "@/types/transactions";
import { getLatestBlocks } from "@/lib/api/blocks";
import TransactionsChart from "./TransactionsChart";
import { useEffect, useState } from "react";
import { BlockWithTransactions } from "alchemy-sdk";
import Loading from "@/components/Loading";

const TransactionsContainer = () => {
  const [latestBlocks, setLatestBlocks] = useState<
    BlockWithTransactions[] | null
  >(null);
  useEffect(() => {
    const fetchLatestBlocks = async () => {
      const latestBlocks = await getLatestBlocks(APP_CONFIG.maxBlocksHistory);
      setLatestBlocks(latestBlocks);
    };

    fetchLatestBlocks();
  }, []);

  if (!latestBlocks) {
    return <Loading>Loading historical transactions...</Loading>;
  }

  if (latestBlocks.length === 0) {
    return (
      <div className="flex justify-center items-center h-40 text-red-400">
        <p>Could not fetch the historical transactions.</p>
      </div>
    );
  }

  let totalTransactions = 0;
  const data: TransactionCounts[] = latestBlocks.reduce(
    (acc: TransactionCounts[], block: BlockWithTransactions, index: number) => {
      const chunkIndex = Math.floor(index / 10);
      if (!acc[chunkIndex]) {
        const startBlock = latestBlocks[chunkIndex * 10].number;
        const endBlock =
          latestBlocks[Math.min(chunkIndex * 10 + 9, latestBlocks.length - 1)]
            .number;
        acc[chunkIndex] = {
          name: `${startBlock}-${endBlock}`,
          count: 0,
        };
      }
      acc[chunkIndex].count += block.transactions.length;
      totalTransactions += block.transactions.length;
      return acc;
    },
    []
  );

  return (
    <>
      <TransactionsChart data={data} />
      <div
        className="text-sm text-white font-bold"
        data-cy="transactions-count"
      >
        Transactions (Last 100 Blocks): {totalTransactions}
      </div>
    </>
  );
};

export default TransactionsContainer;
