import { formatBlockInfo } from "./block";

describe("block utils", () => {
  beforeAll(() => {
    jest.setSystemTime(new Date());
  });

  describe("formatBlockInfo", () => {
    const now = Date.now();

    it("should return null for null or undefined block", () => {
      expect(formatBlockInfo(null)).toBeNull();
      expect(formatBlockInfo(undefined)).toBeNull();
    });

    it("should correctly process a block and format its details", () => {
      const mockBlock = {
        hash: "0x123",
        number: 12345678,
        timestamp: Date.now(),
        transactions: new Array(150),
        miner: "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B",
        difficulty: 0,
        baseFeePerGas: BigInt("0"),
        gasLimit: BigInt("21000000"),
        gasUsed: BigInt("21000000"),
      };

      const result = formatBlockInfo(mockBlock as any);

      expect(result).toEqual({
        hash: "0x123...",
        number: "12,345,678",
        utcTimestamp: new Date(Date.now() * 1000).toUTCString(),
        timeSince: "just now",
        numTransactions: 150,
        difficulty: "0",
        baseFeePerGas: "0.0",
        miner: "0xAb58...eC9B",
        gasLimit: "21,000,000",
        gasUsed: "21,000,000",
      });
    });

    it("should handle a block with zero transactions", () => {
      const mockBlock = {
        hash: "0x123",
        number: 12345678,
        timestamp: Date.now(),
        transactions: new Array(),
        miner: "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B",
        difficulty: 0,
        baseFeePerGas: BigInt("0"),
        gasLimit: BigInt("21000000"),
        gasUsed: BigInt("21000000"),
      };

      const result = formatBlockInfo(mockBlock as any);

      expect(result).toEqual({
        hash: "0x123...",
        number: "12,345,678",
        utcTimestamp: new Date(Date.now() * 1000).toUTCString(),
        timeSince: "just now",
        numTransactions: 0,
        difficulty: "0",
        baseFeePerGas: "0.0",
        miner: "0xAb58...eC9B",
        gasLimit: "21,000,000",
        gasUsed: "21,000,000",
      });
    });
  });
});
