import { combineReducers } from "redux";
import AuthorizedReducer from "../reducers/authorized.reducer";

const RootTeleSale = combineReducers({
   authorize: AuthorizedReducer,
});

export default RootTeleSale;