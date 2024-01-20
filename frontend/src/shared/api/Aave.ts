/* eslint-disable max-len */
import { EthereumTransactionTypeExtended, Pool } from "@aave/contract-helpers";
import {
  LPBorrowParamsType,
  LPRepayParamsType,
  LPSupplyParamsType,
  LPWithdrawParamsType,
} from "@aave/contract-helpers/dist/esm/v3-pool-contract/lendingPoolTypes";
import { BigNumber, providers, Signer } from "ethers";

import { poolAddress, provider, wethGatewayAddress } from "../constants/constants";

export class Aave {
  private static pool: Pool = new Pool(provider, {
    POOL: poolAddress,
    WETH_GATEWAY: wethGatewayAddress,
  });

  /*
  - @param `user` The ethereum address that repays
  - @param `reserve` The ethereum address of the reserve on which the user borrowed
  - @param `amount` The amount to repay, or (-1) if the user wants to repay everything
  - @param `interestRateMode` // Whether the borrow will incur a stable (InterestRate.Stable) or variable (InterestRate.Variable) interest rate
  - @param @optional `onBehalfOf` The ethereum address for which user is repaying. It will default to the user address
  */
  public static async borrow(signer: Signer, data: LPBorrowParamsType) {
    const txs: EthereumTransactionTypeExtended[] = await Aave.pool.borrow(data);

    return await Aave.submitTransactions({ txs, signer });
  }

  /*
  - @param `user` The ethereum address that will make the deposit
  - @param `reserve` The ethereum address of the reserve
  - @param `amount` The amount to be deposited
  - @param `interestRateMode` // Whether stable (InterestRate.Stable) or variable (InterestRate.Variable) debt will be repaid
  - @param @optional `onBehalfOf` The ethereum address for which user is depositing. It will default to the user address
  */
  public static async repay(signer: Signer, data: LPRepayParamsType) {
    const txs: EthereumTransactionTypeExtended[] = await Aave.pool.repay(data);

    return await Aave.submitTransactions({ txs, signer });
  }

  /*
  - @param `user` The ethereum address that will make the deposit
  - @param `reserve` The ethereum address of the reserve
  - @param `amount` The amount to be deposited
  - @param @optional `onBehalfOf` The ethereum address for which user is depositing. It will default to the user address
  */
  public static async supply(signer: Signer, data: LPSupplyParamsType) {
    const txs: EthereumTransactionTypeExtended[] = await Aave.pool.supply(data);

    return await Aave.submitTransactions({ txs, signer });
  }

  /*
  - @param `user` The ethereum address that will make the deposit
  - @param `reserve` The ethereum address of the reserve
  - @param `amount` The amount to be deposited
  - @param `aTokenAddress` The aToken to redeem for underlying asset
  - @param @optional `onBehalfOf` The ethereum address for which user is depositing. It will default to the user address
  */
  public static async withdraw(signer: Signer, data: LPWithdrawParamsType) {
    const txs: EthereumTransactionTypeExtended[] = await Aave.pool.withdraw(data);

    return await Aave.submitTransactions({ txs, signer });
  }

  private static async submitTransactions({
    txs,
    signer,
  }: {
    signer: Signer;
    txs: EthereumTransactionTypeExtended[];
  }) {
    const responses = [] as providers.TransactionResponse[];

    for (const tx of txs) {
      const extendedTxData = await tx.tx();
      const { from, ...txData } = extendedTxData;
      const response = await signer.sendTransaction({
        ...txData,
        value: txData.value ? BigNumber.from(txData.value) : undefined,
      });

      responses.push(response);
    }

    return responses;
  }
}
