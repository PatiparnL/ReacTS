//Ref: https://medium.com/@enetoOlveda/how-to-use-axios-typescript-like-a-pro-7c882f71e34a

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import moment from 'moment';
import { HmacSHA256, enc  } from 'crypto-js'; 
import { HttpHeader } from '../models/http';
import { CONTENT_TYPE, DATE_FORMAT_YYYYMMDD } from "./constant";

export class HttpClient {
    private _api: AxiosInstance;
    private _httpHeader: HttpHeader;

    public constructor (header: HttpHeader) {
        this._httpHeader = header;
        this._api = axios.create();
        this._api.interceptors.request.use((config: AxiosRequestConfig) => {
            header.forward = localStorage.getItem('IP');
            let dateNow = moment().format(DATE_FORMAT_YYYYMMDD);
            let message = `${header.forward}${header.refer}${header.branch}${dateNow}`
            let signature = enc.Base64.stringify(HmacSHA256(message, ''))

            config.headers = {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
                'Cache-Control': 'no-cache',
                'sender': 'header.sender',
                'refer': 'header.refer',
                'branch': 'header.branch',
                'forward': 'header.forward',
                'signature': '',
                'content-Type': CONTENT_TYPE 
            };

            // config.headers = {
            //     'Access-Control-Allow-Origin': '*',
            //     'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
            //     'Cache-Control': 'no-cache',
            //     'sender': header.sender,
            //     'refer': header.refer,
            //     'branch': header.branch,
            //     'forward': header.forward,
            //     'signature': signature,
            //     'content-Type': CONTENT_TYPE 
            // };
            return config;
        });
        
        this._api.interceptors.response.use(
            (response: AxiosResponse) => {
                return response;            
            },
            (error: any) => {
               return {
                    message : error.response?.statusText,
                    status : error.response?.status,
               } 
            });
    }

    public getHttpHeader() {
        return this._httpHeader;
    }

    public get<T, R = AxiosResponse<T>> (url: string, config?: AxiosRequestConfig): Promise<R> {
        return this._api.get(url, config);
    }

    public post<T, B, R = AxiosResponse<T>> (url: string, data?: B, config?: AxiosRequestConfig): Promise<R> {
        return this._api.post(url, data, config);
    }

    public put<T, B, R = AxiosResponse<T>> (url: string, data?: B, config?: AxiosRequestConfig): Promise<R> {
        return this._api.put(url, data, config);
    }

    public delete<T, R = AxiosResponse<T>> (url: string, config?: AxiosRequestConfig): Promise<R> {
        return this._api.delete(url, config);
    }

    public success<T> (response: AxiosResponse<T>): T {
        return response.data;
    }
}