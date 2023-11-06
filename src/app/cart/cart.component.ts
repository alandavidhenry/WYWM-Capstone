import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from '../services/product-service.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  products: any[] = [];
  tax: number = 0.2
  delivery: number = 3;

  constructor(private ProductService: ProductService,
              private notifyService: NotificationService) {}

  ngOnInit(): void {
    this.products = this.ProductService.getProduct();
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
  saveSubTotal() {
    localStorage.setItem('subTotal', JSON.stringify(this.subTotal));
  }

}
