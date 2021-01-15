import { ProductForm } from '../../components/TeleSale/ProductDetail/type';

export const GET_ALL = 'GET_ALL';
export const GET_BY_ID = 'GETs_BY_ID';
export const UPDATE_FIELD = 'UPDATE_FIELD';

export interface ProductFieldState {
    productForms: ProductForm[],
    selectedProductForm: ProductForm,
}

interface GetAll {
    type: typeof GET_ALL,
    payload: ProductForm[]
}

interface GetById {
    type: typeof GET_BY_ID,
    payload: ProductForm 
}

interface UpdateField {
    type: typeof UPDATE_FIELD,
    payload: ProductForm
}


export type ProductFieldTypes = GetAll | GetById | UpdateField;