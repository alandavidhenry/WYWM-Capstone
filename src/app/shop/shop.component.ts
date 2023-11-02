import { Component } from '@angular/core';
import { ProductService } from '../services/product-service.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent {

  productList: any = {}; // Object

  constructor(private productService: ProductService) {}

  // Subscribe to 'getAllProducts()' from 'ProductService' and add response to the 'productList' object.
  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (res: any) => {
        console.log(res);
        this.productList = res;
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log("Request complete");
      }
    });
  }

  addToCart(product: any) {
    if (!this.productService.productInCart(product)) {  // Check if the product is already in the shopping cart, if not, continue.
      product.quantity = 1;  // Set the product quantity to 1.
      this.productService.addToCart(product); // Run 'addToCart()' in the 'ProductService' and add the product
    }
  }

}
