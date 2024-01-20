import { useAddress, useBalance, useContract } from "@thirdweb-dev/react";
import cx from "classnames";
import { FC, HTMLAttributes, ReactNode, useEffect, useState } from "react";
import { formatUnits } from "viem";

import { Tokens } from "../shared/api/Tokens";
import { ERC20 } from "../shared/constants/ERC20";
import { mockNative, mockTokens } from "../shared/constants/mockTokens";
import { GuiCard } from "./GuiCard";
import { Table, TableConfig, TableData } from "./Table";

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
    accessor: "walletBalance",
    cell: ({ row }) =>
      row["address"] === mockNative ? (
        <NativeBalance />
      ) : (
        <TokenBalance address={String(row["address"])} />
      ),
    header: "Wallet Balance",
  },
  {
    accessor: "balance",
    cell: ({ data }) => data as ReactNode,
    header: "Balance",
  },
  {
    accessor: "available",
    cell: ({ data }) => data as ReactNode,
    header: "Available",
  },
  {
    accessor: "debt",
    cell: ({ data }) => data as ReactNode,
    header: "Debt",
  },
];

export const Balances: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
  const [tokens, setTokens] = useState(mockTokens);

  useEffect(() => {
    const init = async () => {
      const data = await Tokens.getGuiTokens();

      setTokens(data as unknown as TableData[]);
    };

    init;
  }, []);

  return (
    <GuiCard
      {...props}
      className={cx("overflow-auto max-h-[500px] max-w-[400px]", props.className)}
    >
      <Table config={config} data={tokens} />
    </GuiCard>
  );
};
