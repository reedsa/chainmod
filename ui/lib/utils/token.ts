import type { WalletToken, FormattedWalletToken } from "@/types/wallet";
import {
  formatAddress,
  formatAmountDecimals,
  formatPriceCurrency,
} from "./formatters";

export const formatWalletToken = (token: WalletToken): FormattedWalletToken => {
  let formattedTokenBalance = formatAmountDecimals(
    token.tokenBalance,
    token.tokenMetadata.decimals
  );

  if (formattedTokenBalance !== 0) {
    formattedTokenBalance = parseFloat(formattedTokenBalance.toFixed(3));
  }

  return {
    address: formatAddress(token.address),
    network: token.network,
    tokenAddress: formatAddress(token.tokenAddress),
    tokenBalance: formattedTokenBalance.toString(),
    tokenBalanceCurrency: formatPriceCurrency(token),
    tokenMetadata: token.tokenMetadata,
    tokenPrices: token.tokenPrices,
    error: token.error,
  };
};

export function sortTokensByBalance(tokens: WalletToken[]): WalletToken[] {
  return tokens.sort((tokenA, tokenB) => {
    if (!tokenA.tokenPrices.length && !tokenB.tokenPrices.length) {
      return 0;
    }

    let currencyAValue = 0;
    if (tokenA.tokenPrices.length) {
      currencyAValue =
        formatAmountDecimals(
          tokenA.tokenBalance,
          tokenA.tokenMetadata.decimals
        ) * parseFloat(tokenA.tokenPrices[0].value);
    }

    let currencyBValue = 0;
    if (tokenB.tokenPrices.length) {
      currencyBValue =
        formatAmountDecimals(
          tokenB.tokenBalance,
          tokenB.tokenMetadata.decimals
        ) * parseFloat(tokenB.tokenPrices[0].value);
    }

    return currencyBValue - currencyAValue;
  });
}
