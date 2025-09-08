export type FormattedBlock = {
  hash: string;
  number: string;
  numTransactions: number;
  difficulty: string;
  miner: string;
  baseFeePerGas?: string;
  utcTimestamp: string;
  timeSince: string;
  gasLimit: string;
  gasUsed: string;
};
