import type { Address } from "viem";

export type Token = {
  Trade: {
    Amount: string;
    AmountInUSD: string;
    Currency: {
      Fungible: boolean;
      Name: string;
      SmartContract: Address;
      Symbol: string;
    };
  };
  amount: string;
  buyers: string;
  count: string;
  dexes: string;
  pairs: string;
  sellers: string;
  usd: string;
};

export type TopTokensResponse = {
  EVM: {
    DEXTradeByTokens: Token[];
  };
};

export type TokenLogo = {
  symbol: string | null;
  logo: string | null;
};

export type FormattedToken = {
  contractAddress: string;
  name: string;
  symbol: string;
  amount: string;
  buyers: string;
  sellers: string;
  usd: string;
  logo: string;
};
