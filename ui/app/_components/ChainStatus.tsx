import type { HistoricalPriceDataPoint } from "alchemy-sdk";
import { Suspense } from "react";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/16/solid";
import Loading from "../../components/Loading";
import TransactionsContainer from "./TransactionsChart/TransactionsContainer";

interface ChainStatusProps {
  tokenPrices: Promise<HistoricalPriceDataPoint[]>;
}

export default async function ChainStatus({ tokenPrices }: ChainStatusProps) {
  const [{ value: prevTokenValue }, { value: latestTokenValue }] =
    await tokenPrices;
  const latestTokenPrice = parseFloat(latestTokenValue);
  const prevTokenPrice = parseFloat(prevTokenValue);
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
        <Suspense
          fallback={
            <Loading width="300px" height="120px">
              Loading historical transactions...
            </Loading>
          }
        >
          <TransactionsContainer />
        </Suspense>
      </div>
    </div>
  );
}
