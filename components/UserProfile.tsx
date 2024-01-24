'use client'

import { useWalletStore } from '@/app/context/wallet'
import { useWallet } from '@/app/context/walletContext'
import { wallet } from '@/services/sequence'
// import { wallet } from '@/services/sequence'
import { trimAddress } from '@/services/utils'
import { Box, HStack, Heading, Stack, useToast } from '@chakra-ui/react'
import React, { ReactElement, useRef } from 'react'
import { FaRegCopy } from 'react-icons/fa'
import { LuWallet } from 'react-icons/lu'

const UserProfile = () => {
    const toast = useToast();
    // const walletContext = useWallet();
    // const walletZustand = useWalletStore();
    const walletAddress = wallet.getAddress();

    const handleWalletCopy = () => {
        navigator.clipboard.writeText(walletAddress);
        toast({
            description: 'Wallet Address Copied!',
            status: 'success',
            duration: 2000
        })
    };

    return (
        <>
            <Stack>
                <HStack gap={2} alignSelf={'center'}>
                    <LuWallet />
                    <Heading size='xs'color='orange'>My Wallet:</Heading>
                    <Heading size='sm'>
                        {trimAddress(walletAddress)}
                    </Heading>
                    <Box
                        _hover={{
                            transform: 'scale(1.1)'
                        }}
                        cursor='pointer'
                    >
                        <FaRegCopy
                            onClick={handleWalletCopy}
                        />
                    </Box>
                </HStack>
            </Stack>
        </>
    );
};

export default UserProfile