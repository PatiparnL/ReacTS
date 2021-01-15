import { ProductForm } from "../../components/TeleSale/ProductDetail/type";
import {
  ProductFieldState,
  ProductFieldTypes,
  GET_ALL,
  GET_BY_ID,
  UPDATE_FIELD,
} from "./../types/productField";

const initialState: ProductFieldState = {
  productForms: [],
  // selectedProductForm: null
  selectedProductForm: {
    id: 0,
    productName: "",
    category: "",
    title: "",
    productkey: [],
    fields: [],
    node: {
      title: "",
      fields: []
    }
  },
};

const ProductFieldReducer = (
  state: ProductFieldState = initialState,
  action: ProductFieldTypes
) => {
  switch (action.type) {
    case GET_ALL:
      //If set state as array object use this syntax
      return {
        ...state,
        productForms: action.payload,
      };
    case GET_BY_ID:
      //If set state as object use this syntax or use as type
      // state.selectedProductForm = action.payload;
      // return state;

      return {
        ...state,
        selectedProductForm: action.payload as ProductForm,
      };
    case UPDATE_FIELD: {
      let productForms = replaceProductForm(
        [...state.productForms],
        action.payload
      );

      return {
        ...state,
        productForms: [...productForms],
        selectedProductForm: action.payload as ProductForm,
      };
    }
    default:
      return state;
  }
};

const replaceProductForm = (
  productForms: ProductForm[],
  newData: ProductForm
): ProductForm[] => {
  let indexForm = productForms.findIndex((f) => f.id === newData.id);
  productForms[indexForm] = newData;

  return productForms;
};

export default ProductFieldReducer;
