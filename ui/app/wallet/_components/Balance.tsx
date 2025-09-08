"use client";

interface BalanceProps {
  balanceEther: string;
}

const Balance = ({ balanceEther }: BalanceProps) => {
  return (
    <div className="flex-1" data-cy="balance">
      <h2 className="uppercase text-xs">Wallet Balance</h2>
      <div className="flex flex-row items-center">
        <span className="text-xl text-white mr-2" data-cy="balance-ether">
          {balanceEther} ETH
        </span>
      </div>
    </div>
  );
};

export default Balance;
