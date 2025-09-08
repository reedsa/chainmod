"use client";

import { Suspense } from "react";
import { useAccount, useBalance } from "wagmi";
import { formatUnits } from "ethers";
import Panel from "@/components/Panel";
import Loading from "@/components/Loading";
import Balance from "./_components/Balance";
import Tokens from "./_components/Tokens";

export default function Wallet() {
  const account = useAccount();

  const balance = useBalance({ address: account.address });
  const balanceValue = balance.data?.value;

  let balanceEther = "0";
  if (balanceValue) {
    balanceEther = parseFloat(formatUnits(balanceValue, "ether")).toFixed(6);
  }

  if (account.isDisconnected || !account.address) {
    return (
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        <Panel className="md:col-span-2 lg:col-span-4" data-cy="balance">
          <p className="text-lg">Please connect a wallet to continue.</p>
        </Panel>
      </main>
    );
  }

  return (
    <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
      <h1 className="text-xl font-bold">Wallet Overview</h1>
      <Panel className="md:col-span-2 lg:col-span-4" data-cy="balance">
        <Balance balanceEther={balanceEther} />
      </Panel>

      <Panel title="Tokens" gridCols={2} data-cy="tokens">
        <Suspense fallback={<Loading>Loading wallet...</Loading>}>
          <Tokens address={account.address} />
        </Suspense>
      </Panel>
    </main>
  );
}
