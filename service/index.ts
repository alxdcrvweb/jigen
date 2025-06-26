import axios, { AxiosError, AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import { baseURL } from '../utils/config';
import { deleteCookie, getCookie, isServer, setCookie } from '../utils/utilities';

export const AUTH_TOKEN_NAME = 'jwt'
export const AUTH_TOKEN_TTL_NAME = 'jwtTTL'

// Cookie
// Jwt Auth Token
export const setCookieAuthToken = (token: string) => !isServer && setCookie(AUTH_TOKEN_NAME, token)
export const getCookieAuthToken = () => !isServer && getCookie(AUTH_TOKEN_NAME)
export const clearCookieAuthToken = () => !isServer && deleteCookie(AUTH_TOKEN_NAME)
// Jwt Auth Token TTL
export const setCookieAuthTokenTTL = (token: string) => !isServer && setCookie(AUTH_TOKEN_TTL_NAME, token)
export const getCookieAuthTokenTTL = () => !isServer && getCookie(AUTH_TOKEN_TTL_NAME)
export const clearCookieAuthTokenTTL = () => !isServer && deleteCookie(AUTH_TOKEN_TTL_NAME)

// Local Storage
// Jwt Auth Token
export const setLSAuthToken = (token: string) => !isServer && localStorage.setItem(AUTH_TOKEN_NAME, token)
export const getLSAuthToken = () => localStorage.getItem(AUTH_TOKEN_NAME)
export const clearLSAuthToken = () => !isServer && localStorage.removeItem(AUTH_TOKEN_NAME)
// Jwt Auth Token TTL
export const setLSAuthTokenTTL = (token: string) => !isServer && localStorage.setItem(AUTH_TOKEN_TTL_NAME, token)
export const getLSAuthTokenTTL = () => !isServer && localStorage.getItem(AUTH_TOKEN_TTL_NAME)
export const clearLSAuthTokenTTL = () => !isServer && localStorage.removeItem(AUTH_TOKEN_TTL_NAME)
// All
export const getAuthToken = () => !isServer && getLSAuthToken() || getCookieAuthToken()
export const setAuthToken = (token: string) => !isServer && setLSAuthToken(token) || setCookieAuthToken(token)
export const clearAuthToken = () => !isServer && clearLSAuthToken() || clearCookieAuthToken()
export const getAuthTokenTTL = () => !isServer && getLSAuthTokenTTL() || getCookieAuthTokenTTL()
export const setAuthTokenTTL = (token: string) => !isServer && setLSAuthTokenTTL(token) || setCookieAuthTokenTTL(token)
export const clearAuthTokenTTL = () => !isServer && clearLSAuthTokenTTL() || clearCookieAuthTokenTTL()

export const setLocalStorage = (key: string, value: string) => localStorage.setItem(key, value)

export const buildHeaders = (): AxiosRequestHeaders => ({
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    Pragma: 'no-cache',
    authorization: !isServer && getAuthToken() ? `Bearer ${getAuthToken()}` : ''
});

export const instance = axios.create({
    baseURL: baseURL
});

export interface IResponse<T> {
    data: T;
    meta: {
        success: boolean;
        message?: string;
    }
}

// export type RequestType = Record<'status' | 'message', { status: number, message: string }>;
export interface RequestType {
    status: number,
    message: string
}

const request = <T>({url = '', method = 'GET', params = {}, headers = buildHeaders(), data = {}}: AxiosRequestConfig): Promise<T> => {
    const reqUrl = `api1/v1/${url}`
    return new Promise((resolve, reject) => {
        instance(reqUrl, {
            method,
            data,
            params,
            headers,
        })
            .then(({data}) => resolve(data))
            .catch((err: AxiosError | Error) => {
                if (axios.isAxiosError(err)) {
                    if (err.response?.status === 401) {
                        console.error({axiosError: err})
                    }

                    return reject({
                        status: err?.response?.status || null,
                        message: err?.response?.data?.err || err.response?.data?.meta?.message || err?.message || null,
                    })
                }

                return reject(err)
            });
    });
}

export default request
