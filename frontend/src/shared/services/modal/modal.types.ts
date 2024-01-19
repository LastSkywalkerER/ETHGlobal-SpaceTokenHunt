import { TransactionError } from "@thirdweb-dev/react";

export interface ErrorService {
  error: Partial<TransactionError> | null;
  setError: (error: Partial<TransactionError>) => void;
  clearError: () => void;

  loading: boolean;
  setLoading: () => void;
  clearLoading: () => void;

  success: boolean;
  setSuccess: () => void;
  clearSuccess: () => void;
}
