'use client'
import React, { useEffect, useState } from 'react'
import TransactionItemComponent from './TransactionItemComponent'
import Error from 'next/error';
import { sequence } from '0xsequence';
import { wallet } from '@/services/sequence';

const TransactionHistory = () => {
    const [trxList, setTrxList] = useState([]);
    const [isConnected, setIsConnected] = useState<boolean>(wallet.isConnected());
    const [walletAddress, setWalletAddress] = useState('');


    const getTransactionHistory = async () => {
        if (!walletAddress) return;
        console.log(walletAddress, ':wallet address in trx history')
        // try {
        //     const res = await fetch('/api/transaction/history', {
        //       method : 'POST',
        //       body : JSON.stringify({
        //         address : walletAddress,
                
        //       })
        //     });

        //     console.log(res, 'trx res')
        // } catch (error: Error | any) {
        //     console.log(error.message, 'error gettransactionhistory')
        // }
    };


    useEffect(() => {
        getTransactionHistory();
    },[walletAddress]);


    useEffect(() => {
        if (!isConnected) sequence.initWallet();
        setIsConnected(isConnected);
        const wallet = sequence.initWallet();
        const getAddress = async () => {
            try {
                const x = await wallet.getAddress();
                setWalletAddress(x);
            } catch (error) {
                console.log(error, "error getting address");
            };
        };
        getAddress();

    }, [wallet.isConnected()])

    return (
        <>
            {Array(10).fill('a').map((x, i) => (
                <TransactionItemComponent
                    key={i}
                    item={x}
                />
            ))}
        </>
    )
}

export default TransactionHistory