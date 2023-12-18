'use client'


import { createContext, useContext, useState } from "react";


type WalletContextType = {
    walletAddress: string | undefined;
    setWalletAddress: (address: string | undefined) => void;
};

export const WalletContext = createContext<WalletContextType | null>(null);


export const useWallet = () => {
    const context = useContext(WalletContext);

    if (!context) {
        throw new Error("useWallet must be used within WalletContextProvider!")
    };

    return context;
};


export const WalletProvider = ({
    children
}: {
    children: React.ReactNode
}) => {
    const [walletAddress, setWalletAddress] = useState<string | undefined>("");


    return (
        <WalletContext.Provider value={{ walletAddress, setWalletAddress }}>
            {children}
        </WalletContext.Provider>
    );
};