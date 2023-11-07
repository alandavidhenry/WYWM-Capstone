import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from '../services/product-service.service';
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

  // CONSTRUCTOR
  constructor(private ProductService: ProductService,
              private notifyService: NotificationService,
              private sharedData: SharedDataService) {}

  // ON INIT
  ngOnInit(): void {
    this.products = this.ProductService.getProduct();

    // Set products array in Shared Data service
    this.sharedData.setProducts(this.products);

    // Set variables from Shared Data service
    this.tax = this.sharedData.getTax();
    this.delivery = this.sharedData.getDelivery();
  }

  // Updates local storage when quantity is changed
  qtyChange(product: any) {
    this.ProductService.updateQuantity(product);
  }

  // Remove product from cart
  removeFromCart(product: any) {
    this.ProductService.removeProduct(product);
    this.products = this.ProductService.getProduct();
    this.notifyService.success('The ' + product.name + ' has been removed from your shopping cart');
  }

  // Remove all products from the cart
  removeAllProducts() {
    this.ProductService.removeAllProducts();
  }

  // Calculate cart total
  get subTotal() {
    return this.products.reduce(
      (sum, product) => ({
        quantity: 1,
        price: sum.price + product.quantity * product.price
      }),
      {quantity: 1, price: 0}
    ).price;
  }

  // Save subTotal to local storage
  // saveSubTotal() {
  //   localStorage.setItem('subTotal', JSON.stringify(this.subTotal));
  // }

  // Save subTotal to Shared Data service
  saveSubTotal() {
    this.sharedData.setSubTotal(this.subTotal);
  }

}
