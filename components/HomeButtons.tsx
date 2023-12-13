'use client'


import { Button, Stack, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useWeb3Modal } from '@web3modal/wagmi/react'
import React, { useEffect, useState } from 'react';
import { sequence } from "0xsequence";
import { connectToSequence, login, logout } from '@/services/sequence';


const HomeButtons = () => {
    // const { open } = useWeb3Modal();
    const router = useRouter();
    const toast = useToast();
    const wallet = sequence.getWallet();


    const [isConnected, setIsConnected] = useState<boolean>(wallet.isConnected());



    useEffect(() => {
        wallet.isConnected() ? setIsConnected(true) : setIsConnected(false);
    }, [wallet.isConnected()]);




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
                        logout();
                    } else login(toast);
                }}
            >
                {wallet.isConnected() ? "Disconnect Wallet" : "Login Wallet"}

            </Button>
            <Button
                rounded={'full'}
                size={'md'}
                fontWeight={'normal'}
                px={6}
                onClick={() => router.push('scan')}
            >
                SCAN QR CODE SEKARANG
            </Button>
        </Stack>
    );
};


export default HomeButtons;