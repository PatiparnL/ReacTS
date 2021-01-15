// export interface TaskPayType_Request {
//     productkey: string,
//     customerage: number
// }
// example
// {
//     "productkey": "CAN01",
//     "customerage": 32
// }
export interface TaskPayType_Response {
    paytypekey: number,
    paytypecode: string,
    paytypedesc: string
}
// example
// "paytypekey": 3,
// "paytypecode": "CM",
// "paytypedesc": "RO"
// export interface TaskCreditCardType_Request {
//     productkey: string,
//     customerage: number
// }
export interface TaskCreditCardType_Response {
    creditcardtypecode: string,
    isinstallment: boolean,
    creditcardtypename: string,
    merchantdiscount: number,
    vat: number,
    interrestrate: number,
    effectivedate: string,
    expiredate: string
}

// {
//     "creditcardtypecode": "01",
//     "isinstallment": false,
//     "creditcardtypename": "VISA",
//     "merchantdiscount": 0.01500,
//     "vat": 0.07000,
//     "interrestrate": 0.00000,
//     "effectivedate": "2015-04-01T00:00:00",
//     "expiredate": "2020-12-31T00:00:00"
// }