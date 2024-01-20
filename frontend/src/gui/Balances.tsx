import { useAddress, useBalance, useContract } from "@thirdweb-dev/react";
import cx from "classnames";
import { FC, HTMLAttributes, ReactNode, useEffect, useState } from "react";
import { formatUnits } from "viem";

import { ERC20 } from "../shared/constants/ERC20";
import { mockNative, mockTokens } from "../shared/constants/mockTokens";
import { GuiCard } from "./GuiCard";
import { Table, TableConfig } from "./Table";

export const TokenBalance: FC<{ address: string }> = ({ address }) => {
  const { contract } = useContract(address, ERC20);
  const walletAddress = useAddress();

  const [balance, setBalance] = useState("0");

  useEffect(() => {
    if (!contract) return;

    const getBalance = async () => {
      const decimals = await contract.call("decimals", []);
      const balance = await contract.call("balanceOf", [walletAddress]);

      setBalance(formatUnits(balance, decimals));
    };

    getBalance();
  }, [contract]);

  return balance;
};
export const NativeBalance: FC = () => {
  const { data } = useBalance();

  return data?.displayValue || "0";
};

export const Balances: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
  const config: TableConfig[] = [
    {
      accessor: "logo",
      cell: ({ data }) => <img className={"w-10 h-10"} src={String(data)} alt="logo" />,
      header: "Logo",
    },
    {
      accessor: "name",
      cell: ({ data }) => data as ReactNode,
      header: "name",
    },
    {
      accessor: "balance",
      cell: ({ row }) =>
        row["address"] === mockNative ? (
          <NativeBalance />
        ) : (
          <TokenBalance address={String(row["address"])} />
        ),
      header: "Balance",
    },
  ];

  return (
    <GuiCard {...props} className={cx("overflow-y-auto max-h-[500px]", props.className)}>
      <Table config={config} data={mockTokens} />
    </GuiCard>
  );
};
