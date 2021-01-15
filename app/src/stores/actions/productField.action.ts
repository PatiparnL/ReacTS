import { Dispatch } from 'redux';
import { UPDATE_FIELD, GET_ALL, ProductFieldTypes, GET_BY_ID } from './../types/productField';
import { ProductForm } from '../../components/TeleSale/ProductDetail/type';
import { jsonServerService } from '../../services/jsonServer';

export const GetAll = () => async (dispatch: Dispatch<ProductFieldTypes>) => {
    try {
        let result = await jsonServerService.Get();
        
        dispatch({type: GET_ALL, payload: result});
    } catch (e) {
        throw e;
    }
}

export const GetById = (id: number) => async (dispatch: Dispatch<ProductFieldTypes>) => {
    try {
        let result = await jsonServerService.GetById(id);
        dispatch({type: GET_BY_ID, payload: result});
    } catch (e) {
        throw e;
    }
}

export const UpdateField = (field: ProductForm) => async (dispatch: Dispatch<ProductFieldTypes>) => {
    try {
        await jsonServerService.Put(field.id, field);
        dispatch({type: UPDATE_FIELD, payload: field});
    } catch (e) {
        throw e;
    }
}