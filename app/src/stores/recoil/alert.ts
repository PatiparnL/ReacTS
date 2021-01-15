import {
    atom
} from 'recoil';

export const GetAlert = atom<RecoilAlert | null>({
    key: 'GetAlert', 
    default: null,
});

export interface RecoilAlert {
    open: boolean,
    message: string
}