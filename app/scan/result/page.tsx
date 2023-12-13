import ContractDetailComponent from '@/components/ContractDetailComponent'
import HeaderBar from '@/components/Header'
import ResultScan from '@/components/ResultScan'
import { wallet } from '@/services/sequence'
import { trimAddress } from '@/services/utils'
import {
    Container,
} from '@chakra-ui/react'
import React from 'react'


export default async function page() {
    return (
        <>
            <Container maxW="2xl">
                <ResultScan />
            </Container>
        </>
    )
}