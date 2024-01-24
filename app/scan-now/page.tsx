import ResultScan from '@/components/ResultScan'
import {
    Container,
} from '@chakra-ui/react'
import React from 'react'


export default async function page() {
    return (
        <>
            <Container p={0} w={"full"} maxW="xl">
                <ResultScan />
            </Container>
        </>
    )
}