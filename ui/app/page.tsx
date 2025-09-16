import Loading from "@/components/Loading";
import Panel from "@/components/Panel";
import { Suspense } from "react";
import ChainStatus from "./_components/ChainStatus";
import LatestBlock from "./_components/LatestBlock";
import TopTokens from "./_components/TopTokens";
import LatestTransactions from "./_components/LatestTransactions";
import { ChainDataProvider } from "@/lib/context/ChainDataContext";

// This revalidates static data (TopTokens) every 12 hours
export const revalidate = 43200;

export default async function Home() {
  return (
    <ChainDataProvider>
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 items-start min-w-md">
        <h1 className="text-xl font-bold">Ethereum Dashboard</h1>

        <Panel data-cy="status">
          <ChainStatus />
        </Panel>

        <Panel title="Latest Block" data-cy="block">
          <LatestBlock />
        </Panel>

        <Panel
          title="Top Tokens (Volume by Value)"
          gridCols={2}
          data-cy="tokens"
        >
          <Suspense fallback={<Loading>Loading top tokens...</Loading>}>
            <TopTokens />
          </Suspense>
        </Panel>

        <Panel title="Latest Transactions" gridCols={2} data-cy="transactions">
          <LatestTransactions />
        </Panel>
      </main>
    </ChainDataProvider>
  );
}
