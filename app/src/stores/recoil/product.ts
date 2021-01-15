import { atom } from 'recoil';

import { TaskInsurerDetail_Response } from '../../models/telesale'

export const ListQuotaPlan = atom<QuotaPlan[]>({
    key: 'ListQuotaPlan',
    default: [],
});

export const ListProductQuotation = atom<ProductQuotation[]>({
    key: 'ListProductQuotation',
    default: [],
});

export const GetGroupName = atom<string | undefined>({
    key: 'GetGroupName',
    default: '',
});

export const GetOpenCompare = atom<boolean>({
    key: 'GetOpenCompare',
    default: false,
});

export const GetGroupNameToCompare = atom<number>({
    key: 'GetGroupNameToCompare',
    default: 0,
});

export interface ProductQuotation {
    no: number,
    type: string,
    name: string | undefined,
    register: string | undefined,
    ref: string | undefined,
    isplan: boolean,
    plan: TaskInsurerDetail_Response[]
}

export interface QuotaPlan {
    productkey: string,
    amount: number
}