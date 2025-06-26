import { toHex } from './utilities';

export const PROVIDER_ETH = 'https://rinkeby.infura.io/v3/';
export const baseURL = process.env.NEXT_PUBLIC_BACKEND_HOST
export const INFURA_ID = 'e82e9afe1b3948ebaa676c8426ae2069';
export const moralisWeb3ApiKey = `U71GS4geRQqepCEjRoGDreGe6o3WXzXSrfpavyouETqBBRVu0csfVJlu0kItnPgg`;
export const NETWORKS = {
    '1': 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    '4': PROVIDER_ETH,
    '56': 'https://bsc-dataseed1.binance.org',
    '97': 'https://data-seed-prebsc-1-s2.binance.org:8545'
}
export const CHAIN_ID = 97
interface AddEthereumChainParameter {
    chainId: string; // A 0x-prefixed hexadecimal string
    chainName: string;
    nativeCurrency: {
        name: string;
        symbol: string; // 2-6 characters long
        decimals: 18;
    };
    rpcUrls: string[];
    blockExplorerUrls?: string[];
    iconUrls?: string[]; // Currently ignored.
}


export enum StatusEnum {
    DEV,
    PROD
}

export enum NetworksEnum {
    BSC,
}

export type StatusKeys = keyof typeof StatusEnum;
export type NetworksEnumKeys = keyof typeof NetworksEnum;
export type ContractsDataType = Record<StatusKeys, Record<NetworksEnumKeys, AddEthereumChainParameter>>;

export const networks: ContractsDataType = {
    DEV: {
        BSC: {
            chainId: toHex(Number(process.env.NEXT_PUBLIC_BSC_NET_ID)),
            chainName: process.env.NEXT_PUBLIC_BSC_CHAIN_NAME!,
            nativeCurrency: {
                name: 'Binance USD',
                symbol: 'FBUSD',
                decimals: 18
            },
            rpcUrls: [
                'https://data-seed-prebsc-1-s1.binance.org:8545',
                'https://data-seed-prebsc-1-s2.binance.org:8545',
                'https://data-seed-prebsc-1-s3.binance.org:8545',
                'https://data-seed-prebsc-2-s1.binance.org:8545',
                'https://data-seed-prebsc-2-s2.binance.org:8545',
                'https://data-seed-prebsc-2-s3.binance.org:8545',
                'https://bsctestapi.terminet.io/rpc',
            ],
            blockExplorerUrls: [process.env.NEXT_PUBLIC_BSC_BLOCK_EXPLORER_URLS!]
        }
    },
    PROD: {
        BSC: {
            chainId: toHex(Number(process.env.NEXT_PUBLIC_BSC_NET_ID)),
            chainName: process.env.NEXT_PUBLIC_BSC_CHAIN_NAME!,
            nativeCurrency: {
                name: 'Binance USD',
                symbol: 'FBUSD',
                decimals: 18
            },
            rpcUrls: [
                'https://bsc-dataseed1.binance.org',
                'https://bsc-dataseed2.binance.org',
                'https://bsc-dataseed3.binance.org',
                'https://bsc-dataseed4.binance.org',
                'https://bsc-dataseed1.defibit.io',
                'https://bsc-dataseed2.defibit.io',
                'https://bsc-dataseed3.defibit.io',
                'https://bsc-dataseed4.defibit.io',
                'https://bsc-dataseed1.ninicoin.io',
                'https://bsc-dataseed2.ninicoin.io',
                'https://bsc-dataseed3.ninicoin.io',
                'https://bsc-dataseed4.ninicoin.io',
                'wss://bsc-ws-node.nariox.org'
            ],
            blockExplorerUrls: [process.env.NEXT_PUBLIC_BSC_BLOCK_EXPLORER_URLS!]
        }
    },
};

