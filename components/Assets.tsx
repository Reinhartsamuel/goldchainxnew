'use client'
import React, { useEffect, useState } from 'react'
import TransactionItemComponent from './TransactionItemComponent'
import Error from 'next/error';
import { sequence } from '0xsequence';
import { wallet } from '@/services/sequence';
import Moralis from 'moralis';
import { Box, Image, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { trimAddress } from '@/services/utils';

interface NFTData {
    amount: string;
    token_id: string;
    token_address: string;
    contract_type: string;
    owner_of: string;
    last_metadata_sync: string;
    last_token_uri_sync: string;
    metadata: null | any; // Assuming metadata can be any type or null
    block_number: string;
    block_number_minted: string;
    name: string;
    symbol: string;
    token_hash: string;
    token_uri: string;
    minter_address: string;
    verified_collection: boolean;
    possible_spam: boolean;
}

const Assets = () => {
    const [nfts, setNfts] = useState<NFTData[] | any>([]);
    const [isConnected, setIsConnected] = useState<boolean>(wallet.isConnected());
    const [walletAddress, setWalletAddress] = useState('');


    const getAssets = async () => {
        if (!walletAddress) return;
        try {
            if (!Moralis.Core.isStarted) {
                await Moralis.start({
                    apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImFkN2ZhYTRhLTNlZWYtNGY4MC1iNDUwLTUyZDQwMTgxYmY1ZiIsIm9yZ0lkIjoiMzY1ODUzIiwidXNlcklkIjoiMzc2MDAxIiwidHlwZUlkIjoiYmFjYzhjMTYtOTJhNi00ZTE4LWE2ZjAtZjZkNzRhY2VlMDg3IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MDEwMDEwNTIsImV4cCI6NDg1Njc2MTA1Mn0.KZa9YIqf2n4WX4gkMa3Z-RA4yfJ3uwWaeXuKHaWaydM"
                });
            }

            const response = await Moralis.EvmApi.nft.getWalletNFTs({
                "chain": "0x89",
                "format": "decimal",
                "tokenAddresses": [
                    "0x70bd9276e3F6f18E6bc306aaF306647D596E7F57"
                ],
                "mediaItems": false,
                "address": walletAddress
            });
            // if (response?.raw?.status === 'SYNCED') setNfts()
            const { result } = response.raw;
            console.log(result)
            setNfts(result)

        } catch (e) {
            console.error(e);
        }
    };


    useEffect(() => {
        getAssets();
    }, [walletAddress]);


    useEffect(() => {
        if (!isConnected) sequence.initWallet('Q0ZfFkTedUvuQepZttdzEp3BAAAAAAAAA');
        setIsConnected(isConnected);
        const wallet = sequence.initWallet('Q0ZfFkTedUvuQepZttdzEp3BAAAAAAAAAw');
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
            <SimpleGrid gap={1} w={'full'} columns={2} alignItems={'center'}>
                {nfts?.map((nft: NFTData, i: number) => (
                    // <Box
                    //     w='100%'
                    //     display={'flex'}
                    //     flexDir={'column'}
                    //     key={i}
                    //     justifyContent={'center'}
                    //     alignItems='center'
                    //     px={10}
                    //     my={2}
                    // >
                    //     <Box
                    //      w='100%'
                    //         bg='gray.200'
                    //         borderColor={'gray.50'}
                    //         borderWidth={2}
                    //         borderRadius={20}
                    //         overflow={'hidden'}
                    //     >
                    //         <Image
                    //             src={'https://cdn.dribbble.com/userupload/4487675/file/still-2ef9e84caa94f5f5510171e03f5318b2.png?resize=800x600&vertical=center'}
                    //         />
                    //         <Stack p={2} gap={0}>
                    //             <Text fontSize={14} fontWeight={'bold'} color='gray.700'>{nft?.name} ({nft?.symbol})</Text>
                    //             <Text fontSize={12} color='gray.700'>{trimAddress(nft?.token_address)}</Text>
                    //             <Text mt={5} fontSize={12} color='gray.700'>TOKEN ID : {nft.token_id}</Text>
                    //         </Stack>
                    //     </Box>

                    // </Box>
                    <Box
                        w={'98%'}
                        justifySelf={'center'}
                        bg='gray.200'
                        borderColor={'gray.50'}
                        borderWidth={2}
                        borderRadius={20}
                        overflow={'hidden'}


                    >
                        <Image
                            src={'https://cdn.dribbble.com/userupload/4487675/file/still-2ef9e84caa94f5f5510171e03f5318b2.png?resize=800x600&vertical=center'}
                        />
                        <Stack p={2} gap={0}>
                            <Text fontSize={14} fontWeight={'bold'} color='gray.700'>{nft?.name} ({nft?.symbol})</Text>
                            <Text fontSize={12} color='gray.700'>{trimAddress(nft?.token_address)}</Text>
                            <Text mt={5} fontSize={12} color='gray.700'>TOKEN ID : {nft.token_id}</Text>
                        </Stack>
                    </Box>
                ))}
            </SimpleGrid>
        </>
    )
}

export default Assets