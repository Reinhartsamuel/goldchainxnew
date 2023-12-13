'use client'

import React, { useState } from 'react'
import {
    Box,
    Container,
    Text,
    Image,
    Heading,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Divider,
    useToast,
    Center,
} from '@chakra-ui/react'
import HeaderBar from './Header'
import ContractDetailComponent from './ContractDetailComponent'

const ResultScan = () => {
    const [showResult, setShowResult] = useState<boolean>(false);
    const [resultMoralis, setResultMoralis] = useState<any>(null);



    return (
        <>
            {(!showResult && resultMoralis === null) ?
                <Center h="100vh">
                    <ContractDetailComponent setResultMoralis={setResultMoralis} />
                </Center>
                :
                <React.Fragment>
                    <HeaderBar />
                    <Box
                        // position={'relative'}
                        // maxH={340}
                        maxW={'100%'}
                        h={500}
                    >
                        <Box
                            h={400}
                            margin={10}
                            mt={'6xl'}
                            position={'relative'}
                            rounded={'2xl'}
                            overflow={'hidden'}
                        >
                            <Image
                                src={'https://cdn.dribbble.com/userupload/4487675/file/still-2ef9e84caa94f5f5510171e03f5318b2.png?resize=800x600&vertical=center'}
                            />
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
                            </Box>
                        </Box>
                    </Box>
                    <Text>{JSON.stringify(resultMoralis)}</Text>
                    <Accordion allowToggle defaultIndex={0} rounded={'xl'}>
                        <AccordionItem borderRightWidth={1} borderLeftWidth={1} rounded='xl'>
                            <h2>
                                <AccordionButton>
                                    <Box as="span" flex='1' textAlign='left'>
                                        <Heading size='md'>Ownership Data</Heading>
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
                    <Accordion allowToggle mt={10} defaultIndex={0}>
                        <AccordionItem borderRightWidth={1} borderLeftWidth={1} rounded='xl'>
                            <h2>
                                <AccordionButton>
                                    <Box as="span" flex='1' textAlign='left'>
                                        <Heading size='md'>Ownership Data</Heading>
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                <Text fontWeight='bold'>Contract address</Text>
                                <Text>1x12lnk1j1og31hd13s</Text>
                                <Divider mt={10} />
                                <Text fontWeight='bold'>Token ID</Text>
                                <Text>1x12lnk1j1og31hd13s</Text>
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
                    <Accordion allowToggle mt={10} defaultIndex={0}>
                        <AccordionItem borderRightWidth={1} borderLeftWidth={1} rounded='xl'>
                            <h2>
                                <AccordionButton>
                                    <Box as="span" flex='1' textAlign='left'>
                                        <Heading size='md'>Ownership Data</Heading>
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                <Text fontWeight='bold'>Contract address</Text>
                                <Text>1x12lnk1j1og31hd13s</Text>
                                <Divider mt={10} />
                                <Text fontWeight='bold'>Token ID</Text>
                                <Text>1x12lnk1j1og31hd13s</Text>
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
                </React.Fragment>
            }



        </>
    )
}

export default ResultScan