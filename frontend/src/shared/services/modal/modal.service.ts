import { create } from "zustand";

import { ErrorService } from "./modal.types";

export const useModal = create<ErrorService>((set, get) => ({
  error: null,
  setError: (error) => set((state) => ({ ...state, error, success: false })),
  clearError: () => set((state) => ({ ...state, error: null })),

  loading: false,
  setLoading: () => set((state) => ({ ...state, loading: true })),
  clearLoading: () => set((state) => ({ ...state, loading: false })),

  success: false,
  setSuccess: () => set((state) => ({ ...state, success: !get().error })),
  clearSuccess: () => set((state) => ({ ...state, success: false })),
}));
