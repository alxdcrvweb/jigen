import { injectable } from 'inversify'
import { makeObservable, observable } from 'mobx'
import 'reflect-metadata'
import { RootStore } from './RootStore'
import request, { IResponse } from '../service';
import { toast } from 'react-toastify';
import { IAccount, IToken } from '../models/models';
import axios from 'axios';
import { CustomError, isServer } from '../utils/utilities';
import { jigenNftAbi, jigenNftAddress } from '../utils/contracts';
import { AbiItem } from 'web3-utils';
import Web3 from 'web3';
import { BaseProvider } from '@metamask/providers';
import { WebsocketProvider } from 'web3-core';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Web3Modal from 'web3modal';
import { options } from './options';
import { moralisWeb3ApiKey, NETWORKS } from '../utils/config';
import { WalletStore } from './WalletStore';

@injectable()
export class MintStore {
    @observable myTokens: IToken[] = []
    @observable supply: number = 0
    @observable ws:WalletStore
    public constructor(private readonly rootStore: RootStore) {
        this.ws = this.rootStore.walletStore
        makeObservable(this)
    }
    getContract = (type:string) =>{
        const web3 = new Web3(type == "send" ? this.ws.provider as BaseProvider & WebsocketProvider & WalletConnectProvider: NETWORKS['97'])
        const mintNFT = new web3.eth.Contract(
            jigenNftAbi as any,
            jigenNftAddress
        )
        return mintNFT
    }
    getAllNfts = async () => {
        try {
            const res = await axios.get(`https://deep-index.moralis.io/api/v2/` + this.ws.userWallet + `/nft?chain=${this.ws.chainId}`,{
				headers: {
					'X-API-Key': moralisWeb3ApiKey,
				},
			})
            this.myTokens = res?.data?.result?.filter((token:any) => token.token_address == jigenNftAddress.toLowerCase())?.map((el:any)=>{
                return {...el, loading: true}
            })
            this.getNestingPeriod()
        } catch (e) {
            console.log(e);
        }
    }
    toggleMetalock =async (ids:string[]) => {
        try {
            let promises:any = [];
            ids.forEach((id) => {
                promises.push(this.getContract("send").methods.toggleNesting(id).send({from: this.ws.userWallet}));
            });
            console.log('%cMintStore.ts line:57 promises', 'color: #007acc;', promises);
            return Promise.race(promises);
            
        } catch (e) {
            return false
            
        }
    }
    getNestingPeriod = async () => {
        try {
            if(this.myTokens && this.myTokens.length>0) {
                this.myTokens.map(async(token,i)=>{
                    let callContract = await this.getContract("call").methods.nestingPeriod(token.token_id).call()
                    console.log(callContract); 
                    this.myTokens[i].nesting = callContract?.nesting
                    this.myTokens[i].timer = callContract?.current
                    this.myTokens[i].loading = false
                })
                
            }
         
            
        } catch (e) {
            console.log(e);
        }
    }
    metalockNFT = async (tokenID:number) => {
        try {
            await this.getContract("send").methods.toggleNesting(tokenID).send({from: this.ws.userWallet})
        } catch (e) {
            console.log(e)
        }
    }
    mintNFT = async () => {
        
        try {
            await this.getContract("send").methods.mint().send({from: this.ws.userWallet})
        } catch (e) {
            console.log(e)
        }
    }
    getSupply = async () => {
        try {
          this.supply = await this.getContract("call").methods.supply().call()
        } catch (e) {
            console.log(e);
        }
    }
    isMintAllowed = async (address?:string) => {
        console.log('allow');
        try {
          let whitelist = await this.getContract("call").methods.whitelisted(address).call()
          let minted = await this.getContract("call").methods.hasMinted(address).call()
          console.log(whitelist, minted);
          return whitelist && !minted
        } catch (e) {
            console.log(e);
            return false
            
        }
    }
}

