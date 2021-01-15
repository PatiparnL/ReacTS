import { atom } from 'recoil';

export const ListPayType = atom<iPayType[]>({
    key: 'ListPayType',
    default: [],
});

export const ListCreditCardType = atom<iCreditCardType[]>({
    key: 'ListCreditCardType',
    default: [],
});

export interface iPayType {
    paytypekey: number,
    paytypecode: string,
    paytypedesc: string
}

export interface iCreditCardType {
    creditcardtypecode: string,
    isinstallment: boolean,
    creditcardtypename: string,
    merchantdiscount: number,
    vat: number,
    interrestrate: number,
    effectivedate: string,
    expiredate: string
}