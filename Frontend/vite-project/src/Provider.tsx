'use client';

import '@rainbow-me/rainbowkit/styles.css';

import {
    getDefaultConfig,
    RainbowKitProvider,
} from '@rainbow-me/rainbowkit';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { http, WagmiProvider } from 'wagmi';

import {
    mainnet,
    polygon,
    arbitrum,
    optimism,
    base,
    sepolia,
} from 'wagmi/chains';

const config = getDefaultConfig({
    appName: 'DocuLEX',
    projectId: import.meta.env.VITE_WALLET_CONNECT_ID ?? '',
    //   chains: [mainnet, polygon, arbitrum, optimism, base,sepolia],
    chains: [sepolia],
    transports: {
        [sepolia.id]: http('https://eth-sepolia.g.alchemy.com/v2/MRqPlL4jzDUtrmZwRWH0D')
    },
});

const queryClient = new QueryClient();

export function Providers({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider coolMode showRecentTransactions={true}>
                    {children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
}