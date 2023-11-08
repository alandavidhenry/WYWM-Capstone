import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { NotificationService } from '../services/notification.service';
import { SharedDataService } from '../services/shared-data.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  // VARIABLES
  products: any[] = [];
  tax!: number;
  delivery!: number;
  subTotal: number = 0;

  // CONSTRUCTOR
  constructor(private ProductService: ProductService,
              private notifyService: NotificationService,
              private sharedData: SharedDataService) {}

  // ON INIT
  ngOnInit(): void {
    this.loadCartData();
  }

  loadCartData() {
    // Get product data
    this.products = this.ProductService.getProduct();
    // Set products array in Shared Data service
    this.sharedData.setProducts(this.products);
    // Set variables from Shared Data service
    this.tax = this.sharedData.getTax();
    this.delivery = this.sharedData.getDelivery();
    this.calculateSubTotal();
  }

  // Updates local storage when quantity is changed
  qtyChange(product: any) {
    this.ProductService.updateQuantity(product);
    this.calculateSubTotal();
  }

  // Remove product from cart
  removeFromCart(product: any) {
    this.ProductService.removeProduct(product);
    this.products = this.ProductService.getProduct();
    this.notifyService.success(`The ${product.name} has been removed from your shopping cart`);
    this.calculateSubTotal();
  }

  // Remove all products from the cart
  removeAllProducts() {
    this.ProductService.removeAllProducts();
    this.loadCartData(); // Reload cart data after removing all products
  }

  calculateSubTotal() {
    this.subTotal = this.products.reduce(
      (sum, product) => sum + product.quantity * product.price,
      0
    );
    this.sharedData.setSubTotal(this.subTotal);
  }
}
