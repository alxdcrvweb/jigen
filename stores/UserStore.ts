import { injectable } from 'inversify'
import { makeObservable, observable } from 'mobx'
import 'reflect-metadata'
import { RootStore } from './RootStore'
import request, { IResponse } from '../service';
import { toast } from 'react-toastify';
import { IAccount } from '../models/models';
import axios from 'axios';
import { CustomError } from '../utils/utilities';

@injectable()
export class UserStore {
    @observable accountData: IAccount | null = null

    public constructor(private readonly rootStore: RootStore) {
        makeObservable(this)
    }

    getUser = async () => {
        try {
            const {data} = await request<IResponse<IAccount>>({url: `user`})
            this.accountData = data
            return true
        } catch (e) {
            if (axios.isAxiosError(e) || e instanceof Error || (e instanceof Object && e?.hasOwnProperty('message'))) {
                //@ts-ignore
                const err = new CustomError(e?.message as string);
                toast.error(err.getErrorMessage())
            }
            console.log('e', e)
            return false

        }
    }
    appealUser = async (twitter: string, additionalInfo: string): Promise<boolean> => {
        try {
            const {data} = await request<IResponse<IAccount>>({url: `user/appeal`, method: 'POST', data: {twitter, additionalInfo}})
            this.accountData = data
            return true
        } catch (e) {
            if (axios.isAxiosError(e) || e instanceof Error || (e instanceof Object && e?.hasOwnProperty('message'))) {
                //@ts-ignore
                const err = new CustomError(e?.message as string);
                toast.error(err.getErrorMessage())
            }
            console.log('e', e)
            return false
        }
    }
}
