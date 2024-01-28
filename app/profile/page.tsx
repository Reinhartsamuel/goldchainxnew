import { LuWallet } from "react-icons/lu";
import { FaRegCopy } from "react-icons/fa";
import { Box, Center, Container, Divider, Flex, HStack, Heading, Image, SimpleGrid, Spacer, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import HeaderBar from "@/components/Header";
import UserProfile from "@/components/UserProfile";
import TransactionHistory from "@/components/TransactionHistory";
import Assets from "@/components/Assets";






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
							<Assets />
						</TabPanel>
						<TabPanel>
							<TransactionHistory />
						</TabPanel>
					</TabPanels>
				</Tabs>



			</Container>
		</>

	)
}

export default page