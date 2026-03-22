import { createEffect, ofType } from "@ngrx/effects";
import { switchMap, map, catchError, of } from "rxjs";
import { loadProducts, loadProductsSuccess, loadProductsFailure } from "./products.action";
import { Actions } from "@ngrx/effects";
import { inject } from "@angular/core";
import { ProductsService } from "../productsService";

export class ProductsEffects {
    private actions$: Actions = inject(Actions);
    private productsService: ProductsService = inject(ProductsService);
    
    loadProducts$ = createEffect(() =>
        this.actions$.pipe(
        ofType(loadProducts),
        switchMap(() =>
            this.productsService.getProducts().pipe(
            map((products) => loadProductsSuccess({ products })),
            catchError(() => { 
                alert('Loading Products failed'); 
                return of(loadProductsFailure({ error: 'Loading Products failed' })); 
            })
            )
        )
        )
    );
}