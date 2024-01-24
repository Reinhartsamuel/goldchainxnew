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
import { login, logout } from '@/services/sequence'
import { useWalletStore } from '@/app/context/wallet'
import Image from 'next/image'
import { useWallet } from '@/app/context/walletContext'

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
    const { setAccountAddress, accountAddress, resetAccountAddress } = useWalletStore();
    // const { , resetAccountAddress }: WalletState = useWalletStore();
    const { setWalletAddress } = useWallet();

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
                    </HStack>
                    <Flex alignItems={'center'}>
                        {wallet.isConnected() ?

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
                                        <HStack>

                                            <Text fontWeight='bold' color='black'>{trimAddress(wallet.getAddress())}</Text>
                                        </HStack>
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



                            :


                            <Button
                                fontStyle={'extrabold'}
                                size={'xs'}
                                fontWeight={'normal'}
                                px={3}
                                bg='white'
                                onClick={() => login(toast, router, setAccountAddress, setWalletAddress)}
                            >
                                <Flex gap={2}>
                                    <Image src={'https://sequence.xyz/sequence-icon.svg'} width={20} height={20} alt={'sequence'} />
                                    <Text fontWeight='bold' color='black'>{wallet.isConnected() ? "Go to Profile " : "Login"}</Text>
                                </Flex>
                            </Button>
                        }

                    </Flex>
                </Flex>
            </Box>

        </>
    )
}