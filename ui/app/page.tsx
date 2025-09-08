import Loading from "@/components/Loading";
import Panel from "@/components/Panel";
import { Suspense } from "react";
import ChainStatus from "./_components/ChainStatus";
import { getTokenPrices } from "@/lib/api/tokens";
import { getLatestBlocks } from "@/lib/api/blocks";
import LatestBlock from "./_components/LatestBlock";

export default async function Home() {
  const tokenPrices = getTokenPrices("ETH");
  const blocks = getLatestBlocks();

  return (
    <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
      <h1 className="text-xl font-bold">Ethereum Dashboard</h1>

      <Panel data-cy="status">
        <Suspense fallback={<Loading>Loading chain status...</Loading>}>
          <ChainStatus tokenPrices={tokenPrices} />
        </Suspense>
      </Panel>

      <Panel title="Latest Block" data-cy="block">
        <Suspense
          fallback={<Loading>Loading latest block information...</Loading>}
        >
          <LatestBlock blocks={blocks} />
        </Suspense>
      </Panel>
    </main>
  );
}
