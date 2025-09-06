import Panel from "@/components/Panel";

export default async function Home() {
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
      <h1 className="text-xl font-bold">Ethereum Dashboard</h1>

      <Panel>Dashboard content</Panel>
    </main>
  );
}
