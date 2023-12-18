import { createContext, useContext, useState } from 'react';
import { create } from 'zustand'

export interface WalletState {
    accountAddress: string;
    setAccountAddress: (payload: string | undefined) => void;
    resetAccountAddress: () => void;
};

export const useWalletStore = create<WalletState>((set) => ({
    accountAddress: "",
    setAccountAddress: (payload: string | undefined) => set(() => ({ accountAddress: payload })),
    resetAccountAddress: () => set(() => ({ accountAddress: "" })),
}));