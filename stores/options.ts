import WalletConnectProvider from "@walletconnect/web3-provider";
import { INFURA_ID, NETWORKS } from "../utils/config";

export const options = {
    cacheProvider: true,
    providerOptions: {
        walletconnect: {
            package: WalletConnectProvider, // required
            options: {
                infuraId: INFURA_ID,
                rpc: NETWORKS,
            },
        }
    }
}