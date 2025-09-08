import Image from "next/image";
import { getTopTokens } from "@/lib/api/tokens";

export default async function TopTokens() {
  const topTokens = await getTopTokens();

  if (!topTokens) {
    return (
      <div className="flex justify-center items-center h-40 text-red-400">
        <p>Could not fetch the top tokens list.</p>
      </div>
    );
  }

  return (
    <ul className="space-y-2" data-cy="tokens-list">
      {topTokens.length > 0 &&
        topTokens.map((token, index) => (
          <li
            key={token.contractAddress}
            className={`p-3 rounded-lg ${
              index % 2 === 0 ? "bg-gray-700" : "bg-gray-600"
            }`}
          >
            <div className="flex items-center gap-4">
              <div>
                {token.logo ? (
                  <Image
                    src={token.logo}
                    alt={token.symbol}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gray-600 rounded-full" />
                )}
              </div>
              <div className="flex-1">
                <div className="truncate mb-1">
                  <span className="font-semibold text-white">
                    {token.name} ({token.symbol})
                  </span>
                </div>
                <div className="grid grid-cols-[max-content_1fr] gap-x-2">
                  <span className="font-semibold text-white">USD:</span>
                  <span>{token.usd}</span>
                  <span className="font-semibold text-white">
                    Trade Volume:
                  </span>
                  <span>{token.amount}</span>
                </div>
              </div>
            </div>
          </li>
        ))}
    </ul>
  );
}
