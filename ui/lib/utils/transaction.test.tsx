import { formatTransaction } from "./transaction";

describe("transaction utils", () => {
  const tokenPrice = "4000";
  describe("formatTransaction", () => {
    it("should format a standard transaction correctly", () => {
      const mockTx = {
        hash: "0xhash",
        blockNumber: 1,
        from: "0xfrom",
        to: "0xto",
        nonce: 0,
        value: "1000000000000000000",
        gasPrice: "20000000000",
        gasLimit: BigInt("21000000"),
        data: "",
        chainId: 1,
        confirmations: 1,
        wait: jest.fn(),
      };

      const formatted = formatTransaction(mockTx, tokenPrice);

      expect(formatted!.hash).toBe("0xhash...");
      expect(formatted!.blockNumber).toBe("1");
      expect(formatted!.from).toBe("0xfrom...from");
      expect(formatted!.to).toBe("0xto...0xto");
      expect(formatted!.value).toBe("1.0");
      expect(formatted!.valueCurrency).toBe("4000.00");
      expect(formatted!.gasLimit).toBe("21,000,000");
      expect(formatted!.gasPrice).toBe("20.0");
      expect(formatted!.gasPriceEth).toBe("0.00000002");
    });

    it("should format zero value transactions", () => {
      const mockTx = {
        hash: "0xhash",
        from: "0xfrom",
        to: "0xto",
        nonce: 0,
        value: "0",
        gasPrice: "20000000000",
        gasLimit: BigInt("21000000"),
        data: "",
        chainId: 1,
        confirmations: 1,
        wait: jest.fn(),
      };

      const formatted = formatTransaction(mockTx, tokenPrice);

      expect(formatted!.value).toBe("0.0");
    });

    it("should return null for undefined input", () => {
      const formatted = formatTransaction(undefined, tokenPrice);
      expect(formatted).toEqual(null);
    });

    it("should return an empty object for undefined input", () => {
      const mockTx = {
        hash: "0xhash",
        from: "0xfrom",
        to: "0xto",
        nonce: 0,
        value: "0",
        gasPrice: "20000000000",
        gasLimit: BigInt("21000000"),
        data: "",
        chainId: 1,
        confirmations: 1,
        wait: jest.fn(),
      };

      const formatted = formatTransaction(mockTx, undefined);
      expect(formatted!.valueCurrency).toEqual("unknown");
    });
  });
});
