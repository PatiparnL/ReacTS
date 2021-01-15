import { AuthorizedModel } from "../../models/authorized";

export const SET_AUTHORIZED = 'SET_AUTHORIZED';
export const CLEAR_AUTHORIZED = 'CLEAR_AUTHORIZED'; 

export interface AuthorizedState {
    haveAuthorized: boolean | null,
    infomation: AuthorizedModel | null
}

interface SetAuthorizedAction {
  type: typeof SET_AUTHORIZED
  payload: AuthorizedState | null
}

interface ClearAuthorizedAction {
  type: typeof CLEAR_AUTHORIZED
  payload: AuthorizedState | null
}

export type AuthorizedActionTypes = SetAuthorizedAction | ClearAuthorizedAction;