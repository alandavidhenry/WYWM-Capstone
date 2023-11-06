import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // URL data location
  url: string = 'assets/shopItems.json';

  // Empty array ready to have products added to it
  products: any[] = [];

  // Initialise subTotal variable
  subTotal: any = 0;

  constructor(private http: HttpClient) { }

  // Get all product data from JSON file
  getAllProducts() {
    return this.http.get(this.url);
  }

  // Get all products saved in the 'products' array
  getProduct() {
    return this.products;
  }

  // Check if product is already in cart by id
  productInCart(product: any) {
    return this.products.findIndex((x: any) => x.id === product.id) > -1;
  }

  // Find product by id
  getProductById(productId: number): any | undefined {
    return this.products.find(product => product.id === product.id);
  }

  // Save 'products' array to local storage
  saveCart() {
    localStorage.setItem('cartItems', JSON.stringify(this.products));
  }

  // Add product to cart and save in local storage
  addToCart(addedProduct: any) {
    this.products.push(addedProduct);
    this.saveCart();
  }

  // Update product quantity and save in local storage
  updateQuantity(product: any) {
    this.saveCart();
  }

  // Remove a product from the cart
  removeProduct(product: any) {
    const index = this.products.findIndex((x: any) => x.id === product.id);
    if (index > -1) {
      this.products.splice(index, 1);
      this.saveCart();
    }
  }

  // Remove all products from the cart
  removeAllProducts() {
    this.products.length = 0;
  }

  // Load cart from local storage (or return an empty array)
  loadCart() {
    this.products = JSON.parse(localStorage.getItem('cartItems') as any) || [];
  }

  // Load subTotal from local storage (or return 0)
  loadSubTotal() {
    this.subTotal = JSON.parse(localStorage.getItem('subTotal') as any);
    return this.subTotal;
  }

}
