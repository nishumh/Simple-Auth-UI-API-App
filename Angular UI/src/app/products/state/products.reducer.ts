import { createReducer, on } from "@ngrx/store";
import { loadProducts, loadProductsFailure, loadProductsSuccess } from "./products.action";

export interface ProductsState { 
  products: string[] | null;
  isLoading: boolean;
  error: string | null;
}

const intialState: ProductsState = {
  products: null,
  isLoading: false,
  error: null
};

export const productsReducer = createReducer(
  intialState,
  on(loadProducts, (state) => ({ ...state, isLoading: true })),
  on(loadProductsSuccess, (state, { products }) => ({ ...state, products, isLoading: false, error: null })),
  on(loadProductsFailure, (state, { error }) => ({ ...state, isLoading: false, error }))
);