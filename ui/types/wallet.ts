import type { Address } from "viem";

export type WalletToken = {
  address: Address;
  network: string;
  tokenAddress: Address;
  tokenBalance: string;
  tokenMetadata: TokenMetadata;
  tokenPrices: TokenPrice[];
  error: string;
};

export type WalletResponseData = {
  data: {
    tokens: WalletToken[];
  };
};

export type TokenMetadata = {
  decimals: number;
  logo: string;
  name: string;
  symbol: string;
};

export type TokenPrice = {
  currency: string;
  value: string;
  lastUpdatedAt: string;
};

export type FormattedWalletToken = {
  address: string;
  network: string;
  tokenAddress: string;
  tokenBalance: string;
  tokenBalanceCurrency: string;
  tokenMetadata: TokenMetadata;
  tokenPrices: TokenPrice[];
  error: string;
};
