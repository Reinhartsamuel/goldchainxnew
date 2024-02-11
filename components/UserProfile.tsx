'use client'

import { wallet } from '@/services/sequence'
import { trimAddress } from '@/services/utils'
import { Box, Button, HStack, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { FaRegCopy } from 'react-icons/fa'
import { LuWallet } from 'react-icons/lu'
import { IoQrCode } from "react-icons/io5";
import QRCode from "react-qr-code";
import { sequence } from '0xsequence'

const UserProfile = () => {
    const toast = useToast();
    // const walletAddress = wallet.getAddress();
    const [isConnected, setIsConnected] = useState<boolean>(wallet.isConnected());
    const [walletAddress, setWalletAddress] = useState('');


    const handleWalletCopy = () => {
        navigator.clipboard.writeText(walletAddress);
        toast({
            description: 'Wallet Address Copied!',
            status: 'success',
            duration: 2000
        })
    };
    const { isOpen, onOpen, onClose } = useDisclosure();


    useEffect(() => {
        if (!isConnected) sequence.initWallet('Q0ZfFkTedUvuQepZttdzEp3BAAAAAAAAA');
        setIsConnected(isConnected);
        const wallet = sequence.initWallet('Q0ZfFkTedUvuQepZttdzEp3BAAAAAAAAA');
        const getAddress = async () => {
            try {
                const x = await wallet.getAddress();
                setWalletAddress(x);
            } catch (error) {
                console.log(error, "error getting address");
            };
        };
        getAddress();

    }, [wallet.isConnected()])

    return (
        <>
            <Stack>
                <HStack gap={2} alignSelf={'center'}>
                    <LuWallet />
                    <Heading size='xs' color='orange'>My Wallet:</Heading>
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

                <Button onClick={onOpen}>
                    <HStack gap={2} alignSelf={'center'}>
                        <IoQrCode />
                        <Heading size='xs'>QR Terima Transfer</Heading>
                    </HStack>
                </Button>
            </Stack>


            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Heading size='sm'>
                            {trimAddress(walletAddress)}
                        </Heading>
                        <QRCode
                            size={256}
                            level={'H'}
                            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                            value={walletAddress}
                            viewBox={`0 0 256 256`}
                        />
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="orange" mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default UserProfile