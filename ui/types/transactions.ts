export type FormattedTransaction = {
  hash?: string;
  blockNumber: string;
  transactionIndex: number;

  to?: string;
  from?: string;
  nonce: number;

  gasLimit: string;
  gasPrice: string;
  gasPriceEth: string;

  data: string;
  value: string;
  valueCurrency: string;
  chainId: string;

  maxPriorityFeePerGas?: string;
  maxFeePerGas?: string;
};

export type TransactionCounts = {
  name: string;
  count: number;
};
