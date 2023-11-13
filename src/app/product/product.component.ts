import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  product: Product | undefined;

  // CONSTRUCTOR
  constructor(private route: ActivatedRoute, 
              private productService: ProductService,
              private notifyService: NotificationService) {}

  // ON INIT
  ngOnInit(): void {

    this.route.params.subscribe(params => {
      const productId = +params['id']; // Get the 'id' route parameter as a number
      const category = this.route.snapshot.url[0].path;

      this.loadProduct(category, productId);
    });
  }

  // Load either shirts or books
  loadProduct(category: string, productId: number): void {
    if (category === 'shirts') {
      this.product = this.productService.getShirtById(productId);
    } else {
      this.product = this.productService.getBookById(productId);
    }
  }

  // Function to add products to the shopping card when the button is clicked
  addToCart(): void {
    if (this.product && !this.productService.productInCart(this.product)) {
      this.product.quantity = 1;  // Set the product quantity to 1.
      this.productService.addToCart(this.product);
      this.notifyService.success(`The ${this.product.name} has been added to your shopping cart`);
    }
  }

}
