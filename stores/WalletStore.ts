import { BaseProvider } from '@metamask/providers';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { ethers } from 'ethers';
import { injectable } from 'inversify';
import { action, makeObservable, observable } from 'mobx';
import { toast } from 'react-toastify';
import 'reflect-metadata';
import Web3 from 'web3';
import type { WebsocketProvider } from 'web3-core';
import type { Contract } from 'web3-eth-contract';
import Web3Modal from 'web3modal';
import request, { clearAuthToken, clearAuthTokenTTL, getAuthToken, getAuthTokenTTL, setAuthToken, setAuthTokenTTL } from '../service';
import { INFURA_ID, NETWORKS, networks, NetworksEnumKeys, StatusKeys } from '../utils/config';
import { erc20BscAbi, erc20BscAddress, erc20EthAbi, erc20EthAddress, jigenNftAbi, jigenNftAddress, mintAbi, mintAddress } from '../utils/contracts';
import { isAuth, isServer, toHex } from '../utils/utilities';
import { RootStore } from './RootStore';
import jwtDecode from 'jwt-decode';
import type { AbiItem } from "web3-utils";
import { options } from './options';
import { isMobile } from "react-device-detect";
@injectable()
export class WalletStore {
    @observable erc20Eth: any = null;
    @observable erc20Bsc: any = null;
    @observable mint: any = null;

    @observable userWallet: string | undefined = undefined
    @observable web3: Web3 | null = null;
    @observable EthWeb3: Web3 | null = null;
    @observable BscWeb3: Web3 | null = null;
    @observable web3Provider: any | null = null;
    @observable provider: any | null = null;
    @observable requireInstall: boolean = false;
    @observable web3Modal: Web3Modal | null = null;
    @observable connected: boolean = false;
    @observable walletConnected: boolean = false;
    @observable disabled: boolean = false;
    @observable chainId: string | null = null;
    @observable address: string = '';
    @observable switchedWallet: string = '';
    @observable userBalance: string | undefined = undefined;

    public constructor(private readonly rootStore: RootStore) {
        makeObservable(this)
        if (!isServer) {
            this.web3Modal = new Web3Modal(options);
           
        }
    }

    @action
    connectWallet = async (from?:string) => {
        try {
            console.log('connectWallet from:', from)
            this.disabled = true
            if (!isAuth()) localStorage.removeItem('walletconnect')
            this.provider = await this.web3Modal?.connect();
            this.web3Provider = new ethers.providers.Web3Provider(this.provider)
            const signer = await this.web3Provider.getSigner()
            this.switchedWallet = this.userWallet = await signer.getAddress()
            const network = await this.web3Provider.getNetwork();
            this.chainId = toHex(network.chainId)

            this.provider.on('accountsChanged', this.onAccountChanged)
            this.provider.on('disconnect', this.resetWallet)
            this.provider.on('chainChanged', (chainId: number) => {
                this.chainId = toHex(chainId)
            })

            this.web3 = new Web3(this.provider as BaseProvider & WebsocketProvider);
            this.EthWeb3 = new Web3(NETWORKS['1']);
            this.BscWeb3 = new Web3(NETWORKS['56']);
            
            this.erc20Eth = new this.EthWeb3.eth.Contract(erc20EthAbi as any, erc20EthAddress);
            this.erc20Bsc = new this.BscWeb3.eth.Contract(erc20BscAbi as any, erc20BscAddress);
           
            // this.erc20Eth = new this.web3.eth.Contract(erc20EthAbi, erc20EthAddress);
            // this.erc20Bsc = new this.web3.eth.Contract(erc20BscAbi, erc20BscAddress);
            this.mint = new this.web3.eth.Contract(mintAbi as any, mintAddress);
            return this.walletConnected = true
        } catch (e) {
            console.log('connect wallet error', e)
            return false
        } finally {
            this.disabled = false
        }
    }

    onAccountChanged = async (newAccounts: Array<string>) => {
        if (newAccounts[0].toLowerCase() === this.userWallet?.toLowerCase()) return
        console.log('onAccountChanged !if')
        this.switchedWallet = newAccounts[0]
        if (await this.sign()) this.userWallet = newAccounts[0]
    }

    @action resetWallet = async () => {
        console.log('resetWallet')
        await this.web3Modal?.clearCachedProvider();
        clearAuthToken()
        clearAuthTokenTTL()
        localStorage.removeItem('walletconnect')
        if (this.provider?.disconnect && typeof this.provider?.disconnect === 'function') await this.provider?.disconnect()
        if (this.provider?.wc?.killSession && typeof this.provider?.wc?.killSession === 'function') await this.provider?.wc.killSession()
        if (this.provider?.removeAllListeners && typeof this.provider?.removeAllListeners === 'function') await this.provider?.removeAllListeners()

        this.erc20Eth = null
        this.erc20Bsc = null
        this.mint = null

        this.userWallet = undefined
        this.web3 = null
        this.web3Provider = null
        this.provider = null
        this.connected = false
        this.walletConnected = false
        this.disabled = false
        this.switchedWallet = ''

    }

