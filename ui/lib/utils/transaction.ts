import { TransactionResponse } from "alchemy-sdk";
import type { FormattedTransaction } from "@/types/transactions";
import { formatAddress, formatHash, formatNumber } from "./formatters";
import { formatUnits, formatEther } from "ethers";

export const formatTransaction = (
  transaction: TransactionResponse,
  tokenPrice: string
): FormattedTransaction | null => {
  if (!transaction) return null;

  let gasPrice = "unknown";
  let gasPriceEth = "unknown";
  if (transaction.gasPrice) {
    gasPrice = formatUnits(transaction.gasPrice.toString(), "gwei");
    gasPriceEth = formatEther(transaction.gasPrice?.toString());
  }

  let valueCurrency = "unknown";
  if (tokenPrice) {
    valueCurrency = (
      parseFloat(formatEther(transaction.value.toString())) *
      parseFloat(tokenPrice)
    ).toFixed(2);
  }

  return {
    hash: formatHash(transaction.hash),
    chainId: transaction.chainId.toString(),
    // @ts-ignore
    transactionIndex: transaction.transactionIndex ?? 0,
    from: formatAddress(transaction.from),
    to: formatAddress(transaction.to),
    nonce: transaction.nonce,
    value: formatEther(transaction.value.toString()),
    valueCurrency: valueCurrency.toString(),
    gasLimit: formatNumber(BigInt(transaction.gasLimit.toString())),
    gasPrice,
    gasPriceEth,
    blockNumber: formatNumber(transaction.blockNumber),
    data: transaction.data,
  };
};
