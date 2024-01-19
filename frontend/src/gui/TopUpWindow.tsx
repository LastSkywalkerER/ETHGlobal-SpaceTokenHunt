import { useSigner } from "@thirdweb-dev/react";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { parseEther } from "viem";
import { useSendTransaction } from "wagmi";

import { GuiButton } from "./GuiButton";
import { GuiCard } from "./GuiCard";
import { mockNative, mockTokens } from "./mockTokens";
import { Table, TableConfig } from "./Table";

type TokenValues = Record<string, string>;

export const TopUpWindow: FC = () => {
  const { sendTransaction } = useSendTransaction();
  const signer = useSigner();

  const { register, getValues } = useForm<TokenValues>();

  const topUp = async (token: string) => {
    if (signer && token === mockNative) {
      sendTransaction({
        to: await signer.getAddress(),
        value: parseEther(String(getValues(token))),
      });
    }
  };

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
    },
    {
      accessor: "value",
      cell: ({ row }) => (
        <input
          className={
            "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 max-w-[100px]"
          }
          type={"number"}
          {...register(String(row["address"]))}
        />
      ),
      header: "Top up value",
    },
    {
      accessor: "supply",
      cell: ({ row }) => (
        <GuiButton onClick={() => topUp(String(row["address"]))}>Top up</GuiButton>
      ),
      header: "",
    },
    {
      accessor: "withdraw",
      cell: () => <GuiButton>Withdraw</GuiButton>,
      header: "",
    },
  ];

  return (
    <GuiCard>
      <Table config={config} data={mockTokens} />
    </GuiCard>
  );
};
