import type { BlockWithTransactions } from "alchemy-sdk";
import { formatBlockInfo } from "@/lib/utils/block";

interface LatestBlockProps {
  blocks: Promise<BlockWithTransactions[]>;
}

export default async function LatestBlock({ blocks }: LatestBlockProps) {
  const latestBlocks = await blocks;
  const formattedBlock = formatBlockInfo(latestBlocks[0]);

  if (!formattedBlock) {
    return (
      <div className="flex justify-center items-center h-40 text-red-400">
        <p>Could not fetch the latest block.</p>
      </div>
    );
  }
  return (
    <div className="p-3">
      <div className="text-lg font-bold mb-2">{formattedBlock.number}</div>
      <div className="grid grid-cols-[max-content_1fr] gap-x-4 gap-y-1">
        <span className="font-semibold text-white">Time:</span>
        <span>
          {formattedBlock.timeSince} ({formattedBlock.utcTimestamp})
        </span>

        <span className="font-semibold text-white">Transactions:</span>
        <span>{formattedBlock.numTransactions}</span>

        <span className="font-semibold text-white">Gas Limit:</span>
        <span>{formattedBlock.gasLimit}</span>

        <span className="font-semibold text-white">Gas Used:</span>
        <span>{formattedBlock.gasUsed}</span>

        {formattedBlock.baseFeePerGas && (
          <>
            <span className="font-semibold text-white">Base fee per gas:</span>
            <span>{formattedBlock.baseFeePerGas} gwei</span>
          </>
        )}

        <span className="font-semibold text-white">Block Hash:</span>
        <span>{formattedBlock.hash}</span>

        <span className="font-semibold text-white">Total difficulty:</span>
        <span>{formattedBlock.difficulty}</span>

        <span className="font-semibold text-white">Miner:</span>
        <span className="truncate">{formattedBlock.miner}</span>
      </div>
    </div>
  );
}
