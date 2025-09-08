import { useEffect, useState } from "react";
import type { Address } from "viem";
import type { FormattedWalletToken } from "@/types/wallet";
import { getTokensForAddress } from "../api/wallet";

export const useTokenBalances = (address: Address) => {
  const [tokens, setTokens] = useState<FormattedWalletToken[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getTokenBalancesForAccount = async (address: string) => {
      try {
        setIsLoading(true);
        const tokens = await getTokensForAddress(address);
        setTokens(tokens);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (address) {
      getTokenBalancesForAccount(address);
    }
  }, [address]);

  return { tokens, isLoading, error };
};
