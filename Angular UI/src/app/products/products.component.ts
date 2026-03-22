import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadProducts } from './state/products.action';
import { ProductsSelector } from './state/products.selector';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-products',
  imports: [AsyncPipe],
  providers: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
    constructor(private readonly store: Store) {}
    products$?: Observable<string[] | null>;
    isLoading$?: Observable<boolean>;
    error$?: Observable<string | null>;

  ngOnInit() {
    // Dispatch the loadProducts action to fetch products when the component initializes
    this.store.dispatch(loadProducts());

    // Select the products from the store and assign it to products$
    this.products$ = this.store.select(ProductsSelector.selectAllProducts);
    this.isLoading$ = this.store.select(ProductsSelector.selectLoading);
    this.error$ = this.store.select(ProductsSelector.selectError);
  }
}

