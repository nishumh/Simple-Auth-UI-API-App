import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsState } from './products.reducer';

export class ProductsSelector {
    static selectProductsState = createFeatureSelector<ProductsState>('products');

    static selectAllProducts = createSelector(
        ProductsSelector.selectProductsState,
        (state: ProductsState) => state.products
    );

    static selectLoading = createSelector(
        ProductsSelector.selectProductsState,
        (state: ProductsState) => state.isLoading
    );

    static selectError = createSelector(
        ProductsSelector.selectProductsState,
        (state: ProductsState) => state.error
    );
}