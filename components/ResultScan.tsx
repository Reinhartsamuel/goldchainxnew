'use client'

import React, { useState } from 'react'
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
} from '@chakra-ui/react'
import HeaderBar from './Header'
import ContractDetailComponent from './ContractDetailComponent'
import { DocumentData } from 'firebase/firestore'

const ResultScan = () => {
    const [showResult, setShowResult] = useState<boolean>(false);
    const [resultMoralis, setResultMoralis] = useState<any>(null);
    const [firebaseData, setFirebaseData] = useState<DocumentData | null | undefined>();



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
                        w={'100%'}
                    >
                        <Box
                            bg='red'
                            margin={0}
                            mt={100}
                            position={'relative'}
                            rounded={'2xl'}
                            overflow={'hidden'}
                        >
                            <Image
                                src={'https://cdn.dribbble.com/userupload/4487675/file/still-2ef9e84caa94f5f5510171e03f5318b2.png?resize=800x600&vertical=center'}
                            />
                            {resultMoralis.token_address &&
                                <Box
                                    bottom={0}
                                    left={0}
                                    position="absolute"
                                    bg='gray'
                                    opacity={0.6}
                                    padding={5}
                                    rounded={'xl'}
                                >
                                    <Heading size="md">
                                        {resultMoralis.token_address}
                                    </Heading>
                                </Box>}
                        </Box>
                    </Box>
                    <Text><strong>MORALIS:::</strong>{JSON.stringify(resultMoralis)}</Text>
                    <Text><strong>FIREBASE:::</strong>{JSON.stringify(firebaseData)}</Text>

                    <Accordion
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
                                <Text>{resultMoralis.token_address}</Text>
                                <Divider mt={10} />
                                <Text fontWeight='bold'>Token ID</Text>
                                <Text>{resultMoralis.token_id}</Text>
                                <Divider mt={10} />
                                <Text fontWeight='bold'>Weight</Text>
                                <Text>1 gram</Text>
                                <Divider mt={10} />
                                <Text fontWeight='bold'>Token Owner</Text>
                                <Text>1x12lnk1j1og31hd13s (you)</Text>
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
                                        onClick={() => { }}
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