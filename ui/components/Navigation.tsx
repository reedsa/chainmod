"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Navigation = () => {
  const pathname = usePathname();

  const getLinkStyle = (href: string) => {
    const activeLinkStyle = "bg-gray-900";
    const inactiveLinkStyle = "";

    return `p-2 rounded-lg ${
      pathname === href ? activeLinkStyle : inactiveLinkStyle
    }`;
  };

  return (
    <nav data-cy="navigation">
      <ul className="flex flex-row space-x-2 text-lg">
        <li>
          <Link href="/" className={getLinkStyle("/")} data-cy="dashboard-link">
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            href="/wallet"
            className={getLinkStyle("/wallet")}
            data-cy="wallet-link"
          >
            Wallet
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
