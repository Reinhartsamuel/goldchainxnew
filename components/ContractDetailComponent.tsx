'use client'
import {
    Flex,
    Container,
    Heading,
    Stack,
    Text,
    Button,
    useToast,
    StackDivider,
    Box,
    Center,
    Spinner,
} from '@chakra-ui/react'
import React, { useCallback, useEffect, useState } from 'react'
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

interface ChildComponentProps {
    setResultMoralis: any;
    setFirebaseData: React.Dispatch<React.SetStateAction<DocumentData | null | undefined>>;
}


const ContractDetailComponent: React.FC<ChildComponentProps> = ({ setResultMoralis, setFirebaseData }) => {
    const [result, setResult] = useState<any>();
    const [loadingFirebase, setLoadingFirebase] = useState(false);
    const [loadingMoralis, setLoadingMoralis] = useState(false);
    const [isScanning, setIsScanning] = useState(false);
    const [id, setId] = useState<string>("");


    const toast = useToast();

    const read = async () => {
        let firebaseDoc: DocumentData | null | undefined;
        if (id !== undefined) {
            // setId(result.text);
            setLoadingFirebase(true);
            setIsScanning(false);

            try {
                firebaseDoc = await getSingleDocumentFirebase('products', id);
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
        }
    }

    const handleResult = useCallback(async (result: any) => {
        if (typeof result?.text === "string" && result?.text?.length > 0) {
            try {
                setId(result?.text);
            } catch (error: Error | any) {
                console.log(error.message, 'error setting id from text')
            }
        };
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
                        facingMode: 'environment',
                    }}
                    videoStyle={{ border: 'solid', borderWidth: '4px', borderColor: id.length === 0 ? 'red' : 'green' }}
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


export default ContractDetailComponent
