import ComponentWrapper from '@/components/ComponentWrapper'
import { Footer } from '@/components/Footer'
import HomeButtons from '@/components/HomeButtons'
import Navbar from '@/components/Navbar'
import ReactHtmlParser from 'react-html-parser';
import {
    Container,
    Stack,
    Flex,
    Box,
    Heading,
    Text,
    Icon,
    IconProps,
    Image,
    Center,
    VStack,
} from '@chakra-ui/react'
import React from 'react';
import SocialMedia from '@/components/SocialMedia';
import FrontBanner from '@/components/FrontBanner';
import Features from '@/components/Features';

const intros = [
    {
        title: 'Kita Adalah Saudagar',
        text: '<p style="color:black">Setiap orang Indonesia, bisa jadi Saudagar! Emas hanya bisa memberikan keuntungan keuangan APABILA <strong>DIPERJUALBELIKAN</strong>. Dengan teknologi yang digunakannya, transaksi tidak lagi hanya terjadi antara Pusat dan Pembeli, Para Saudagar dapat saling melakukan transaksi dengan mudah dan aman. Menabung sambil mendapatkan keuntungan melalui jual beli emas</p>'
    },
    {
        title: 'Pertama Di Indonesia!',
        text: '<p style="color:black">Emas Indonesia pertama yang menggunakan teknologi Blockchain.<strong>Teknologi</strong> yang memungkinkan Para Saudagar untuk saling bertransaksi dan memindahkan kepemilikannya secara langsung kepada siapapun yang dikehendaki oleh pemiliknya tanpa perlu melalui perantara dari pusat.</p>'
    },
    {
        title: 'Keamanan Tinggi',
        text: '<p style="color:black"><strong>Keaslian dan Kepemilikan</strong> dari emas Saudagar melekat pada kemasan serta dilindungi dengan teknologi Blockchain yang membuat setiap keping emas Saudagar unik dan hanya ada 1 di Dunia.</p>'
    },
];

const contents = [
    {
        title: 'Beli',
        text: 'Beli Emas Saudagar sama dengan menjadi Saudagar seutuhnya, beli dari pusat bisa, bahkan kamu bisa jadi mendapatkan harga lebih murah jika membeli dari pemilik Emas Saudagar siapapun itu. Gabung di Komunitas Saudagar.'
    },
    {
        title: 'Jual (Buy Back)',
        text: 'Jual Emas Saudagar bisa kemana? Ke Pusat tentunya, tetapi tidak cuma ke pusat aja, bisa jadi Jual ke Komunitas Saudagar malah lebih menguntungkan untuk kamu. Gabung di Komunitas Saudagar sekarang.'
    },
    {
        title: 'Gadai',
        text: 'Soon, gadai akan disediakan, bayangkan gadai BPKB mobil tapi mobilnya tetap bisa dipakai.. Begitu juga di saudagar, ‘gadai’ kepemilikannya saja dana bisa langsung cair. Butuh dana darurat?'
    },
    {
        title: 'Lelang',
        text: 'Berikan penawaran terbaikmu di Komunitas Saudagar, jika hargamu dirasa cocok dan ada yang minat membeli maka bisa dilakukan pembelian oleh siapapun dalam Komunitas.'
    },
    {
        title: 'Tabungan Emas',
        text: '5 tahun lagi harga emas umumnya meningkat (berdasarkan histori), book emas kepingan besar di harga sekarang, cicil tiap bulan.'
    },
];



