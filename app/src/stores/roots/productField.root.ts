import { combineReducers } from 'redux';
import ProductFieldReducer from '../reducers/productField.reducer';

const RootProductField = combineReducers({
    productField: ProductFieldReducer,
});

export default RootProductField;