import { InterestRate } from "@aave/contract-helpers";
import { providers, Signer } from "ethers";

import { Aave } from "../../api/Aave";
import { BulletActions } from "../../constants/constants";

export interface HitProps {
  signer: Signer;
  tokenAddress: string;
  amount: string;
}

export const borrow = async ({ tokenAddress, amount, signer }: HitProps) => {
  return await Aave.borrow(signer, {
    user: await signer.getAddress(),
    amount,
    reserve: tokenAddress,
    interestRateMode: InterestRate.None,
  });
};
export const repay = async ({ tokenAddress, amount, signer }: HitProps) => {
  return await Aave.repay(signer, {
    user: await signer.getAddress(),
    amount,
    reserve: tokenAddress,
    interestRateMode: InterestRate.None,
  });
};
export const supply = async ({ tokenAddress, amount, signer }: HitProps) => {
  return await Aave.supply(signer, {
    user: await signer.getAddress(),
    amount,
    reserve: tokenAddress,
  });
};
export const withdraw = async ({ tokenAddress, amount, signer }: HitProps) => {
  return await Aave.withdraw(signer, {
    user: await signer.getAddress(),
    amount,
    reserve: tokenAddress,
  });
};

export const bulletNameToAction: Record<
  BulletActions,
  (props: HitProps) => Promise<providers.TransactionResponse[]>
> = {
  [BulletActions.Borrow]: borrow,
  [BulletActions.Repay]: repay,
  [BulletActions.Withdraw]: withdraw,
  [BulletActions.Supply]: supply,
};

export const amountFieldToAction = {
  [BulletActions.Borrow]: "avaliable",
  [BulletActions.Repay]: "debt",
  [BulletActions.Withdraw]: "balance",
};