export default function Home() {

    return (
        <>
            <Navbar />
            {/* <ComponentWrapper> */}
            <Container>
                <Stack
                    align={'center'}
                    spacing={{ base: 8, md: 10 }}
                    py={{ base: 20, md: 28 }}
                    direction={{ base: 'column', md: 'row' }}>
                    <Stack flex={1} spacing={{ base: 5, md: 10 }}>
                        <Heading
                            lineHeight={1.2}
                            fontWeight={600}
                            fontSize={{ base: '2xl', sm: '3xl', lg: '4xl' }}
                            textAlign={'center'}
                        >
                            <Text
                                as={'span'}
                                position={'relative'}
                            >
                                Kepemilikan dan Otentisitas
                            </Text>
                            <br />
                            <Text as={'span'} color={'yellow.400'}>
                               LOGAM MULIA EMAS
                            </Text>
                            <Text> didukung teknologi Blockchain</Text>
                        </Heading>

                        <Box borderRadius={10} overflow={'hidden'}
                        //  boxShadow={' 1px 1px 200px white'}
                        >

                            <video width="750" height="500" loop autoPlay muted>
                                <source src={'https://firebasestorage.googleapis.com/v0/b/saudagar-92dc2.appspot.com/o/products%2Fsaudagar_black_gradient.mp4?alt=media&token=72591312-074d-4912-bdac-232c340f96c5'} />
                            </video>
                        </Box>

                        <Text color={'gray.400'}>
                            Cek keaslian emas dengan scan QR code di belakang kemasan:
                            "Scan, Verifikasi, Perdagangkan: Mengubah Kepemilikan Emas dengan Inovasi Blockchain – Emas Anda, Token Anda, Kendali Anda!
                        </Text>
                        <HomeButtons />
                    </Stack>
                </Stack>
            </Container>
            {/* <Container maxW={'5xl'}>
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                        <Flex>
                            <Image
                                rounded={'md'}
                                alt={'feature image'}
                                src={
                                    'https://www.logammulia.com/uploads/ngc_master_item_variant/5ef98e01732fb_20200629134521-1.jpg'
                                }
                                objectFit={'cover'}
                            />
                        </Flex>
                        <Stack spacing={4}>
                            <Flex gap={3}>
                                <Heading>Mengapa</Heading>
                                <Heading color="yellow.400">GoldChainX?</Heading>
                            </Flex>
                            <Text color={'gray.400'} fontSize={'lg'}>
                                Dengan sistem Scan, Verifikasi, Perdagangkan kami, ambil kendali atas investasi logam mulia Anda seperti belum pernah sebelumnya. Setiap batangan emas fisik dilengkapi dengan kode QR yang membawa alamat kontrak dan ID token unik, menghubungkan dengan mulus antara yang nyata dan dunia digital.
                            </Text>
                        </Stack>
                    </SimpleGrid>
                </Container> */}

                <FrontBanner />
                <Features />
            {/* <Heading size='md'>Kenapa saudagar?</Heading>
            <Stack>
                {intros.map((intro, i) => {
                    const htmlString = intro.text;
                    const theObj = { __html: htmlString };
                    return (
                        <Box
                            key={i}
                            margin={5}
                            rounded={'lg'}
                            bg={'white'}
                            padding={5}
                        >
                            <Heading fontWeight={500} color='black' mt={2}>{intro.title}</Heading>
                            <div>{ReactHtmlParser(htmlString)}</div>
                        </Box>
                    )
                })}
            </Stack> */}
            <Stack>
                {contents.map((content, i) => {
                    const htmlString = content.text;
                    return (
                        <Box
                            key={i}
                            margin={5}
                            // rounded={'lg'}
                            // bg={'white'}
                            padding={5}
                        >
                            <Heading fontWeight={500} mt={2}>{content.title}</Heading>
                            <div>{ReactHtmlParser(htmlString)}</div>
                        </Box>
                    )
                })}

            </Stack>
            {/* <SocialMedia /> */}

            {/* </ComponentWrapper> */}
            {/* <Footer /> */}
        </>
    )
}

const Blob = (props: IconProps) => {
    return (
        <Icon
            width={'100%'}
            viewBox="0 0 578 440"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M239.184 439.443c-55.13-5.419-110.241-21.365-151.074-58.767C42.307 338.722-7.478 282.729.938 221.217c8.433-61.644 78.896-91.048 126.871-130.712 34.337-28.388 70.198-51.348 112.004-66.78C282.34 8.024 325.382-3.369 370.518.904c54.019 5.115 112.774 10.886 150.881 49.482 39.916 40.427 49.421 100.753 53.385 157.402 4.13 59.015 11.255 128.44-30.444 170.44-41.383 41.683-111.6 19.106-169.213 30.663-46.68 9.364-88.56 35.21-135.943 30.551z"
                fill="currentColor"
            />
        </Icon>
    )
}