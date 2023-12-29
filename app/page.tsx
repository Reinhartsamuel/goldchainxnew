import ComponentWrapper from '@/components/ComponentWrapper'
import HomeButtons from '@/components/HomeButtons'
import Navbar from '@/components/Navbar'
import TradingViewWidget from '@/components/TradingViewWidget'
import {
	Container,
	Stack,
	Flex,
	Box,
	Heading,
	Text,
	Button,
	Image,
	Icon,
	IconButton,
	createIcon,
	IconProps,
	SimpleGrid,
	StackDivider,
	Center,
	HStack,
	VStack,
} from '@chakra-ui/react'
// import { IoAnalyticsSharp, IoLogoBitcoin, IoSearchSharp } from 'react-icons/io5'



export default function Home() {

	return (
		<>
			<Navbar />
			<ComponentWrapper>
				<Container maxW={'7xl'}>
						<Stack
							align={'center'}
							spacing={{ base: 8, md: 10 }}
							py={{ base: 20, md: 28 }}
							direction={{ base: 'column', md: 'row' }}>
								<Stack flex={1} spacing={{ base: 5, md: 10 }}>
									<Heading
										lineHeight={1.1}
										fontWeight={600}
										fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}>
										<Text
											as={'span'}
											position={'relative'}
										>
											Aset emas terintegrasi
										</Text>
										<br />
										<Text as={'span'} color={'yellow.400'}>
											Blockchain
										</Text>
									</Heading>
									<Text color={'gray.400'}>
										Cek keaslian emas dengan scan QR code di belakang kemasan:
										"Scan, Verifikasi, Perdagangkan: Mengubah Kepemilikan Emas dengan Inovasi Blockchain – Emas Anda, Token Anda, Kendali Anda!
									</Text>
									<HomeButtons />
								</Stack>
							<Flex
								flex={1}
								justify={'center'}
								align={'center'}
								position={'relative'}
								w={'full'}>
								<Blob
									w={'150%'}
									h={'150%'}
									position={'absolute'}
									top={'-20%'}
									left={0}
									zIndex={-1}
									color={'red.50'}
								/>
								<Box
									position={'relative'}
									height={'300px'}
									rounded={'2xl'}
									boxShadow={'2xl'}
									width={'full'}
									overflow={'hidden'}>
									<IconButton
										aria-label={'Play Button'}
										variant={'ghost'}
										_hover={{ bg: 'transparent' }}
										size={'lg'}
										color={'white'}
										position={'absolute'}
										left={'50%'}
										top={'50%'}
										transform={'translateX(-50%) translateY(-50%)'}
									/>
									<Image
										alt={'Hero Image'}
										fit={'cover'}
										align={'center'}
										w={'100%'}
										h={'100%'}
										src={
											'https://firebasestorage.googleapis.com/v0/b/saudagar-92dc2.appspot.com/o/image-assets%2Fgold.jpeg?alt=media&token=4cfb30d3-519e-4677-adf7-de1937acb015'
										}
									/>
								</Box>
							</Flex>
						</Stack>
					<VStack my={70}>
					<TradingViewWidget />
						<Text my={10} color="white">Bekerjasama dengan:</Text>
						<HStack gap={10}>
							<Image
								src='https://www.emasin.id/storage/foto_banner/hu5iqxjkpADBVGQgAvyeIjrtUWTUEJyb2V0x1hb7.png'
								maxH={50}
							/>
							<Image
								src='https://sequence.app/sequence-banner.jpg'
								maxH={50}
							/>
							<Image
								src='https://www.logammulia.com/uploads/5b27105169bcc_20180618085217-1.jpg'
								maxH={50}
							/>
						</HStack>
					</VStack>
				</Container>
				<Container maxW={'5xl'}>
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
							<Text
								textTransform={'uppercase'}
								color={'blue.400'}
								fontWeight={600}
								fontSize={'sm'}
								bg={'blue.50'}
								p={2}
								alignSelf={'flex-start'}
								rounded={'md'}>
								Our Story
							</Text>
							<Flex gap={3}>
								<Heading>Mengapa</Heading>
								<Heading color="yellow.400">GoldChainX?</Heading>
							</Flex>
							<Text color={'gray.400'} fontSize={'lg'}>
								Dengan sistem Scan, Verifikasi, Perdagangkan kami, ambil kendali atas investasi logam mulia Anda seperti belum pernah sebelumnya. Setiap batangan emas fisik dilengkapi dengan kode QR yang membawa alamat kontrak dan ID token unik, menghubungkan dengan mulus antara yang nyata dan dunia digital.
							</Text>
							<Stack
								spacing={4}
								divider={
									<StackDivider borderColor={'gray.100'} />
								}>
								{/* 	<Feature
									icon={<Icon as={IoAnalyticsSharp} color={'yellow.500'} w={5} h={5} />}
									iconBg={'yellow.100'}
									text={'Business Planning'}
								/>
								<Feature
									icon={<Icon as={IoLogoBitcoin} color={'green.500'} w={5} h={5} />}
									iconBg={'green.100'}
									text={'Financial Planning'}
								/>
								<Feature
									icon={<Icon as={IoSearchSharp} color={'purple.500'} w={5} h={5} />}
									iconBg={'purple.100'}
									text={'Market Analysis'}
								/> */}
							</Stack>
						</Stack>
					</SimpleGrid>
				</Container>
			</ComponentWrapper>
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