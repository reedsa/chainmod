import type { Token } from "@/types/tokens";
import { sortTokensByBalance } from "./token";

const mockToken: Token = {
  Trade: {
    Currency: {
      SmartContract: "0x1234567890abcdef1234567890abcdef12345678",
      Name: "TestToken",
      Symbol: "TTK",
      Fungible: true,
    },
    Amount: "1",
    AmountInUSD: "1",
  },
  amount: "1234.5678",
  buyers: "1",
  sellers: "1",
  usd: "1",
  dexes: "1",
  pairs: "1",
  count: "1",
};

describe("Token Formatters", () => {
  describe("sortTokensByBalance", () => {
    it("sorts tokens by balance in descending order", () => {
      const tokens = [
        {
          tokenBalance: "1",
          tokenMetadata: {
            symbol: "TKA",
            decimals: 18,
          },
          tokenPrices: [
            {
              value: "10",
            },
          ],
        },
        {
          tokenBalance: "2",
          tokenMetadata: {
            symbol: "TKB",
            decimals: 18,
          },
          tokenPrices: [
            {
              value: "10",
            },
          ],
        },
        {
          tokenBalance: "3",
          tokenMetadata: {
            symbol: "TKC",
            decimals: 18,
          },
          tokenPrices: [
            {
              value: "10",
            },
          ],
        },
      ];
      const result = sortTokensByBalance(tokens as any);
      const sortedTokens = result.map((token) => token.tokenMetadata.symbol);
      expect(sortedTokens).toEqual(["TKC", "TKB", "TKA"]);
    });

    it("returns an empty array if given an empty array", () => {
      const tokens: any[] = [];
      const result = sortTokensByBalance(tokens);
      expect(result).toEqual([]);
    });

    it("handles an array with a single token", () => {
      const tokens = [
        {
          tokenBalance: "1",
          tokenMetadata: {
            symbol: "TKA",
            decimals: 18,
          },
          tokenPrices: [
            {
              value: "10",
            },
          ],
        },
      ];
      const result = sortTokensByBalance(tokens as any);
      expect(result).toEqual([
        {
          tokenBalance: "1",
          tokenMetadata: {
            symbol: "TKA",
            decimals: 18,
          },
          tokenPrices: [
            {
              value: "10",
            },
          ],
        },
      ]);
    });

    it("correctly sorts tokens with equal balances", () => {
      const tokens = [
        {
          tokenBalance: "5",
          tokenMetadata: {
            symbol: "TKA",
            decimals: 18,
          },
          tokenPrices: [
            {
              value: "10",
            },
          ],
        },
        {
          tokenBalance: "5",
          tokenMetadata: {
            symbol: "TKB",
            decimals: 18,
          },
          tokenPrices: [
            {
              value: "10",
            },
          ],
        },
        {
          tokenBalance: "6",
          tokenMetadata: {
            symbol: "TKC",
            decimals: 18,
          },
          tokenPrices: [
            {
              value: "10",
            },
          ],
        },
      ];
      const result = sortTokensByBalance(tokens as any);
      // The order of tokens with equal balances is not guaranteed to be stable,
      // but they should be grouped together after the larger balance.
      expect(result[0].tokenMetadata.symbol).toEqual("TKC");
      expect(result[1].tokenBalance).toEqual("5");
      expect(result[2].tokenBalance).toEqual("5");
    });
  });
});
