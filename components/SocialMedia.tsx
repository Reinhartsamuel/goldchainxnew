'use client'
import { Center, Heading, Image, Stack, VStack } from '@chakra-ui/react'
import React from 'react'
const communitites = [
    {
        title: 'Gabung Komunitas',
        images: [
            {
                link: 'discord.com',
                name: 'discord'
            },
            {
                link: 'whatsapp.com',
                name: 'whatsapp'
            },
        ]
    },
    {
        title: 'Follow Media Sosial',
        images: [
            {
                link: 'instagram.com',
                name: 'instagram'
            },
            {
                link: 'twitter.com',
                name: 'twitter'
            },
            {
                link: 'tiktok.com',
                name: 'tiktok'
            },
        ]
    },
    {
        title: 'Marketplace Official',
        images: [
            {
                link: 'tokopedia.com',
                name: 'tokopedia'
            },
            {
                link: 'shopee.co.id',
                name: 'shopee'
            },
        ]
    },
]
const SocialMedia = () => {
    return (
        <Stack
            bg='white'
            m={100}
            rounded='xl'
        >
            {communitites.map((community, i) => (
                <VStack my={10} key={i}>
                    <Heading size='md' color='black' fontWeight={500}>{community.title}</Heading>
                    <Center mt={5} gap={10}>
                        {community.images.map((image, idx) => (
                            <Image
                                onClick={() => window.open(`//${image.link}`)}
                                cursor={'pointer'}
                                key={idx}
                                src={`/${image.name}.png`}
                                alt={image.name}
                            height="8"
                            />
                        ))}
                    </Center>
                </VStack>
            ))}
        </Stack>
    )
}

export default SocialMedia