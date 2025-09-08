# Ethereum Dashboard

Ethereum dashboard with wallet integration. Shows information about the blockchain, including the current price, recent transaction numbers, top tokens and the latest transactions. From the wallet page, you can view the balance and tokens associated with the wallet.

## Getting Started

Install dependencies:

```bash
npm run dev
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Production build

A copy of the production build is available in the public folder

Run a production build and start the server with:

```bash
npm run build
# then
npm start
```

## Technical Details

### Next.js

Server components are often used to fetch data and stream to other components. This ensures responsiveness while slower requests are executing.

### Recharts

The chart uses Recharts to show the graph of total transactions in chunks of recent blocks.

### Rainbowkit Integration

Wallet connectors utilize Rainbowkit and application components make use of wagmi hooks account information.

### Alchemy and Bitquery Integration

This application integrates with the Alchemy APIs/SDKs and the Bitquery API for convenient chain data and portfolio methods.

- The maximum number of blocks configured in `config/app.ts` is used to fetch blocks for the transaction counts chart.
- Top tokens are obtained with Bitquery, which pulls data from the last 24 hours using GraphQL.

### Cypress / Jest

- e2e and component tests are implemented with Cypress.

Run them with the following command:

```bash
npm run cy:run
```

Open the Cypress debugger with:

```bash
npm run cy:open
```

- Unit tests run as part of the Jest test suite.

```bash
npm run test
```
