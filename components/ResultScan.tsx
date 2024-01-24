'use client'

import React, { useEffect, useState } from 'react'
import {
    Box,
    Text,
    Image,
    Heading,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Divider,
    Center,
    VStack,
    OrderedList,
    ListItem,
    Input,
    Button,
    HStack,
} from '@chakra-ui/react'
import HeaderBar from './Header'
import ContractDetailComponent from './ContractDetailComponent'
import { DocumentData, serverTimestamp } from 'firebase/firestore'
import { sequence } from '0xsequence'
import { useWalletStore } from '@/app/context/wallet'
import { useWallet } from '@/app/context/walletContext'
import { addDocumentFirebase } from '@/apis/firebaseApi'
import { ContractInterface, ethers } from 'ethers'

import { POSClient } from "@maticnetwork/maticjs"
import { wallet } from '@/services/sequence'
import { trimAddress } from '@/services/utils'

const ResultScan = () => {
    const [showResult, setShowResult] = useState<boolean>(false);
    const [resultMoralis, setResultMoralis] = useState<any>(null);
    const [firebaseData, setFirebaseData] = useState<DocumentData | null | undefined>();
    const { accountAddress } = useWalletStore(); // zustand
    const { walletAddress } = useWallet(); // react context
    const [isLoading, setIsLoading] = useState(false);
    const [receiver, setReceiver] = useState("");
    const [abi, setAbi] = useState<ContractInterface>("");


    const posClient = new POSClient();



    // const write = async () => {
    //     console.log('anjay')
    //     let wallet: sequence.provider.SequenceProvider;
    //     let signer;
    //     try {
    //         wallet = sequence.getWallet();
    //         signer = wallet.getSigner();
    //     } catch (error: Error | any) {
    //         wallet = sequence.initWallet();
    //         console.log(error.message, 'error getwallet and get signer')
    //     }

    //     let contractaddress = resultMoralis?.token_address;
    //     let contract = new ethers.Contract(contractaddress, abi, signer);
    //     console.log(contract);
    //     try {
    //         const setApprove = await contract.setApprovalForAll('0x5b423d5756f53e5e25292dddaf9cbeb74f36d87f', true);
    //         console.log('approve?', setApprove);
    //     } catch (error: Error | any) {
    //         console.log(error, 'error setapprovalforall');
    //     };
    // };


    const handleApproval = async () => {
        if (!receiver) return window.alert("Alamat Wallet tujuan harus diisi.")
        let signer;
        try {
            signer = wallet.getSigner();
        } catch (error: Error | any) {
            console.log(error.message, 'error getwallet and get signer')
        }
        // Replace with your Polygon RPC endpoint
        const polygonRpcEndpoint = "https://polygon-mainnet.infura.io/v3/87a1ee6e7bd247a69ad4f9034437b542";

        // Replace with your Polygon contract address and ABI
        const contractAddress = resultMoralis?.token_address;

        // Create a contract instance
        const contract = new ethers.Contract(contractAddress, abi, signer);
        try {
            const transferMetaData = await contract.transferFrom(accountAddress || walletAddress, receiver, resultMoralis?.token_id);
            await submitRequestTransfer();
            // console.log('transferMetaData?', transferMetaData);
        } catch (error: Error | any) {
            console.log(error, 'error setapprovalforall');
            window.alert(error.message)
        };
    }



    const submitRequestTransfer = async () => {
        setIsLoading(true);
        const submitData = {
            from: walletAddress || accountAddress,
            to: receiver,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        };
        if (!receiver) return window.alert("Alamat Wallet tujuan harus diisi.")
        try {
            const id = await addDocumentFirebase('transactions', submitData);
            if (!id) {
                window.alert("Request failed");
            } else {
                console.log(id, "id doc firebase")
                window.alert("Request success!");
            };
        } catch (error: Error | any) {
            console.log(error.message, "error submitting transfer request");
        } finally {
            setIsLoading(false);
        };
    };



    useEffect(() => {
        const fetchAbi = async () => {
            try {
                fetch(`/api/contract/abi?address=${resultMoralis?.token_address}`)
                    .then((res) => res.json())
                    .then((data) => {
                        console.log(data, "data from api");
                        setAbi(data.data.result)
                    })
            } catch (error) {

            }
        }
        fetchAbi();
    }, [resultMoralis]);


    useEffect(() => {
        const initPosClient = async () => {

            await posClient.init({
                network: 'testnet',  // 'testnet' or 'mainnet'
                version: 'mumbai', // 'mumbai' or 'v1'

            });
        };
        initPosClient();
    }, [])


    useEffect(() => {
        console.log(firebaseData, "firebaseData")
        console.log(resultMoralis, "resultMoralis")
    }, [resultMoralis, firebaseData])


    return (
        <>
            {(!showResult && resultMoralis === null) ?
                <Center h="100vh">
                    <ContractDetailComponent
                        setFirebaseData={setFirebaseData}
                        setResultMoralis={setResultMoralis}
                    />
                </Center>
                :
                <>
                    <HeaderBar />
                    <Box
                        // position={'relative'}
                        // maxH={340}
                        justifyContent={'center'}
                        alignItems={'center'}
                        w={'100%'}
                    >
                        <Box
                            margin={0}
                            mt={100}
                            position={'relative'}
                            rounded={'2xl'}
                            overflow={'hidden'}
                        >
                            {firebaseData && firebaseData?.type === 'video' ?

                                <video width="750" height="500" loop autoPlay muted>
                                    <source src={firebaseData?.image_path} />
                                </video>
                                : firebaseData?.type === 'image' ?
                                    <Image
                                        src={firebaseData ? firebaseData.image_path : 'https://cdn.dribbble.com/userupload/4487675/file/still-2ef9e84caa94f5f5510171e03f5318b2.png?resize=800x600&vertical=center'}
                                    /> :
                                    <></>}

                            {resultMoralis.token_address &&
                                <Box
                                    mt={10}
                                    bottom={0}
                                    left={0}
                                    position="absolute"
                                    bg='gray'
                                    opacity={0.6}
                                    padding={5}
                                    rounded={'xl'}
                                >
                                    <Heading size="md">
                                        {trimAddress(resultMoralis?.token_address)}
                                    </Heading>
                                </Box>}
                        </Box>
                    </Box>
                    {/* <Text><strong>MORALIS:::</strong>{JSON.stringify(resultMoralis)}</Text>
                    <Text>FIREBASE:::{JSON.stringify(firebaseData)}</Text>
                    <Text>My wallet from zustand:{accountAddress}</Text>
                    <Text>My wallet from context:{walletAddress}</Text>
                    <Text>Is this token owned by me ? <strong>{accountAddress?.toLocaleLowerCase() === resultMoralis.owner_of ? "TRUE" : "FALSEEEE"}</strong></Text> */}

                    <Accordion
                        mt={10}
                        mx={{
                            base: 5,
                            md: 10
                        }}
                        allowToggle
                        defaultIndex={0}
                    >
                        <AccordionItem borderRightWidth={1} borderLeftWidth={1} rounded='xl'>
                            <h2>
                                <AccordionButton>
                                    <Box as="span" flex='1' textAlign='left'>
                                        <VStack>
                                            <Heading>Ownership Data</Heading>
                                        </VStack>
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                <Text fontWeight='bold'>Contract address</Text>
                                <Text>{trimAddress(resultMoralis?.token_address)}</Text>
                                <Divider mt={10} />
                                <Text fontWeight='bold'>Token ID</Text>
                                <Text>{resultMoralis.token_id}</Text>
                                <Divider mt={10} />
                                <Text fontWeight='bold'>Weight</Text>
                                <Text>{firebaseData?.weight} gram</Text>
                                <Divider mt={10} />
                                <Text fontWeight='bold'>Token Owner</Text>
                                <HStack>
                                    <Text>{trimAddress(resultMoralis.owner_of)}</Text>
                                    <Text color='orange'>{accountAddress?.toLocaleLowerCase() === resultMoralis.owner_of ? " (You)" : ""} </Text>
                                </HStack>
                                <Divider mt={10} />
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>

                    <Accordion
                        mx={{
                            base: 5,
                            md: 10
                        }}
                        mt={10}
                        allowToggle
                        defaultIndex={0}>
                        <AccordionItem borderRightWidth={1} borderLeftWidth={1} rounded='xl'>
                            <h2>
                                <AccordionButton>
                                    <Box as="span" flex='1' textAlign='left'>
                                        <VStack>
                                            <Heading>Transfer Ownership</Heading>
                                        </VStack>
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                <Heading size='md'>Keaslian dan Kepemilikan</Heading>
                                <Text textAlign={'match-parent'}>Pembuktian keaslian dan kepemilikan menjadi krusial dalam mengelola aset. Teknologi memainkan peran vital dalam memastikan keamanan dan keabsahan klaim atas properti. Blockchain, telah menciptakan sistem terdesentralisasi yang mengizinkan pencatatan transaksi yang tidak bisa diubah, memastikan keaslian dipadankan dengan kepemilikan. Hanya token asli dengan pemilik sah saja yang dapat melakukan pemindahan kepemilikan.</Text>

                                <Heading mt={10} size='md'>Langkah pemindahan kepemilikan</Heading>
                                <OrderedList>
                                    <ListItem><strong>Scan QR Code</strong> yang berada pada kemasan emas</ListItem>
                                    <ListItem><strong>Login Sequence Wallet</strong> melalui website <strong>GoldChainX</strong> atau <strong>Official Partner</strong></ListItem>
                                    <ListItem><strong>Masukkan Alamat Sequence Wallet Tujuan</strong> transfer</ListItem>
                                    <ListItem>Tekan tombol <strong>Submit Transfer</strong></ListItem>
                                    <ListItem>Transaksi mu akan segera diproses oleh admin</ListItem>
                                </OrderedList>

                                <Box
                                    my={10}
                                    display={'flex'}
                                    align-items={'center'}
                                    justify-content={'center'}

                                >
                                    <Input
                                        onChange={e => setReceiver(e.target.value)}
                                        textAlign={'center'}
                                        _placeholder={{
                                            textAlign: 'center',
                                            verticalAlign: 'middle',
                                            color: 'gray.600',
                                            fontWeight: '400'
                                        }}
                                        fontWeight={'bold'}
                                        color="gray.800"
                                        bg="gray.100"
                                        placeholder='Insert Wallet Address Destination'
                                    />
                                </Box>
                                <Box
                                    my={10}>
                                    <Button
                                        w='full'
                                        colorScheme='green'
                                        // onClick={submitRequestTransfer}
                                        onClick={handleApproval}
                                        height={20}
                                        isLoading={false}
                                        loadingText={'Submitting request...'}
                                    >SUBMIT TRANSFER</Button>
                                </Box>

                                <Box
                                    my={10}>
                                    <VStack>
                                        <Text my={5} fontWeight={'bold'}>Perhatian!</Text>
                                        <Text textAlign={'center'}>Dengan transfer kepemilikan token maka kepemilikan akan berpindah dan anda bukan lagi pemilik serta kehilangan hak untuk memindahkan kepemilikan serta benefit lainnya</Text>

                                        <Text textAlign={'center'}>My wallet: {walletAddress}</Text>
                                    </VStack>
                                </Box>
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>


                </>
            }



        </>
    )
}

export default ResultScan