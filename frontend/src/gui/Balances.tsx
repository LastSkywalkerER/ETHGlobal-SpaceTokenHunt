import { FC, HTMLAttributes, useEffect, useState } from "react";
import { GuiCard } from "./GuiCard";
import { Table, TableConfig } from "./Table";
import { mockNative, mockTokens } from "./mockTokens";
import { useAddress, useBalance, useContract } from "@thirdweb-dev/react";
import { ERC20 } from "../shared/constants/ERC20";


export const TokenBalance: FC<{ address: string }> = ({ address }) => {
  const { contract } = useContract(address, ERC20);
  const walletAddress = useAddress();

  const [balance, setBalance] = useState("0");

  useEffect(() => {
    if (!contract) return;

    contract.call("balanceOf", [walletAddress]).then((data) => data.then(setBalance));
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
      cell: ({ data }) => data,
      header: "name",
    }, {
      accessor: "balance",
      cell: ({ row }) => row["address"] === mockNative ? <NativeBalance /> :
        <TokenBalance address={String(row["address"])} />,
      header: "Balance",
    },
  ];

  return <GuiCard {...props}>
    <Table config={config} data={mockTokens} />
  </GuiCard>;
};