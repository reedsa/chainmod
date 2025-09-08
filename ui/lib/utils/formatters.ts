import { ethers } from "ethers";
import type { Address } from "viem";
import type { WalletToken } from "@/types/wallet";

export const formatAddress = (address?: Address | string | null): string => {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const formatHash = (hash?: string | null) => {
  if (!hash) return "";
  return `${hash.slice(0, 12)}...`;
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

export const formatTimestamp = (timestamp?: number | null) => {
  if (timestamp === null || timestamp === undefined) return "unknown";
  return new Date(timestamp * 1000).toUTCString();
};

export const timeSince = (timestamp?: number | null): string => {
  if (timestamp === null || timestamp === undefined) return "unknown";
  const seconds = Math.floor(Date.now() / 1000 - timestamp);

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
};
