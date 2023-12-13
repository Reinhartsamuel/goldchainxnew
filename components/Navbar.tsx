'use client'

import {
    Box,
    Flex,
    Avatar,
    HStack,
    Text,
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    Stack,
    Heading,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons'
import { ReactElement, useEffect, useState } from 'react'
import { sequence } from '0xsequence'
import { useRouter } from 'next/navigation'
import { trimAddress } from '@/services/utils'
import { logout } from '@/services/sequence'

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
    const wallet = sequence.getWallet();
    const router = useRouter();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [isConnected, setIsConnected] = useState<boolean>(wallet.isConnected());



    useEffect(() => {
        sequence.initWallet({
            defaultNetwork: 'mainnet',
            projectAccessKey: 'Q0ZfFkTedUvuQepZttdzEp3BAAAAAAAAA',
        });
    }, []);



    useEffect(() => {
        setIsConnected(wallet.isConnected());
    }, [wallet.isConnected()])

    return (
        <>
            <Box bg='gray.800' px={4}>
                <Flex alignItems={'center'} justifyContent={'space-between'}>
                    <IconButton
                        bg='gray.700'
                        color='gray.500'
                        size={'md'}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <HStack h={16} spacing={8} alignItems={'center'}>
                        <Heading color='gray.100'>GCX</Heading>
                        <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
                            {Links.map((link) => (
                                <NavLink key={link}>{link}</NavLink>
                            ))}
                        </HStack>
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
                                <Heading size="md">{isConnected && trimAddress(wallet.getAddress())}</Heading>
                                {/* <Avatar
                                    size={'sm'}
                                    src={
                                        'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                                    }
                                /> */}
                            </MenuButton>
                            <MenuList bg='black'>
                                <MenuItem bg='black' onClick={() => router.push('/home')}>
                                    My Profile
                                </MenuItem>
                                <MenuItem bg='black' onClick={() => wallet.openWallet()}>
                                    Open Wallet
                                </MenuItem>
                                <MenuItem bg='black' onClick={logout}>
                                    Disconnect Wallet
                                </MenuItem>
                                {/* <MenuDivider /> */}
                            </MenuList>
                        </Menu>
                    </Flex>
                </Flex>

                {isOpen ? (
                    <Box pb={4} display={{ md: 'none' }}>
                        <Stack as={'nav'} spacing={4}>
                            {Links.map((link) => (
                                <NavLink key={link}>{link}</NavLink>
                            ))}
                        </Stack>
                    </Box>
                ) : null}
            </Box>

        </>
    )
}