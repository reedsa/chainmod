import Loading from "@/components/Loading";
import Panel from "@/components/Panel";
import { Suspense } from "react";
import ChainStatus from "./_components/ChainStatus";
import { getTokenPrices } from "@/lib/api/tokens";

export default async function Home() {
  const tokenPrices = getTokenPrices("ETH");

  return (
    <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
      <h1 className="text-xl font-bold">Ethereum Dashboard</h1>

      <Panel data-cy="status">
        <Suspense fallback={<Loading>Loading chain status...</Loading>}>
          <ChainStatus tokenPrices={tokenPrices} />
        </Suspense>
      </Panel>
    </main>
  );
}