    switchNetwork = async (chainId: number) => {
        let rpc = "https://data-seed-prebsc-1-s3.binance.org:8545"
        const getNetworkId = async () => {
          if (!this.web3Modal && window?.ethereum) {
            this.web3Modal = new Web3Modal(options);
          }
          const web3 = new Web3(
            window?.ethereum ? window?.ethereum : rpc
          );
    
          const currentChainId = await web3?.eth?.net?.getId();
          return currentChainId;
        };
        try {
          const currentChainId = !isMobile ? await getNetworkId() : "";
          if (currentChainId !== chainId && !isMobile) {
            try {
              await window.ethereum.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: Web3.utils.toHex(chainId) }],
              });
            } catch (switchError:any) {
              if (switchError?.code === 4902) {
                try {
                  await window.ethereum.request({
                    method: "wallet_addEthereumChain",
                    params: [
                      {
                        chainId: Web3.utils.toHex(chainId),
                        chainName: "BSC-TESTNET",
                        nativeCurrency: {
                          name: "BSC-TESTNET",
                          symbol: "tBNB",
                          decimals: 18,
                        },
                        rpcUrls: [rpc],
                      },
                    ],
                  });
                } catch (e) {
                  console.log("%cWalletStore.ts line:212 e", "color: #007acc;", e);
                }
              }
              console.log(
                "%cWalletStore.ts line:163 switchError",
                "color: #007acc;",
                switchError
              );
              if (!window?.ethereum) {
                toast.error(
                  `Please, switch your network to bsc testnet ${switchError?.code}`,
                  { theme: "dark" }
                );
              }
            }
          } else {
            return;
          }
        } catch (e) {
          console.log(e);
        }
      };

    login = async (): Promise<boolean> => {
        this.disabled = true
        let sign = true

        if (!isAuth()) sign = await this.sign()

        this.connected = sign
        this.disabled = false
        return sign
    }

    tryReconnect = async (from?:string) => {
        if (!this.web3Modal?.cachedProvider) return
        await this.connectWallet(`tryReconnect from: ${from}`)
        isAuth() && await this.login()
    }


    loginJWT = async (): Promise<boolean> => {
        const myWallet = this.switchedWallet || window.ethereum.address || window.ethereum.selectedAddress;
        if (!this.web3 || !myWallet) return false
        try {
            const token = await request<string>({url: `eauth/${myWallet}`})
            const signature = await this.web3.eth.personal.sign(
                this.web3.utils.utf8ToHex(
                    `For login to the site, I sign this random data: ${token}`
                ),
                myWallet,
                token
            )
            const {data} = await request<{ data: { address: string, jwt: string } }>({
                url: `eauth/${token.trim()}/${signature.trim()}`
            })

            setAuthToken(data.jwt)
            const decodedData = jwtDecode<{ exp: number }>(data.jwt)
            setAuthTokenTTL((decodedData.exp * 1000).toString())
            return Boolean(data.jwt)
        } catch (e) {
            console.log('e', e)
            return false
        }
    }

    sign = async (): Promise<boolean> => {
        if (!this.web3) return false
        const res = await this.loginJWT()
        // if (res) await this.rootStore.userStore.getUser()
        return res
    }

    isCurrChainId = (chainId: string = toHex(Number(process.env.NEXT_PUBLIC_BSC_NET_ID))): boolean => (this.chainId?.toLowerCase() === chainId.toLowerCase())

    increaseApproveHandler = async (value: number): Promise<boolean> => {
        console.log('increaseApproveHandler')
        if (!this.isCurrChainId()) return !toast.error(`Please switch to ${process.env.NEXT_PUBLIC_BSC_CHAIN_NAME} and try again`)
        try {
            this.disabled = true
            const balance = await this.erc20Eth?.methods.balanceOf(this.userWallet).call();
            const WeiValue = this.web3?.utils.toWei(value.toString())
            if (Number(balance) < Number(WeiValue)) return !toast.error(`You have no ${value} ${process.env.NEXT_PUBLIC_BSC_CHAIN_SYMBOL} tokens`)
            const allowance: string = await this.erc20Eth?.methods.allowance(this.userWallet, mintAddress).call({from: this.userWallet});
            if (Number(WeiValue) <= Number(allowance)) return true
            await this.erc20Eth?.methods.increaseAllowance(mintAddress, (Number(WeiValue) - Number(allowance)).toString()).send({from: this.userWallet})
            toast.success('Approved!')
            return true
        } catch (e) {
            console.log('e', e);
            return false
        } finally {
            this.disabled = false
        }
    }

    checkBalance = async (value: number): Promise<boolean> => {
        if (!this.isCurrChainId()) return false
        try {
            this.disabled = true
            const WeiValue = this.web3?.utils.toWei(value.toString())
            const balance = await this.erc20Eth?.methods.balanceOf(this.userWallet).call();
            if (Number(balance) < Number(WeiValue)) return false
            console.log('WeiValue', WeiValue)
            const allowance: string = await this.erc20Eth?.methods.allowance(this.userWallet, mintAddress).call({from: this.userWallet});
            console.log('allowance', allowance)
            return Number(WeiValue) <= Number(allowance);
        } catch (e) {
            console.log('e', e);
            return false
        } finally {
            this.disabled = false
        }
    }

    getBalance = async (): Promise<number | undefined> => {
        try {
            this.disabled = true
            const balanceEth = await this.erc20Eth?.methods.balanceOf(this.userWallet).call();
            console.log('balanceEth', balanceEth)
            const balanceBsc = await this.erc20Bsc?.methods.balanceOf(this.userWallet).call()
            console.log('balanceBsc',typeof balanceBsc, balanceBsc)
            this.userBalance = (Number(this.web3?.utils.fromWei(balanceBsc)) + Number(this.web3?.utils.fromWei(balanceEth))).toFixed(0).toString()
        } catch (e) {
            console.log('e', e);
            return
        } finally {
            this.disabled = false
        }
    }
}

