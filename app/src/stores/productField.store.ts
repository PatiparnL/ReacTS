import { composeWithDevTools } from 'redux-devtools-extension';
import { applyMiddleware, createStore } from 'redux';
import RootProductField from './roots/productField.root';
import thunk from 'redux-thunk';

const ProductFieldStore = createStore(RootProductField, composeWithDevTools(applyMiddleware(thunk)));

export type RootProductFieldStore = ReturnType<typeof RootProductField>;
export default ProductFieldStore;