'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { ReactNode, useEffect } from 'react'
import { Web3Modal } from './Web3Modal';
// import { sequence } from '0xsequence';
import Moralis from 'moralis';


export function Providers({ children }: { children: ReactNode }) {
	const config = {
		initialColorMode: 'dark',
	};
	const theme = extendTheme({ config });

	useEffect(() => {
		const startMoralisInstance = async () => {
			try {
				await Moralis.start({
					apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImFkN2ZhYTRhLTNlZWYtNGY4MC1iNDUwLTUyZDQwMTgxYmY1ZiIsIm9yZ0lkIjoiMzY1ODUzIiwidXNlcklkIjoiMzc2MDAxIiwidHlwZUlkIjoiYmFjYzhjMTYtOTJhNi00ZTE4LWE2ZjAtZjZkNzRhY2VlMDg3IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MDEwMDEwNTIsImV4cCI6NDg1Njc2MTA1Mn0.KZa9YIqf2n4WX4gkMa3Z-RA4yfJ3uwWaeXuKHaWaydM"
					// ...and any other configuration
				});
			} catch (error: Error | any) {
				console.log(error.message, "error starting moralis");
				return;
			};
		};

		startMoralisInstance();
	}, [])

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

