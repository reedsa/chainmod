import type { WalletToken } from "@/types/wallet";
import {
  formatNumber,
  formatAddress,
  formatAmountDecimals,
  formatPriceCurrency,
} from "./formatters";
import { ethers } from "ethers";

describe("formatter utils", () => {
  describe("formatNumber", () => {
    it("should return an empty string for null or undefined input", () => {
      expect(formatNumber(null)).toBe("unknown");
      expect(formatNumber(undefined)).toBe("unknown");
    });

    it("should format a number with commas", () => {
      expect(formatNumber(1234567)).toBe("1,234,567");
    });

    it("should not format a number less than 1000", () => {
      expect(formatNumber(999)).toBe("999");
    });

    it("should correctly format 0", () => {
      expect(formatNumber(0)).toBe("0");
    });

    it("should handle large numbers", () => {
      expect(formatNumber(123456789012345)).toBe("123,456,789,012,345");
    });
  });

  describe("formatAddress", () => {
    it("should return 'unknown' for null, undefined, or empty input", () => {
      expect(formatAddress(null)).toBe("");
      expect(formatAddress(undefined)).toBe("");
      expect(formatAddress("")).toBe("");
    });

    it("should correctly truncate a standard Ethereum address", () => {
      const address = "0x1234567890abcdef1234567890abcdef12345678";
      const expected = "0x1234...5678";
      expect(formatAddress(address)).toBe(expected);
    });

    it("should handle addresses that are not hex strings", () => {
      const nonHexString = "not_a_hex_string_but_long_enough_to_be_truncated";
      const expected = "not_a_...ated";
      expect(formatAddress(nonHexString)).toBe(expected);
    });
  });

  describe("formatAmountDecimals", () => {
    it("should return 'unknown' for null or undefined input", () => {
      expect(formatAmountDecimals(null, 18)).toBe(0);
      expect(formatAmountDecimals(undefined, 18)).toBe(0);
    });

    it("should throw for non-numeric string input", () => {
      expect(() => formatAmountDecimals("not-a-number", 18)).toThrow();
    });

    it("should correctly format a large number string with 18 decimals", () => {
      const amount = "1000000000000000000"; // 1 ETH
      expect(formatAmountDecimals(amount, 18)).toBe(1);
    });

    it("should correctly format a value with fractional parts", () => {
      const amount = "1500000000000000000"; // 1.5 ETH
      expect(formatAmountDecimals(amount, 18)).toBe(1.5);
    });

    it("should correctly format a small fractional value", () => {
      const amount = "1000000000000000"; // 0.001 ETH
      expect(formatAmountDecimals(amount, 18)).toBe(0.001);
    });

    it("should correctly format zero", () => {
      const amount = "0";
      expect(formatAmountDecimals(amount, 18)).toBe(0);
    });

    it("should add commas to large formatted numbers", () => {
      const amount = "1234567000000000000000000"; // 1,234,567 ETH
      expect(formatAmountDecimals(amount, 18)).toBe(1234567);
    });

    it("should handle different decimal places (e.g., 6 for USDC)", () => {
      const amount = "50000000"; // 50 USDC
      expect(formatAmountDecimals(amount, 6)).toBe(50);
    });

    it("should handle fractional parts with 6 decimals", () => {
      const amount = "1234567"; // 1.234567 USDC
      expect(formatAmountDecimals(amount, 6)).toBe(1.234567);
    });

    it("should handle zero decimals", () => {
      const amount = "12345";
      expect(formatAmountDecimals(amount, 0)).toBe(12345);
    });

    it("should handle very small numbers that round to a few decimal places", () => {
      const amount = "123456789012345"; // approx 0.000123456
      expect(formatAmountDecimals(amount, 18, 6)).toBe(0.000123456789012345);
    });

    it("should handle rounding up", () => {
      const amount = "987654321098765"; // approx 0.000987654
      expect(formatAmountDecimals(amount, 18, 6)).toBe(0.000987654321098765);
    });

    it("should show all decimals if precision is not specified", () => {
      const amount = "123456789012345678"; // 0.123456789012345678
      expect(formatAmountDecimals(amount, 18)).toBe(0.12345678901234568);
    });
  });

  describe("formatPriceCurrency", () => {
    const defaultMockToken: WalletToken = {
      tokenBalance: ethers.parseUnits("1", 18).toString(),
      tokenPrices: [
        {
          value: "25.5",
          currency: "usd",
          lastUpdatedAt: new Date().toISOString(),
        },
      ],
      tokenMetadata: { decimals: 18, logo: "", name: "Token", symbol: "TKN" },
      address: "0x",
      tokenAddress: "0x",
      network: "eth-mainnet",
      error: "",
    };

    const getMockToken = (value: string = "100"): WalletToken => ({
      ...defaultMockToken,
      tokenPrices: [{ ...defaultMockToken.tokenPrices[0], value }],
    });

    it("should return 'unknown' for null or undefined input", () => {
      expect(formatPriceCurrency(null)).toBe("unknown");
      expect(formatPriceCurrency(undefined)).toBe("unknown");
    });

    it("should format a standard price", () => {
      expect(formatPriceCurrency(getMockToken("25.5"))).toBe("$25.50");
    });

    it("should format large prices with commas", () => {
      expect(formatPriceCurrency(getMockToken("1234567.89"))).toBe(
        "$1,234,567.89"
      );
    });

    it("should format prices less than $0.01 with more precision", () => {
      expect(formatPriceCurrency(getMockToken("0.001234"))).toBe("$0.00");
    });

    it("should format prices slightly above $0.01 normally", () => {
      expect(formatPriceCurrency(getMockToken("0.0123"))).toBe("$0.01");
    });

    it("should format zero correctly", () => {
      expect(formatPriceCurrency(getMockToken("0"))).toBe("$0.00");
    });
  });
});
