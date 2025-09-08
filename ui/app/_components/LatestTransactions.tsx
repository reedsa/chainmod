import type {
  BlockWithTransactions,
  HistoricalPriceDataPoint,
} from "alchemy-sdk";
import { getLatestTransactions } from "@/lib/api/blocks";

interface LatestTransactionsProps {
  blocks: Promise<BlockWithTransactions[]>;
  tokenPrices: Promise<HistoricalPriceDataPoint[]>;
}

export default async function LatestTransactions({
  blocks,
  tokenPrices,
}: LatestTransactionsProps) {
  const latestBlocks = await blocks;
  const [{ value: latestTokenPrice }] = await tokenPrices;
  const latestTransactions = await getLatestTransactions(
    latestBlocks,
    latestTokenPrice
  );

  if (!latestTransactions) {
    return (
      <div className="flex justify-center items-center h-40 text-red-400">
        <p>Could not fetch the latest transactions.</p>
      </div>
    );
  }

  return (
    <ul className="space-y-2" data-cy="transactions-list">
      {latestTransactions.length > 0 &&
        latestTransactions
          .filter((transaction) => !!transaction)
          .map((transaction, index) => (
            <li
              key={transaction.hash}
              className={`p-3 rounded-lg grid grid-cols-[auto_1fr] gap-x-4 ${
                index % 2 === 0 ? "bg-gray-700" : "bg-gray-600"
              }`}
            >
              <span className="font-semibold text-white">Hash:</span>
              <span className="truncate">{transaction.hash}</span>

              <span className="font-semibold text-white">From:</span>
              <span className="truncate">{transaction.from}</span>

              <span className="font-semibold text-white">To:</span>
              <span className="truncate">{transaction.to}</span>

              <span className="font-semibold text-white">Value:</span>
              <span>
                {transaction.value} ETH (${transaction.valueCurrency})
              </span>

              <span className="font-semibold text-white">Gas Price:</span>
              <span>
                {transaction.gasPrice} gwei ({transaction.gasPriceEth} ETH)
              </span>
            </li>
          ))}
    </ul>
  );
}
