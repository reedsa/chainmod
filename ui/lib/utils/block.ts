import { formatUnits } from "ethers";
import type { Block, BlockWithTransactions } from "alchemy-sdk";
import {
  formatAddress,
  formatHash,
  formatNumber,
  formatTimestamp,
  timeSince,
} from "./formatters";
import type { FormattedBlock } from "@/types/blocks";

export const formatBlockInfo = (
  block?: Block | BlockWithTransactions | null
): FormattedBlock | null => {
  if (!block) return null;

  let baseFeePerGas = "unknown";
  if (block.baseFeePerGas !== null && block.baseFeePerGas !== undefined) {
    baseFeePerGas = formatUnits(block.baseFeePerGas.toString(), "gwei");
  }

  return {
    hash: formatHash(block.hash),
    number: formatNumber(block.number),
    numTransactions: block.transactions.length,
    difficulty: block.difficulty.toString(),
    miner: formatAddress(block.miner),
    baseFeePerGas,
    utcTimestamp: formatTimestamp(block.timestamp),
    timeSince: timeSince(block.timestamp),
    gasLimit: formatNumber(BigInt(block.gasLimit.toString())),
    gasUsed: formatNumber(BigInt(block.gasUsed.toString())),
  };
};
