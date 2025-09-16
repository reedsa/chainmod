"use client";

import Loading from "@/components/Loading";
import { getLatestTransactions } from "@/lib/api/blocks";
import { useChainData } from "@/lib/context/ChainDataContext";
import { FormattedTransaction } from "@/types/transactions";
import { useEffect, useState } from "react";

export default function LatestTransactions() {
  const data = useChainData();
  const [latestTransactions, setLatestTransactions] = useState<
    (FormattedTransaction | null)[] | null
  >(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (data && data.blocks && data.tokenPrices) {
        const transactions = await getLatestTransactions(
          data.blocks,
          data.tokenPrices[0].value
        );
        setLatestTransactions(transactions);
      }
    };
    fetchTransactions();
  }, [data]);

  if (!latestTransactions) {
    return <Loading>Loading latest transactions...</Loading>;
  }

  if (latestTransactions.length === 0) {
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
