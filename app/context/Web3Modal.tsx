// "use client"

// import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react'

// export function Web3ModalProvider({ children }: { children: React.ReactNode }) {
//     // 1. Get projectId at https://cloud.walletconnect.com
//     const projectId = '2850902789733ba0d32531fbdda6f691';

//     // 2. Set chains
//     const mainnet = {
//         chainId: 1,
//         name: 'Ethereum',
//         currency: 'ETH',
//         explorerUrl: 'https://etherscan.io',
//         rpcUrl: 'https://cloudflare-eth.com'
//     }

//     // 3. Create modal
//     const metadata = {
//         name: 'GoldChainX',
//         description: 'My Website description',
//         url: 'https://goldchainxnew.vercel.app',
//         icons: ['https://avatars.mywebsite.com/']
//     }

//     createWeb3Modal({
//         ethersConfig: defaultConfig({ metadata }),
//         chains: [mainnet],
//         projectId
//     })
//     return children;
// }


"use client";

import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'

import { WagmiConfig } from 'wagmi'
import { arbitrum, mainnet } from 'viem/chains'

// 1. Get projectId at https://cloud.walletconnect.com
const projectId =  '2850902789733ba0d32531fbdda6f691';

// 2. Create wagmiConfig
const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal Example',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const chains = [mainnet, arbitrum]
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })

// 3. Create modal
createWeb3Modal({ wagmiConfig, projectId, chains })

export function Web3Modal({ children }: { children: React.ReactNode }) {
  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
}