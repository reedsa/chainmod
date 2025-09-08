import { ethers } from "ethers";
import type { Address } from "viem";
import type { WalletToken } from "@/types/wallet";

export const formatAddress = (address?: Address | string | null): string => {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const formatNumber = (
  number?: number | bigint | null,
  options?: Intl.NumberFormatOptions
): string => {
  if (number === null || number === undefined) return "unknown";
  return new Intl.NumberFormat("en-US", { ...options }).format(number);
};

export function formatAmountDecimals(
  hexAmount: string,
  decimals: number
): number {
  if (hexAmount === null || hexAmount === undefined) return 0;

  let amount = 0n;
  try {
    amount = ethers.toBigInt(hexAmount);
  } catch (error: any) {
    throw error;
  }

  if (amount === 0n) {
    return 0;
  }

  const formattedAmount = ethers.formatUnits(amount, decimals);
  return parseFloat(formattedAmount);
}

export function formatPriceCurrency(token: WalletToken): string {
  if (!token) return "unknown";

  const {
    tokenBalance,
    tokenPrices,
    tokenMetadata: { decimals },
  } = token;

  if (!tokenPrices || tokenPrices.length === 0) {
    return "unknown";
  }

  const { currency, value } = tokenPrices[0];

  if (isNaN(parseFloat(value))) {
    return "unknown";
  }

  const currencyValue =
    formatAmountDecimals(tokenBalance, decimals) * parseFloat(value);
  return formatNumber(currencyValue, { style: "currency", currency });
}
