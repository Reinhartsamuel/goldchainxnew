'use client'

import {
    Box,
    Flex,
    HStack,
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    useDisclosure,
    Stack,
    Heading,
    Avatar,
    useToast,
    Text,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons'
import { ReactElement, useEffect, useState } from 'react'
import { sequence } from '0xsequence'
import { useRouter } from 'next/navigation'
import { trimAddress } from '@/services/utils'
import { logout } from '@/services/sequence'
import { useWalletStore } from '@/app/context/wallet'
import Image from 'next/image'

interface Props {
    children: string
}

const Links = ['Profile', 'Projects', 'Team']

const NavLink = (props: Props) => {
    const { children } = props
    return (
        <Box
            as="a"
            px={2}
            py={1}
            rounded={'md'}
            _hover={{
                textDecoration: 'none',
                bg: 'gray.200',
            }}
            href={children?.toLowerCase()}>
            {children}
        </Box>
    )
}

export default function Navbar(): ReactElement {
    const wallet = sequence.initWallet();
    const router = useRouter();
    sequence.initWallet();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [isConnected, setIsConnected] = useState<boolean>(wallet.isConnected());
    const [address, setAddress] = useState("")
    const toast = useToast();
    const { accountAddress, resetAccountAddress } = useWalletStore();

    useEffect(() => {
        setIsConnected(wallet.isConnected());
        const getAddress = async () => {
            try {
                const x = await wallet.getAddress();
                setAddress(x);
            } catch (error) {
                console.log(error, "error getting address");
            };
        };



        getAddress();

    }, [wallet.isConnected()])


    return (
        <>
            <Box bg='gray.800' px={4}>
                <Flex alignItems={'center'} justifyContent={'space-between'}>

                    <HStack h={16} spacing={8} alignItems={'center'}>
                        <Image src="/Asset_7.svg" alt="me" width="120" height="50" />
                        {/* <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
                            {Links.map((link) => (
                                <NavLink key={link}>{link}</NavLink>
                            ))}
                        </HStack> */}
                    </HStack>
                    <Flex alignItems={'center'}>
                        {/* <Button
                            variant={'solid'}
                            colorScheme={'teal'}
                            size={'sm'}
                            mr={4}
                            leftIcon={<AddIcon />}>
                            Action
                        </Button> */}
                        <Menu>
                            <MenuButton
                                as={Button}
                                rounded={'full'}
                                variant={'link'}
                                cursor={'pointer'}
                                minW={0}>
                                {/* <Heading size="md">{isConnected && trimAddress(address)}</Heading> */}
                                <Button
                                    fontStyle={'extrabold'}
                                    size={'xs'}
                                    fontWeight={'normal'}
                                    px={3}
                                    bg='white'
                                >
                                    <Text fontWeight='bold' color='black'>{wallet.isConnected() ? "Go to Profile " : "Login"}</Text>
                                </Button>
                                {/* <Avatar
                                    size={'sm'}
                                    src={
                                        'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                                    }
                                /> */}
                            </MenuButton>
                            <MenuList bg='black'>
                                <MenuItem bg='black' onClick={() => router.push('/profile')}>
                                    My Profile
                                </MenuItem>
                                <MenuItem bg='black' onClick={() => wallet.openWallet()}>
                                    Open Wallet
                                </MenuItem>
                                <MenuItem bg='black' onClick={() => logout(toast, router, resetAccountAddress)}>
                                    Disconnect Wallet
                                </MenuItem>
                                {/* <MenuDivider /> */}
                            </MenuList>
                        </Menu>
                    </Flex>
                    {/* <HStack>
                        <Button
                            fontStyle={'extrabold'}
                            size={'xs'}
                            fontWeight={'normal'}
                            px={3}
                            bg='white'
                        >
                            <Text fontWeight='bold' color='black'>{wallet.isConnected() ? "Go to Profile " : "Login"}</Text>
                        </Button>
                        <IconButton
                            bg='#00000000'
                            color='gray.100'
                            size={'md'}
                            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                            aria-label={'Open Menu'}
                            display={{ md: 'none' }}
                            onClick={isOpen ? onClose : onOpen}
                        />
                    </HStack> */}
                </Flex>

                {isOpen ? (
                    <Box pb={4} display={{ md: 'none' }}>
                        {/* <Stack as={'nav'} spacing={4}>
                            {Links.map((link) => (
                                <NavLink key={link}>{link}</NavLink>
                            ))}
                        </Stack> */}
                    </Box>
                ) : null}
            </Box>

        </>
    )
}