import React, { useEffect, useState } from 'react';
import { CustomerInfo } from './customerInfo';
import CurrentAddress from './currentAddress';
import DocumentAddress from './documentAddress';
import { GetCurrentAddress, GetDocumentAddress, CustomerInfoRecoil } from '../../../stores/recoil/customer'
import { useRecoilState } from 'recoil';

export const Customer = () => {

    const [getCurrentAddress, setGetCurrentAddress] = useRecoilState(GetCurrentAddress);
    const [getDocumentAddress, setGetDocumentAddress] = useRecoilState(GetDocumentAddress);

    const [customerInfoRecoil, setCustomerInfoRecoil] = useState<CustomerInfoRecoil | null>(null);

    useEffect(() =>{
        setCustomerInfoRecoil(getCurrentAddress)
    },[getCurrentAddress])

    return <>
        <CustomerInfo />
        <CurrentAddress title="ข้อมูลที่อยู่ปัจจุบัน" keyData="CurrentAddress" />
        <DocumentAddress title="ข้อมูลที่อยู่จัดส่งเอกสาร" keyData="DocumentAddress" getCurrentAddress={customerInfoRecoil}/>
    </>
}