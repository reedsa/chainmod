"use client";

import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/16/solid";
import Loading from "../../components/Loading";
import TransactionsContainer from "./TransactionsChart/TransactionsContainer";
import { useChainData } from "@/lib/context/ChainDataContext";

export default function ChainStatus() {
  const data = useChainData();

  if (!data || !data.tokenPrices) {
    return <Loading>Loading the latest token price...</Loading>;
  }

  if (data.tokenPrices.length === 0) {
    return (
      <div className="flex justify-center items-center h-40 text-red-400">
        <p>Could not fetch the latest token price.</p>
      </div>
    );
  }

  const latestTokenPrice = parseFloat(data.tokenPrices[1].value);
  const prevTokenPrice = parseFloat(data.tokenPrices[0].value);
  const priceDiff = latestTokenPrice - prevTokenPrice;
  const priceChange = (
    ((prevTokenPrice - latestTokenPrice) / prevTokenPrice) *
    100
  ).toFixed(2);

  return (
    <div className="flex p-3">
      <div className="flex-1">
        <h2 className="uppercase text-xs">Ether Price</h2>
        <div className="flex flex-row items-center">
          <span className="text-xl text-white mr-2">${latestTokenPrice}</span>
          <div className="flex flex-row items-center text-sm">
            {priceDiff > 0 ? (
              <div className="flex flex-row items-center text-green-300">
                <ArrowUpIcon className="size-5" /> ({priceChange}% 24h)
              </div>
            ) : (
              <div className="flex flex-row items-center text-red-300">
                <ArrowDownIcon className="size-5" />({priceChange}% 24h)
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        className="flex-1 flex-col items-center justify-items-end"
        data-cy="transactions-chart"
      >
        <TransactionsContainer />
      </div>
    </div>
  );
}
