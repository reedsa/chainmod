import { APP_CONFIG } from "@/config/app";
import type { TransactionCounts } from "@/types/transactions";
import { getLatestBlocks } from "@/lib/api/blocks";
import TransactionsChart from "./TransactionsChart";

const TransactionsContainer = async () => {
  const blocks = await getLatestBlocks(APP_CONFIG.maxBlocksHistory);

  let totalTransactions = 0;
  const data: TransactionCounts[] = blocks.reduce(
    (acc: TransactionCounts[], block, index) => {
      const chunkIndex = Math.floor(index / 10);
      if (!acc[chunkIndex]) {
        const startBlock = blocks[chunkIndex * 10].number;
        const endBlock =
          blocks[Math.min(chunkIndex * 10 + 9, blocks.length - 1)].number;
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
