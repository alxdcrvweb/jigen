import BN from 'bignumber.js'
import numeral from 'numeral'
import { getAuthToken, getAuthTokenTTL } from '../service';
import { ErrorKeys } from '../models/errors';


export const isAuth = (): boolean => {
    return Boolean(getAuthTokenTTL() && getAuthToken() && !(parseInt(getAuthTokenTTL() || '0') < Date.now()))
}

export function fd(val: number | string | BN) {
    if (!val) return ''
    return numeral(val?.toString()).format('0,0[.][000000000000000000]')
}

BN.config({EXPONENTIAL_AT: 100})


export const isServer = typeof window === 'undefined';

export const addressSlice = (address: string | undefined) => {
    if (!address) return '0000...0000'
    return address.slice(
        0,
        4
    ) + '...' + address.slice(
        address.length - 4,
        address.length
    )
}

export function setCookie(name: string, value: string, exdays: number = 365 * 24 * 60 * 60 * 1000) {
    const d = new Date();
    d.setTime(d.getTime() + exdays);
    const expires = 'expires=' + d.toUTCString();
    document.cookie = name + '=' + value + ';' + expires + ';path=/';
}

export function getCookie(cname: string) {
    const name = cname + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
}

export function deleteCookie(name: string) {
    setCookie(name, '', 1);
}

export function deleteAllCookies() {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf('=');
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + '= ; expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
    }
}

export const toHex = (netId: number) => {
    return '0x' + Number(netId).toString(16);
};


export class CustomError extends Error {
    status = 400;

    constructor(message: string) {
        super(message);

        // 👇️ because we are extending a built-in class
        Object.setPrototypeOf(this, CustomError.prototype);
    }

    getErrorMessage() {
        switch (this.message as ErrorKeys) {
            case 'ALREADY_APPEALED':
                return 'Already applied!'
            case 'TWITTER_ALREADY_APPEALED':
                return 'Twitter already applied!'
            case 'No authorization token was found':
                return 'No authorization token was found'
            case 'Permission denied':
                return 'Permission denied'
            default:
                return 'Something went wrong!'
        }
    }
}