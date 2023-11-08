// Service to load data from the JSON file 
// and send this data to and from the shopping cart

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Product } from '../models/product';
import data from '../../assets/data';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private data = data;

  // URL data location
  url: string = 'assets/shopItems.json';

  // Empty array ready to have products added to it
  products: any[] = [];

  // Number of items in shopping cart
  cartCounter: number = 0;

  getCartCounter() {
    return this.cartCounter;
  }

  // Create a BehaviorSubject to track cart counter changes
  private cartCounterSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  // Expose an observable to subscribe to cart counter changes
  cartCounterUpdated = this.cartCounterSubject.asObservable();

  // CONSTRUCTOR
  constructor(private http: HttpClient) {}

  // Get all product data from JSON file
  getAllProducts() {
    return this.http.get(this.url);
  }

  // Get all shirt data from JSON file
  getShirts(): Observable<Product[]> {
    return of(this.data.products)
  }

  // Get all book data from JSON file
  getBooks(): Observable<Product[]> {
    return of(this.data.books)
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
  getProductById(shirtId: number): any | undefined {
    const shirt = this.products.find(shirt => shirt.id === shirtId);
    console.log('Found product:', shirt); // Check if the product is found
    return shirt;
  }

  // Save 'products' array to local storage
  saveCart() {
    localStorage.setItem('cartItems', JSON.stringify(this.products));
    this.cartCounter = this.products.length;
  }

  // Load cart from local storage (or return an empty array)
  loadCart() {
    this.products = JSON.parse(localStorage.getItem('cartItems') as any) || [];
  }

  // Update cart counter and notify subscribers
  updateCartCounter() {
    this.cartCounter = this.products.length;
    this.cartCounterSubject.next(this.cartCounter);
  }

  // Add product to cart and save in local storage
  addToCart(addedProduct: any) {
    this.products.push(addedProduct);
    this.saveCart();
    this.updateCartCounter();
  }

  // Update product quantity and save in local storage
  updateQuantity(product: any) {
    this.saveCart();
    this.updateCartCounter();
  }

  // Remove a product from the cart
  removeProduct(product: any) {
    const index = this.products.findIndex((x: any) => x.id === product.id);
    if (index > -1) {
      this.products.splice(index, 1);
      this.saveCart();
      this.updateCartCounter();
    }
  }

  // Remove all products from the cart
  removeAllProducts() {
    this.products.length = 0;
    this.updateCartCounter();
  }
}
