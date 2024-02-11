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
        <Stack spacing={{ base: 3, sm: 4 }}
            // direction={{ base: 'column', sm: 'column', lg:'row' }}
            direction={'column'}
        >
            <Button
                borderColor={'#DABC07'}
                borderWidth={2}
                rounded={'full'}
                size={'lg'}
                fontWeight={'extrabold'}
                px={6}
                // bg='#6A54A3'
                colorScheme='pink'
                onClick={() => {
                  window.open('wa.me/6281313383848')
                }}
            >
                Beli Emas
            </Button>
            <Button
                borderColor={'#DABC07'}
                borderWidth={2}
                rounded={'full'}
                size={'lg'}
                fontWeight={'extrabold'}
                px={6}
                colorScheme='blue'
                onClick={() => {
                    if (wallet.isConnected()) {
                        // logout(toast, router, resetAccountAddress);
                        router.push('/profile')
                    } else login(toast, router, setAccountAddress, setWalletAddress);
                }}
            >
                {wallet.isConnected() ? "Go to Profile " : "Login Wallet"}
            </Button>
            <Button
                borderColor={'#DABC07'}
                borderWidth={2}
                bg='white'
                rounded={'full'}
                size={'lg'}
                fontWeight={'extrabold'}
                px={6}
                color={'black'}
                onClick={() => router.push('scan-now')}
            >
                Cek Keaslian dan Kepemilikan
            </Button>
        </Stack>
    );
};


export default HomeButtons;