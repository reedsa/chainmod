"use client";

import Image from "next/image";
import type { Address } from "viem";
import { useTokenBalances } from "@/lib/hooks/useTokenBalances";
import Loading from "@/components/Loading";

interface TokensProps {
  address: Address;
}

const Tokens = ({ address }: TokensProps) => {
  const { tokens, isLoading, error } = useTokenBalances(address);

  if (isLoading) {
    return <Loading>Loading tokens for wallet...</Loading>;
  }

  if (error) {
    return `There was an error fetching tokens for the account ${address}`;
  }

  if (!tokens) {
    return `No tokens found for account ${address}`;
  }

  return (
    <ul className="space-y-2 text-sm text-gray-300" data-cy="tokens-list">
      {tokens &&
        tokens.map(
          (
            {
              tokenAddress,
              tokenBalance,
              tokenBalanceCurrency,
              tokenMetadata: { name, logo, symbol },
            },
            index
          ) => (
            <li
              key={tokenAddress}
              className={`p-3 rounded-lg ${
                index % 2 === 0 ? "bg-gray-700" : "bg-gray-600"
              }`}
            >
              <div className="flex items-center gap-4">
                <div>
                  {logo ? (
                    <Image
                      src={logo}
                      alt={symbol}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-gray-600 rounded-full" />
                  )}
                </div>
                <div className="flex-1">
                  <span className="font-semibold text-white">{name}</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-bold text-lg">
                    {tokenBalanceCurrency}
                  </span>
                  <span className="text-sm">
                    {tokenBalance} {symbol}
                  </span>
                </div>
              </div>
            </li>
          )
        )}
    </ul>
  );
};

export default Tokens;
