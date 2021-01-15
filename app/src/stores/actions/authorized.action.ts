import { Dispatch } from 'redux';
import { authService } from '../../services/authorized';
import { AuthorizedActionTypes, SET_AUTHORIZED } from '../types/authorized';

export const GetAuthorize = (token: string | null) => async (dispath: Dispatch<AuthorizedActionTypes>) => {
    try {
        let result =  await authService.Authorized(token)
        let model: any = {};
        for(let key in result) {
            model[key.replace('a:', '')] = result[key][0];
        }
        let haveAuthorized = result ? true : false;
        dispath({ type: SET_AUTHORIZED, payload: { infomation: model, haveAuthorized: haveAuthorized }});

    } catch(e) {
        throw e;
    }
}