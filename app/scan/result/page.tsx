import { sequence } from '0xsequence'
import HeaderBar from '@/components/Header'
import { connectToSequence } from '@/services/sequence'
import { trimAddress } from '@/services/utils'
import {
    Box,
    Container,
    Stack,
    Text,
    Image,
    Heading,
    SimpleGrid,
    Center,
    HStack,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Divider,
} from '@chakra-ui/react'
import { FaRegCopy } from 'react-icons/fa'
import { LuWallet } from 'react-icons/lu'






export default async function page() {
    sequence.initWallet({
        defaultNetwork: 'mainnet',
        projectAccessKey: 'Q0ZfFkTedUvuQepZttdzEp3BAAAAAAAAA',
    });


    const wallet = sequence.getWallet();

    const details = connectToSequence();

    console.log("details", details);
    console.log("hello")

    return (
        <>
            <Container maxW="2xl">
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
                                {wallet.isConnected() ? trimAddress(wallet.getAddress())
                                    : "1231312312312"
                                }
                            </Heading>
                        </Box>
                    </Box>


                </Box>
                <Accordion allowToggle  defaultIndex={0} rounded={'xl'}>
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
            </Container>
        </>
    )
}