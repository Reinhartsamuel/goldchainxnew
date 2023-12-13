'use client'
import {
    Flex,
    Container,
    Heading,
    Stack,
    Text,
    Button,
    Input,
    FormHelperText,
    FormControl,
    useToast,
    StackDivider,
    Box,
    Select,
    Center,
    Spinner,
} from '@chakra-ui/react'
import React, { DispatchWithoutAction, SetStateAction, useCallback, useEffect, useState } from 'react'
import axios from 'axios';
import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/common-evm-utils";
import { QrReader } from 'react-qr-reader';
import { getSingleDocumentFirebase } from '@/apis/firebaseApi';
import ButtonTransfer from './ButtonTransfer';
import Error from 'next/error';
import { DocumentData, Timestamp } from 'firebase/firestore';


interface MoralisProps {
    token_address?: string;
    token_id?: string;
    contract_type?: string;
    owner_of?: string;
    block_number?: string;
    block_number_minted?: string;
    token_uri?: string | undefined;
    metadata?: string | undefined;
    verified_collection?: boolean | undefined;
    contract_address?: string;
};

interface Moralis {
    data: string;
    abi: string;
};

// interface ResultDataMoralis {
//     amount: string;
//     block_number: string;
//     block_number_minted: string;
//     contract_type: string;
//     last_metadata_sync: string;
//     last_token_uri_sync: string;
//     token_uri?: string;
//     metadata?: string;
//     minter_address?: string;
//     name: string;
//     owner_of: string;
//     possible_spam: boolean;
//     symbol: string;
//     token_address: string;
//     token_hash: string;
//     token_id: string;
//     verified_collection: boolean;
// }

// interface DataFirebaseProduct {
//     contract_address: string;
//     createdAt: Timestamp;
//     id: string;
//     image_path: string;
//     manufacturer: string;
//     owner_email: string;
//     owner_id: string;
//     token_id: string;
//     weight: number;
// };


