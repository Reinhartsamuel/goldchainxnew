'use client'
import { Box, Flex, HStack } from '@chakra-ui/react';
import React from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { CiLocationArrow1 } from "react-icons/ci";
import { RiFlag2Line } from "react-icons/ri";
import { useRouter } from 'next/navigation';

const HeaderBar: React.FC = () => {
    const router = useRouter();

    return (
        <Flex
            zIndex={200}
            position={'absolute'}
            // minW={'xs'}
            w={'100%'}
            // maxW={'xl'}
            flexDir={'row'}
            justifyContent={'space-between'}
            p={10}
            // position={'absolute'}
            top={0}
        >
            <Box
                onClick={() => router.back()}
                _active={{
                    bg: 'red'
                }}
                width={10}
                height={10}
                bg={'white'}
                rounded={'full'}
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
            >
                <IoIosArrowBack color={'#33363F'} size={20} />
            </Box>

            <HStack mr={10}gap={2}>
                <Box
                    _active={{
                        bg: 'red'
                    }}
                    width={10}
                    height={10}
                    bg={'white'}
                    rounded={'full'}
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                >
                    <CiLocationArrow1 color={'#33363F'} size={20} />
                </Box>
                <Box
                    _active={{
                        bg: 'red'
                    }}
                    width={10}
                    height={10}
                    bg={'white'}
                    rounded={'full'}
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                >
                    <RiFlag2Line color={'#33363F'} size={20} />
                </Box>
            </HStack>
        </Flex>
    )
}

export default HeaderBar;