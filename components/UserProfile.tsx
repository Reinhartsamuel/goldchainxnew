'use client'

import { useWalletStore } from '@/app/context/wallet'
import { useWallet } from '@/app/context/walletContext'
import { wallet } from '@/services/sequence'
// import { wallet } from '@/services/sequence'
import { trimAddress } from '@/services/utils'
import { Box, Button, HStack, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, useDisclosure, useToast } from '@chakra-ui/react'
import React, { ReactElement, useRef } from 'react'
import { FaRegCopy } from 'react-icons/fa'
import { LuWallet } from 'react-icons/lu'
import { IoQrCode } from "react-icons/io5";
import QRCode from "react-qr-code";

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
    const { isOpen, onOpen, onClose } = useDisclosure();

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