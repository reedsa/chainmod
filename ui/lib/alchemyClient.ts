import { Alchemy, Network } from "alchemy-sdk";

// Get your API key and network from environment variables
const settings = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET, // Or any other network, e.g., Network.ETH_SEPOLIA
  connectionInfoOverrides: {
    skipFetchSetup: true,
  },
};

// Create a new Alchemy client instance
export const alchemyClient = new Alchemy(settings);
