'use client'

import { useWalletStore } from '@/app/context/wallet'
import { useWallet } from '@/app/context/walletContext'
import { trimAddress } from '@/services/utils'
import { Box, HStack, Heading, Stack, useToast } from '@chakra-ui/react'
import React from 'react'
import { FaRegCopy } from 'react-icons/fa'
import { LuWallet } from 'react-icons/lu'

const UserProfile = () => {
    const toast = useToast();
    const wallet = useWallet();
    const walletZustand = useWalletStore();
    return (
        <>
            <Stack>
                <HStack>
                    <Box
                     _hover={{
                            transform: 'scale(1.1)'
                        }}
                        cursor='pointer'
                    >
                        <FaRegCopy   />
                    </Box>
                </HStack>
                <HStack gap={2} alignSelf={'center'}>
                    <LuWallet />
                    <Heading size='sm'>{trimAddress(wallet.walletAddress)}</Heading>
                    <Box
                     _hover={{
                            transform: 'scale(1.1)'
                        }}
                        cursor='pointer'
                    >
                        <FaRegCopy   />
                    </Box>
                </HStack>
            </Stack>
        </>
    );
};

export default UserProfile