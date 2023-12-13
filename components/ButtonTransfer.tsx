'use client'
import { sequence } from '0xsequence';
import { addDocumentFirebase } from '@/apis/firebaseApi';
import { login } from '@/services/sequence';
import { Button, FormControl, Input, Text, useToast } from '@chakra-ui/react'
import { serverTimestamp } from 'firebase/firestore';
import Error from 'next/error';
import React, { useState } from 'react'


interface DataProps {
    id?: number
    name?: string
    token_id?: string
};

interface WalletObject {
    id?: number
    name?: string
    token_id?: string
    accountAddress?: string
};

const ButtonTransfer = ({ data }: { data: DataProps }) => {
    const wallet = sequence.getWallet();
    const toast = useToast();
    const [receiver, setReceiver] = useState("");
    const [loading, setLoading] = useState(false);

    const submitRequest = async () => {
        const wallet: string | undefined | any = localStorage.getItem('@sequence.session');
        const parsedWallet: WalletObject = JSON?.parse(wallet);
        const sender_address = parsedWallet.accountAddress;

        if (!sender_address) {
            login(toast);
            return toast({
                title: "Login sequence wallet terlebih dahulu!",
                isClosable: true,
                duration: 9000,
                status: 'error'
            })
        }




        // const wallet = sequence.getWallet();
        // return console.log("wallet::", wallet)
        if (receiver) {
            setLoading(true);
            try {
                const result = await addDocumentFirebase('transactions', {
                    ...data,
                    status: 'REQUESTED',
                    sender_address: sender_address,
                    receiver_address: receiver,
                    createdAt: serverTimestamp()
                })

                result && toast({
                    title: "Success",
                    description: "Request telah tersimpan.",
                    isClosable: true,
                    duration: 9000,
                    status: 'success'
                })
                setLoading(false);
            } catch (error: Error | any) {
                toast({
                    title: "Oops!",
                    description: error.message,
                    isClosable: true,
                    duration: 9000,
                    status: 'error'
                });
                setLoading(false);
            } finally {
                setLoading(false);
            };
        } else {
            toast({
                title: "Isi alamat / wallet address tujuan",
                description: "Alamat wallet tujuan tidak boleh kosong.",
                isClosable: true,
                duration: 9000,
                status: 'error'
            })
        };

    };

    return (
        <>
            <Button
                onClick={submitRequest}
                rounded={'none'}
                w={'full'}
                mt={8}
                size={'lg'}
                py={'7'}
                bg='gray.50'
                color='gray.900'
                textTransform={'uppercase'}
                isLoading={loading}
                disabled={loading}
                loadingText='Submitting your request...'
                _hover={{
                    transform: 'translateY(2px)',
                    boxShadow: 'lg',
                }}>
                Transfer
            </Button>
            <FormControl>
                <Text color="white">Receiver wallet address : </Text>
                <Input
                    onChange={e => setReceiver(e.target.value)}
                    _placeholder={{
                        color: "gray.400"
                    }}
                    placeholder="12j4163b2ih4bp63b1p6b1hi4b"
                />
            </FormControl>

        </>
    )
}

export default ButtonTransfer