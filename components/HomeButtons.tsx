'use client'


import { Button, Stack, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useWeb3Modal } from '@web3modal/wagmi/react'
import React, { useEffect, useState } from 'react';
import { sequence } from "0xsequence";
import { connectToSequence, login, logout } from '@/services/sequence';
import { WalletState, useWalletStore } from '@/app/context/wallet';
import { useWallet } from '@/app/context/walletContext';




const HomeButtons = () => {
    // const { open } = useWeb3Modal();
    const router = useRouter();
    const toast = useToast({
        containerStyle: {
            maxWidth: '95%',
          },
    });
    const wallet = sequence.getWallet();
    const [isConnected, setIsConnected] = useState<boolean>(wallet.isConnected());
    const { setAccountAddress, resetAccountAddress }: WalletState = useWalletStore();
    const { setWalletAddress } = useWallet();

    return (
        <Stack spacing={{ base: 3, sm: 4 }} direction={{ base: 'column', sm: 'row' }}>
            <Button
                rounded={'full'}
                size={'md'}
                fontWeight={'normal'}
                px={6}
                colorScheme={'blue'}
                bg={'blue.500'}
                _hover={{ bg: 'blue.600' }}
                onClick={() => {
                    if (wallet.isConnected()) {
                        logout(toast, router, resetAccountAddress);
                    } else login(toast, router, setAccountAddress, setWalletAddress);
                }}
            >
                {wallet.isConnected() ? "Disconnect Wallet" : "Login Wallet"}

            </Button>
            <Button
                rounded={'full'}
                size={'md'}
                fontWeight={'normal'}
                px={6}
                onClick={() => router.push('scan-now')}
            >
                SCAN QR CODE SEKARANG
            </Button>
        </Stack>
    );
};


export default HomeButtons;