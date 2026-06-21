import { TransactionError, useSigner } from "@thirdweb-dev/react";
import cx from "classnames";
import { Contract } from "ethers";
import { utils } from "ethers/lib/ethers";
import { FC, HTMLAttributes, ReactNode, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { parseEther, parseUnits } from "viem";
import { erc20ABI, useSendTransaction, useWalletClient } from "wagmi";

import { Tokens } from "../shared/api/Tokens";
import { mockNative, mockTokens } from "../shared/constants/mockTokens";
import { removeDuplicates } from "../shared/helpers/removeDuplicates";
import { useModal } from "../shared/services/modal";
import { GuiButton } from "./GuiButton";
import { GuiCard } from "./GuiCard";
import { Table, TableConfig, TableData } from "./Table";

type TokenValues = Record<string, string>;

export const TopUpWindow: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
  const { sendTransaction } = useSendTransaction();
  const { data: walletClient } = useWalletClient();
  const signer = useSigner();

  const { register, getValues } = useForm<TokenValues>();
  const [tokens, setTokens] = useState(mockTokens);

  const { setLoading, clearLoading, setSuccess, setError } = useModal();

  useEffect(() => {
    const init = async () => {
      const data = await Tokens.getGuiTokens();

      setTokens(data as unknown as TableData[]);
    };

    init();
  }, []);

  const topUp = async (token: string) => {
    if (!signer || !walletClient) return;

    setLoading();

    try {
      if (token === mockNative) {
        sendTransaction({
          to: await signer.getAddress(),
          value: parseEther(String(getValues(token))),
        });
      } else {
        const tokenContract = new Contract(token, erc20ABI, signer);
        const decimals = await tokenContract.decimals();

        await walletClient.writeContract({
          // account: address,
          abi: erc20ABI,
          address: token as `0x${string}`,
          functionName: "transfer",
          args: [
            (await signer.getAddress()) as `0x${string}`,
            parseUnits(String(getValues(token)), Number(decimals)),
          ],
        } as any);
      }
    } catch (error) {
      setError(error as TransactionError);
    }

    clearLoading();
    setSuccess();
  };

  const withdraw = async (token: string) => {
    if (!signer || !walletClient) return;

    setLoading();

    try {
      if (token === mockNative) {
        const tx = await signer.sendTransaction({
          to: walletClient.account.address,
          value: parseEther(String(getValues(token))),
        });

        await tx.wait();
      } else {
        const tokenContract = new Contract(token, erc20ABI, signer);
        const decimals = await tokenContract.decimals();

        const tx = await tokenContract.transfer(
          walletClient.account.address,
          utils.parseUnits(String(getValues(token)), Number(decimals)),
        );

        await tx.wait();
      }
    } catch (error) {
      setError(error as TransactionError);
    }

    clearLoading();
    setSuccess();
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
      accessor: "value",
      cell: ({ row }) => (
        <input
          className={
            "block w-[110px] rounded-lg border border-white/15 bg-space-900/80 p-2.5 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-neon-cyan/60 focus:ring-1 focus:ring-neon-cyan/40"
          }
          type={"number"}
          placeholder={"0.0"}
          {...register(String(row["address"]))}
        />
      ),
      header: "Top up value",
    },
    {
      accessor: "supply",
      cell: ({ row }) => (
        <GuiButton onClick={() => topUp(String(row["address"]))}>Top&nbsp;up</GuiButton>
      ),
      header: "",
    },
    {
      accessor: "withdraw",
      cell: ({ row }) => (
        <GuiButton variant="secondary" onClick={() => withdraw(String(row["address"]))}>
          Withdraw
        </GuiButton>
      ),
      header: "",
    },
  ];

  return (
    <GuiCard {...props} className={cx("w-[min(94vw,640px)] p-0", props.className)}>
      <div className="border-b border-white/10 px-5 py-3">
        <h2 className="hud-title">Top up / withdraw</h2>
      </div>
      <div className="max-h-[60vh] overflow-auto px-2 pb-2">
        <Table config={config} data={removeDuplicates<TableData, string>(tokens, "address")} />
      </div>
    </GuiCard>
  );
};