export default function ContractDetailComponent({ setResultMoralis }: { setResultMoralis: any }) {
    const [address, setAddress] = useState("");
    const [result, setResult] = useState<any>();
    const [isLoading, setIsLoading] = useState(false);
    const [loadingFirebase, setLoadingFirebase] = useState(false);
    const [loadingMoralis, setLoadingMoralis] = useState(false);
    const [inputInvalid, setInputInvalid] = useState(false);
    const [connection, setConnection] = useState("testnet");
    const [isScanning, setIsScanning] = useState(false);
    // const [resultMoralis, setResultMoralis] = useState<ResultDataMoralis | null>(null);
    const [firebaseData, setFirebaseData] = useState<DocumentData | null | undefined>();
    const [id, setId] = useState<string>("");


    const toast = useToast();

    const baseUrl = connection === "testnet" ? 'https://api-testnet.polygonscan.com/' : 'https://api.polygonscan.com/';

    const checkContract = async () => {
        console.log("baseUrl", baseUrl)
        if (address) {
            setIsLoading(true);
            try {
                const { data } = await axios.get(`${baseUrl}api?module=contract&action=getcontractcreation&contractaddresses=${address}&apikey=8CKNFTHGX9IXX4J8756D5N1MZ2ZZ7TWFE4`);


                if (data.status == '1') setResult(data.result[0]);
                if (data.status == '0') toast({
                    status: 'error',
                    isClosable: true,
                    duration: 9000,
                    title: "Error!",
                    description: data.result || data.message
                })
            } catch (error: Error | any) {
                console.log(error.message)
            } finally {
                setIsLoading(false)
            };
        } else {
            setInputInvalid(true);
        };
    };

    // const getAbi = async () => {
    //     console.log("baseUrl", baseUrl)

    //     if (address) {
    //         setIsLoading(true);
    //         try {
    //             const { data } = await axios.get(`https://api-testnet.polygonscan.com/api?module=contract&action=getabi&address=${address}&apikey=8CKNFTHGX9IXX4J8756D5N1MZ2ZZ7TWFE4`);

    //             // console.log(data)
    //             if (data.status == '1') setResult({ abi: data.result });
    //             if (data.status == '0') toast({
    //                 status: 'error',
    //                 isClosable: true,
    //                 duration: 9000,
    //                 title: "Error!",
    //                 description: data.result || data.message
    //             })
    //         } catch (error: Error | any) {
    //             console.log(error.message)
    //         } finally {
    //             setIsLoading(false)
    //         };
    //     } else {
    //         setInputInvalid(true);
    //     };
    // };


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (inputInvalid) setInputInvalid(false);
        setAddress(e.target.value);
    };


    const runMoralis = async (data: MoralisProps | undefined): Promise<void> => {
        setLoadingMoralis(true);
        setLoadingFirebase(false);
        const address = data?.contract_address;
        const chain = EvmChain.POLYGON;

        try {
            await Moralis.start({
                apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImFkN2ZhYTRhLTNlZWYtNGY4MC1iNDUwLTUyZDQwMTgxYmY1ZiIsIm9yZ0lkIjoiMzY1ODUzIiwidXNlcklkIjoiMzc2MDAxIiwidHlwZUlkIjoiYmFjYzhjMTYtOTJhNi00ZTE4LWE2ZjAtZjZkNzRhY2VlMDg3IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MDEwMDEwNTIsImV4cCI6NDg1Njc2MTA1Mn0.KZa9YIqf2n4WX4gkMa3Z-RA4yfJ3uwWaeXuKHaWaydM"
                // ...and any other configuration
            });
        } catch (error: Error | any) {
            console.log(error.message, "error starting moralis")
        };


        const tokenId = data?.token_id;
        try {

            const response = await Moralis.EvmApi.nft.getNFTTokenIdOwners({
                address: address || "",
                chain,
                tokenId: tokenId || "",
            });

            const json = response.toJSON();
            console.log(json?.result[0], "response moralis: json?.result[0]")
            const data = json?.result[0];

            // setResultMoralis(json.result[0]);
            console.log("data moralis", data);
            // setResultMoralis(data);
            // return setLoadingMoralis(false);
        } catch (error: Error | any) {
            console.log(error.message, "error reading from moralis")
        } finally {
            setLoadingMoralis(false);
        };
    };

    const getDetails = async (id: string) => {
        try {
            const result = await getSingleDocumentFirebase('products', id);
            console.log("result get details", result);
            setFirebaseData(result);
            // return await runMoralis(result || undefined);
        } catch (error: Error | any) {
            console.log(error.message, "error getting details from database");
            setLoadingFirebase(true);
        };
    };


    const read = async () => {
        window.alert(id)
        let firebaseDoc: DocumentData | null | undefined;
        if (id !== undefined) {
            // setId(result.text);
            setLoadingFirebase(true);
            setIsScanning(false);

            try {
                firebaseDoc = await getSingleDocumentFirebase('products', id);
                console.log("result get details", firebaseDoc);
                setFirebaseData(firebaseDoc);
                // return await runMoralis(result || undefined);
            } catch (error: Error | any) {
                console.log(error.message, "error getting details from database");
                setLoadingFirebase(false);
            };

            setLoadingMoralis(true);
            setLoadingFirebase(false);
            const address = firebaseDoc?.contract_address;
            const chain = EvmChain.POLYGON;

            try {
                await Moralis.start({
                    apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImFkN2ZhYTRhLTNlZWYtNGY4MC1iNDUwLTUyZDQwMTgxYmY1ZiIsIm9yZ0lkIjoiMzY1ODUzIiwidXNlcklkIjoiMzc2MDAxIiwidHlwZUlkIjoiYmFjYzhjMTYtOTJhNi00ZTE4LWE2ZjAtZjZkNzRhY2VlMDg3IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MDEwMDEwNTIsImV4cCI6NDg1Njc2MTA1Mn0.KZa9YIqf2n4WX4gkMa3Z-RA4yfJ3uwWaeXuKHaWaydM"
                    // ...and any other configuration
                });
            } catch (error: Error | any) {
                console.log(error.message, "error starting moralis");
                return;
            };


            const tokenId = firebaseDoc?.token_id;
            try {

                const response = await Moralis.EvmApi.nft.getNFTTokenIdOwners({
                    address: address || "",
                    chain,
                    tokenId: tokenId || "",
                });

                const json = response.toJSON();
                // console.log(json?.result[0], "response moralis: json?.result[0]")
                const data = json?.result[0];

                // setResultMoralis(json.result[0]);
                console.log("data moralis", data);
                setResultMoralis(data);
                // return setLoadingMoralis(false);
            } catch (error: Error | any) {
                setLoadingMoralis(false);
                toast({
                    title: 'error',
                    description: error.message,
                    status: 'error',
                    isClosable: true,
                    duration: 9000
                })
                console.log(error.message, "error reading from moralis")
            } finally {
                setLoadingMoralis(false);
            };


            // await getDetails(result?.text);
        }
    }



    const handleResult = useCallback(async (result: any) => {
        if (typeof result.text === "string" && result?.text?.length > 0) {
            setId(result.text);
        };
        return console.log(result.text, "this the id from qr")
    }, []);


    useEffect(() => {
        if (id.length > 1) read();
        return () => {
            setId("");
        };
    }, [id])

    return (
        <Container>
            {isScanning ? (
                <QrReader
                    onResult={handleResult}
                    // style={{ width: '500px' }}
                    scanDelay={1000}
                    constraints={{
                        facingMode: 'environment'
                    }}
                />
            ) :
                loadingFirebase ? <Center my={100}>
                    <Flex alignItems='center' gap={5}>
                        <Spinner />
                        <Heading>Get ID success</Heading>
                    </Flex>
                </Center>
                    :
                    loadingMoralis ? <Center my={100}>
                        <Flex alignItems='center' gap={5}>
                            <Spinner />
                            <Heading color="orange.400">Reading blockchain...</Heading>
                        </Flex>
                    </Center>
                        :
                        <></>}



            <Stack
                textAlign={'center'}
                align={'center'}
                spacing={{ base: 8, md: 10 }}
                py={{ base: 10, md: 14 }}
            >
                <Button
                    color={'orange.400'}
                    onClick={() => setIsScanning(!isScanning)}
                >
                    {isScanning ? 'Stop' : 'Scan sekarang!'}
                </Button>
                <Text color={'gray.500'} maxW={'3xl'}>
                    Setiap batangan emas fisik dilengkapi dengan kode QR yang membawa alamat kontrak dan ID token unik, menghubungkan dengan mulus antara yang nyata dan dunia digital. Telusuri dunia transparansi dan otentisitas, di mana emas Anda bukan hanya logam tetapi aset digital.
                </Text>
            </Stack>
            {result && result.abi === undefined ?

                <Stack
                    spacing={{ base: 4, sm: 6 }}
                    direction={'column'}
                    divider={
                        <StackDivider borderColor='gray.600' />
                    }>


                    {/* {resultMoralis ? Object.keys(resultMoralis).length > 1 && Object.keys(resultMoralis)?.map((key, index) => (
                        <Box key={index}>
                            <Text
                                fontSize={{ base: '16px', lg: '18px' }}
                                color='yellow.500'
                                fontWeight={'500'}
                                textTransform={'uppercase'}
                                mb={'4'}>
                                {key} :
                            </Text>
                            <Text
                                fontSize={{ base: '12px', lg: '14px' }}
                                color='gray.500'
                                fontWeight={'400'}
                                mb={'4'}>
                                {resultMoralis[key] || "-"}
                            </Text>

                        </Box>
                    )) : <></>} */}

                </Stack>

                :

                result?.abi !== undefined &&

                <Stack
                    spacing={{ base: 4, sm: 6 }}
                    direction={'column'}
                    divider={
                        <StackDivider borderColor='gray.600' />
                    }>
                    <Box>
                        <Text
                            fontSize={{ base: '16px', lg: '18px' }}
                            color='yellow.300'
                            fontWeight={'500'}
                            textTransform={'uppercase'}
                            mb={'4'}>
                            ABI
                        </Text>
                        <Text
                            fontSize={{ base: '12px', lg: '14px' }}
                            color='white'
                            fontWeight={'400'}
                            mb={'4'}>
                            {result?.abi}
                        </Text>

                    </Box>
                </Stack>
            }

            <Stack
                spacing={{ base: 4, sm: 6 }}
                direction={'column'}
                divider={
                    <StackDivider borderColor='gray.600' />
                }>


                {/* {resultMoralis && Object.keys(resultMoralis).length > 1 &&

                    // <Text>Asli cuy</Text>
                    Object.keys(resultMoralis)?.map((arg, index) => (
                        <Box key={index}>
                            <Text
                                fontSize={{ base: '16px', lg: '18px' }}
                                color='yellow.500'
                                fontWeight={'500'}
                                textTransform={'uppercase'}
                                mb={'4'}>
                                {arg} :
                            </Text>
                            <Text
                                fontSize={{ base: '12px', lg: '14px' }}
                                color='gray.500'
                                fontWeight={'400'}
                                mb={'4'}>
                                {(resultMoralis as any)[arg] || "-"}
                            </Text>
                        </Box>
                    ))

                } */}

            </Stack>

            {/* <ButtonTransfer data={resultMoralis} /> */}
        </Container>
    )
}