'use client'
import {
    Box,
    Button,
    Container,
    Flex,
    Heading,
    Icon,
    Image,
    Stack,
    Text,
} from '@chakra-ui/react'
import { ReactElement, useEffect } from 'react'
import {
    FcAssistant,
} from 'react-icons/fc'

interface CardProps {
    heading: string
    description: string
    href: string
    className : string
    image:string
}

const Card = ({ heading, description, image, href, className }: CardProps) => {
    return (
        <Box
            // maxW={{ base: 'full', md: '275px' }}
            className={className}
            w={'full'}
            borderRadius="xl"
            overflow="hidden"
            boxShadow={' 1px 1px 50px gray'}
            p={5}
            my={5}>
            <Stack align={'start'} spacing={2}>
                <Flex
                    w={16}
                    h={16}
                    align={'center'}
                    justify={'center'}
                    color={'white'}
                    rounded={'full'}
                    bg={'gray.100'}
                    overflow={'hidden'}
                >
                    {/* {icon} */}
                    <Image src={image} w={'full'} objectFit={'cover'} />
                </Flex>
                <Box mt={2}>
                    <Heading size="md">{heading}</Heading>
                    <Text mt={1} fontSize={'sm'}>
                        {description}
                    </Text>
                </Box>
                {/* <Button variant={'link'} colorScheme={'blue'} size={'sm'}>
                    Learn more
                </Button> */}
            </Stack>
        </Box>
    )
}



const intros = [
    {
        title: 'Kita Adalah Saudagar',
        text: 'Setiap orang Indonesia, bisa jadi Saudagar! Emas hanya bisa memberikan keuntungan keuangan APABILA DIPERJUALBELIKAN. Dengan teknologi yang digunakannya, transaksi tidak lagi hanya terjadi antara Pusat dan Pembeli, Para Saudagar dapat saling melakukan transaksi dengan mudah dan aman. Menabung sambil mendapatkan keuntungan melalui jual beli emas',
        image: '/sell.svg'
    },
    {
        title: 'Pertama Di Indonesia!',
        text: 'Emas Indonesia pertama yang menggunakan teknologi Blockchain. Teknologi yang memungkinkan Para Saudagar untuk saling bertransaksi dan memindahkan kepemilikannya secara langsung kepada siapapun yang dikehendaki oleh pemiliknya tanpa perlu melalui perantara dari pusat.',
        image: '/indonesia.svg'
    },
    {
        title: 'Keamanan Tinggi',
        text: 'Keaslian dan Kepemilikan dari emas Saudagar melekat pada kemasan serta dilindungi dengan teknologi Blockchain yang membuat setiap keping emas Saudagar unik dan hanya ada 1 di Dunia.',
        image: '/lock.svg'
    },
];

export default function Features() {

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                } else {
                    entry.target.classList.remove('show');
                }
            })
        })

        const hiddenElements = document.querySelectorAll('.hidden');
        hiddenElements.forEach((element) => {
            observer.observe(element);
        });
    }, [])

    return (
        <Box p={4} mt={28}>
            <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
                <Heading fontSize={{ base: '2xl', sm: '4xl' }} fontWeight={'bold'}>
                    Kenapa saudagar?
                </Heading>
                <Text color={'gray.600'} fontSize={{ base: 'sm', sm: 'lg' }}>
                    Kamu dapat melakukan transaksi emas dengan emas yang dapat dipastikan otentisitas dan histori kepemilikannya
                </Text>
            </Stack>

            <Container maxW={'5xl'} mt={12}>
                <Flex flexWrap="wrap" gridGap={6} justify="center">
                    {intros.map((intro, i) => (
                        <Card
                            className={'hidden'}
                            key={i}
                            heading={intro.title}
                            description={intro.text}
                            href={'#'}
                            image={intro.image}
                        />
                    ))}
                </Flex>
            </Container>
        </Box>
    )
}