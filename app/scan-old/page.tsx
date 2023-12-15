import ContractDetailComponent from '@/components/ContractDetailComponent'
import Navbar from '@/components/Navbar'
import {
    Box,
    chakra,
    Container,
    Stack,
    Text,
    Image,
    Flex,
    VStack,
    Button,
    Heading,
    SimpleGrid,
    StackDivider,
    List,
    ListItem,
    Center,
} from '@chakra-ui/react'
import { MdLocalShipping } from 'react-icons/md'

export default function ContractDetails() {
    return (
        <>
            <Navbar />
            <Container maxW={'7xl'}>
                <SimpleGrid
                    columns={{ base: 1, lg: 2 }}
                    spacing={{ base: 8, md: 10 }}
                    py={{ base: 18, md: 24 }}>
                    <Flex flexDir={'row'} justifyContent={'center'}>
                        <Image
                            rounded={'md'}
                            alt={'product image'}
                            src={
                                'https://firebasestorage.googleapis.com/v0/b/saudagar-92dc2.appspot.com/o/image-assets%2Fgold.jpeg?alt=media&token=4cfb30d3-519e-4677-adf7-de1937acb015'
                            }
                            fit={'cover'}
                            align={'center'}
                            w={'100%'}
                        // h={{ base: '100%', sm: '400px', lg: '500px' }}
                        />
                    </Flex>
                    <Stack spacing={{ base: 6, md: 10 }}>
                        <Box as={'header'}>
                            <Center>
                                <Heading
                                    lineHeight={1.1}
                                    fontWeight={600}
                                    fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
                                    Scan qr di bawah untuk memulai:
                                </Heading>
                            </Center>
                            {/* <ContractDetailComponent /> */}
                        </Box>



                        <Stack direction="row" alignItems="center" justifyContent={'center'}>
                            <MdLocalShipping />
                            <Text>2-3 business days delivery</Text>
                        </Stack>
                    </Stack>
                </SimpleGrid>
            </Container>
        </>
    )
}