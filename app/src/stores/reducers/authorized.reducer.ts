import { AuthorizedActionTypes, AuthorizedState, CLEAR_AUTHORIZED, SET_AUTHORIZED } from "../types/authorized";

const initialState: AuthorizedState = {
    haveAuthorized: null,
    infomation: null
};

const AuthorizedReducer = (state: AuthorizedState = initialState,
                           action: AuthorizedActionTypes): AuthorizedState => {
    switch(action.type) {
        case SET_AUTHORIZED: 
            return {
                ...state, 
                ...action.payload,
            };
        case CLEAR_AUTHORIZED:
            return {
                ...state,
                ...initialState
            }
        default: return state;
    }
}

export default AuthorizedReducer;