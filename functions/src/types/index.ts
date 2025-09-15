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
  logo: string;
};

export type TopTokensResponse = {
  EVM: {
    DEXTradeByTokens: Token[];
  };
};
