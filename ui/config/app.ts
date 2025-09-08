const CONFIG_DEFAULTS = {
  ethTokenMetadata: {
    name: "Ethereum",
    symbol: "ETH",
    decimals: 18,
    logo: "https://static.cdnlogo.com/logos/e/81/ethereum-eth.svg",
  },
};

const TEST_CONFIG = {
  ...CONFIG_DEFAULTS,
};

const PROD_CONFIG = {
  ...CONFIG_DEFAULTS,
};

export const APP_CONFIG =
  process.env.NODE_ENV === "test" ? TEST_CONFIG : PROD_CONFIG;
