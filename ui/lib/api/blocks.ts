import type { BlockWithTransactions } from "alchemy-sdk";
import { alchemyClient } from "../alchemyClient";
import pLimit from "p-limit";

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
