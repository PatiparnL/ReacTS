import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import RootTeleSale from "./roots/teleSale.root"
import thunk from "redux-thunk";
import logger from 'redux-logger';

const Store = createStore(RootTeleSale, composeWithDevTools(applyMiddleware(thunk, logger)));

export type RootStore = ReturnType<typeof RootTeleSale>;
export default Store;