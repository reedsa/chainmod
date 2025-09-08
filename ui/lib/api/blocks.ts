import type { BlockWithTransactions, TransactionResponse } from "alchemy-sdk";
import { alchemyClient } from "../alchemyClient";
import pLimit from "p-limit";
import type { FormattedTransaction } from "@/types/transactions";
import { formatTransaction } from "../utils/transaction";

export const getLatestBlocks = async (
  numBlocks: number = 10
): Promise<BlockWithTransactions[]> => {
  const limit = pLimit(10);

  let latestBlockNumber = 0;
  try {
    latestBlockNumber = await alchemyClient.core.getBlockNumber();

    if (!latestBlockNumber) {
      throw new Error("Could not get the latest block. Please try again.");
    }

    let latestBlockPromises: Promise<BlockWithTransactions>[] = [];
    for (let i = 0; i < numBlocks; i++) {
      const blockNumber = latestBlockNumber - i;
      latestBlockPromises.push(
        limit(() => alchemyClient.core.getBlockWithTransactions(blockNumber))
      );
    }

    return await Promise.all(latestBlockPromises);
  } catch (error) {
    console.error("Failed to retrieve blocks:", error);
    return [];
  }
};

export const getLatestTransactions = async (
  blocks: BlockWithTransactions[],
  tokenPrice: string,
  numTransactions: number = 10
): Promise<(FormattedTransaction | null)[]> => {
  try {
    let allTransactions: TransactionResponse[] = [];

    for (const block of blocks) {
      if (allTransactions.length >= numTransactions) break;

      if (block && block.transactions) {
        allTransactions = [...block.transactions, ...allTransactions];
      }
    }

    allTransactions.sort((a, b) => {
      if (a.blockNumber !== b.blockNumber) {
        return (a.blockNumber ?? 0) - (b.blockNumber ?? 0);
      }

      // @ts-ignore
      return (a.transactionIndex ?? 0) - (b.transactionIndex ?? 0);
    });

    return allTransactions.slice(-numTransactions).map((txn) => {
      const formattedTxn = formatTransaction(txn, tokenPrice);
      if (!formattedTxn) {
        console.error("Failed to format transaction:", txn);
        return null;
      }
      return formattedTxn;
    });
  } catch (error) {
    console.error("Failed to retrieve transactions:", error);
    return [];
  }
};
