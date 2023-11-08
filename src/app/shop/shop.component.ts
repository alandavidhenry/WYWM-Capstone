import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { NotificationService } from '../services/notification.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  shirts: Product[] = [];
  books: Product[] = [];

  // CONSTRUCTOR
  constructor(private productService: ProductService,
              private notifyService: NotificationService) {}

  // ON INIT
  ngOnInit(): void {

    // Subscribe to 'getShirts()' from 'ProductService' and add data to the 'shirts' array.
    this.productService.getShirts().subscribe({
      next: (data: Product[]) => {
        console.log(data);
        this.shirts = data;
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log("Request complete");
      }
    });
    
    // Subscribe to 'getBooks()' from 'ProductService' and add data to the 'books' array.
    this.productService.getBooks().subscribe({
      next: (data: Product[]) => {
        console.log(data);
        this.books = data;
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log("Request complete");
      }
    });
  }

  // Function to add products to the shopping card when the button is clicked
  addToCart(product: any) {
    if (!this.productService.productInCart(product)) {  // Check if the product is already in the shopping cart, if not, continue.
      product.quantity = 1;  // Set the product quantity to 1.
      this.productService.addToCart(product); // Run 'addToCart()' in the 'ProductService' and add the product
      this.notifyService.success('The ' + product.name + ' has been added to your shopping cart');
    }
  }

}
