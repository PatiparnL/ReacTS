import { atom } from 'recoil';
import { Province, District, SubDistrict, ZipCode } from '../../models/address'


export const GetCurrentAddress = atom<CustomerInfoRecoil | null>({
    key: 'GetCurrentAddress',
    default: null,
});

export const GetDocumentAddress = atom<CustomerInfoRecoil | null>({
    key: 'GetDocumentAddress',
    default: null,
});

export interface CustomerInfoRecoil {
    address: string,
    districtSelected: District,
    provinceSelected: Province,
    subDistrictSelected: SubDistrict,
    zipCodeSelected: ZipCode
}