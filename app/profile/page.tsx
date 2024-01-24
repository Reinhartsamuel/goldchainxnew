import { LuWallet } from "react-icons/lu";
import { FaRegCopy } from "react-icons/fa";
import { Box, Center, Container, Divider, Flex, HStack, Heading, Image, SimpleGrid, Spacer, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import HeaderBar from "@/components/Header";
import UserProfile from "@/components/UserProfile";


interface TransactionProps {
	to: string;
	from: string;
	url: string;
}

const TransactionItemComponent: React.FC<{ item: TransactionProps }> = ({ item }) => {
	return (
		<Box
			bg={'gray.700'}
			borderWidth={2}
			borderColor={'gray.100'}
			borderRadius={20}
			overflow={'hidden'}
			my={3}
			display={'flex'}
			flexDir={'column'}
			alignItems={'center'}
		>
			<Flex w={'full'} my={2}>
				<Image
					borderRadius={20}
					w={28}
					h={28}
					src={'https://cdn.dribbble.com/userupload/4487675/file/still-2ef9e84caa94f5f5510171e03f5318b2.png?resize=800x600&vertical=center'}
				/>
				<Stack gap={0}>
					<Text>Buy</Text>
					<Text>Emasin #0x70bdE7F57</Text>
					<Text>100 Gram</Text>

					<Text mt={5}>11.30.34 Tue, 5 Dec 2023 (GMT+7)</Text>
				</Stack>
				<HStack>
					<Divider orientation={'vertical'} />
					<Stack gap={0}>
						<Text fontWeight={'bold'}>From</Text>
						<Text>0x70bd...E8000</Text>
						<Text fontWeight={'bold'} mt={5}>To</Text>
						<Text>0x70bd...A9000</Text>
					</Stack>
				</HStack>
			</Flex>
		</Box>
	)
};

const page = () => {
	return (
		<>
			<HeaderBar />
			<Container maxW="xl">
				<Box maxH={340} overflow={'hidden'}>
					<Image
						src={'https://cdn.dribbble.com/userupload/4487675/file/still-2ef9e84caa94f5f5510171e03f5318b2.png?resize=800x600&vertical=center'}
					/>
				</Box>
				<Center
					zIndex={2}
					justifyContent={'center'}
					alignItems={'center'}
				>
					<Box
						marginTop={-50}
						w={100}
						h={100}
						rounded={'full'}
						bg='red'
						overflow={'hidden'}
					>
						<Image
							w={100}
							h={100}
							src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8Ph4WSVtA8jStGan6Y6dcSd9xyI6Tt1dqhw&usqp=CAU'}
						/>
					</Box>
				</Center>

				<Center
					zIndex={2}
					justifyContent={'center'}
					alignItems={'center'}
					mt={5}
					gap={2}
				>
					<UserProfile />
				</Center>
				<Box
					bg={'gray.700'}
					p={5}
					borderWidth={2}
					borderColor={'gray.100'}
					borderRadius={50}
					// w={'full'}
					// h={50}
					my={10}
					mx={20}
					display={'flex'}
					flexDir={'column'}
					alignItems={'center'}
				>
					<SimpleGrid w="full" columns={2} >
						<Center>
							<Text fontWeight={'bold'}>Total Assets : </Text>
						</Center>
						<Center>
							<Text fontWeight={'bold'}>16.6 gram
								<sub style={{ color: '#48BB78' }}>(+15%)</sub></Text>
						</Center>
					</SimpleGrid>
					<SimpleGrid w="full" columns={2} >
						<Center>
							<Text fontWeight={'bold'}>Unrealised in fiat : </Text>
						</Center>

						<Center>
							<Text fontWeight={'bold'}>116,600,000 IDR <sub style={{ color: '#48BB78' }}>(+15%)</sub></Text>
						</Center>
					</SimpleGrid>



				</Box>

				<Tabs>
					<TabList>
						<Tab width={'50%'}>
							<Heading size="md">
								Assets
							</Heading>
						</Tab>
						<Tab width={'50%'}>
							<Heading size="md">
								Transactions
							</Heading>
						</Tab>
					</TabList>

					<TabPanels>
						<TabPanel>
							<SimpleGrid gap={1} w={'full'} columns={2}>
								{Array(10).fill('a').map((item, i) => (
									<Box
										display={'flex'}
										flexDir={'column'}
										key={i}
										justifyContent={'center'}
										alignItems='center'
										px={10}
										my={2}
									>
										<Box
											bg='gray.200'
											borderColor={'gray.50'}
											borderWidth={2}
											borderRadius={20}
											overflow={'hidden'}
										>
											<Image
												src={'https://cdn.dribbble.com/userupload/4487675/file/still-2ef9e84caa94f5f5510171e03f5318b2.png?resize=800x600&vertical=center'}
											/>
											<Stack p={2} gap={0}>
												<Text fontSize={14} fontWeight={'bold'} color='gray.700'>Emasin #0x70bdE7F57</Text>
												<Text fontSize={12} color='gray.700'>(0x70bd...E7F57 )</Text>
												<Text mt={5} fontSize={12} color='gray.700'>100 gram</Text>
											</Stack>
										</Box>

									</Box>
								))}
							</SimpleGrid>
						</TabPanel>
						<TabPanel>

							{Array(10).fill('a').map((x, i) => (
								<TransactionItemComponent
									key={i}
									item={x}
								/>
							))}
						</TabPanel>
					</TabPanels>
				</Tabs>



			</Container>
		</>

	)
}

export default page