"use client";

import Panel from "@/components/Panel";

export default function Wallet() {
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
      <Panel className="md:col-span-2 lg:col-span-4" data-cy="balance">
        <p className="text-lg">Please connect a wallet to continue.</p>
      </Panel>
    </main>
  );
}
