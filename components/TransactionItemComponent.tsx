import { Box, Divider, Flex, HStack, Image, Stack, Text } from '@chakra-ui/react';
import React from 'react'



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

export default TransactionItemComponent