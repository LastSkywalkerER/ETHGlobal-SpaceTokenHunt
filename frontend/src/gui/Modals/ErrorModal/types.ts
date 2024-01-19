import { TransactionError } from "@thirdweb-dev/react";

export type ModalProps = {
  onClose: () => void;
  error: Partial<TransactionError & Error & { code: number | string }>;
};
