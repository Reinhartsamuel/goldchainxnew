'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { Web3Modal } from './Web3Modal';
import { sequence } from '0xsequence';


export function Providers({ children }: { children: ReactNode }) {
	const config = {
		initialColorMode: 'dark',
	};

	const theme = extendTheme({ config });

	const wallet = sequence.initWallet({
        defaultNetwork: 'mainnet',
        projectAccessKey: 'Q0ZfFkTedUvuQepZttdzEp3BAAAAAAAAA',
    });


	return (
		<CacheProvider>
			<ChakraProvider theme={theme}>
				<Web3Modal>
					{children}
				</Web3Modal>
			</ChakraProvider>
		</CacheProvider>
	);
};

