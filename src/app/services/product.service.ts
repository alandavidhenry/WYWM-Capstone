// Service to load data from the JSON file 
// and send this data to and from the shopping cart

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, of } from 'rxjs';
import { Product } from '../models/product';
import data from '../../assets/data';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private data = data;

  // Empty array ready to have products added to it
  private products: Product[] = [];

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

  // Get all shirt data from JSON file
  getShirts(): Observable<Product[]> {
    return of(this.data.shirts.map(shirt => ({ ...shirt, quantity: 0 })));
  }

  // Get all book data from JSON file
  getBooks(): Observable<Product[]> {
    return of(this.data.books.map(book => ({ ...book, quantity: 0 })));
  }

  // Get all products saved in the 'products' array
  getProduct() {
    return this.products;
  }

  // Check if product is already in cart by id
  productInCart(product: Product): boolean {
    return this.products.some(x => x.id === product.id);
  }

  // Find shirt by id
  getShirtById(shirtId: number): any | undefined {
    return this.data.shirts.find(shirt => shirt.id === shirtId.toString());
  }

  // Find book by id
  getBookById(bookId: number): any | undefined {
    return this.data.books.find(book => book.id === bookId.toString());
  }

  // Save 'products' array to local storage
  saveCart(): void {
    localStorage.setItem('cartItems', JSON.stringify(this.products));
    this.cartCounter = this.products.length;
  }

  // Load cart from local storage (or return an empty array)
  loadCart(): void {
    this.products = JSON.parse(localStorage.getItem('cartItems') as any) || [];
  }

  // Update cart counter and notify subscribers
  updateCartCounter() {
    this.cartCounter = this.products.length;
    this.cartCounterSubject.next(this.cartCounter);
  }

  // Add product to cart and save in local storage
  addToCart(addedProduct: Product): void {
    this.products.push(addedProduct);
    this.saveCart();
    this.updateCartCounter();
  }

  // Update product quantity and save in local storage
  updateQuantity(product: Product): void {
    this.saveCart();
    this.updateCartCounter();
  }

  // Remove a product from the cart
  removeProduct(product: Product): void {
    const index = this.products.findIndex((x: any) => x.id === product.id);
    if (index > -1) {
      this.products.splice(index, 1);
      this.saveCart();
      this.updateCartCounter();
    }
  }

  // Remove all products from the cart
  removeAllProducts(): void {
    this.products = [];
    this.saveCart();
    this.updateCartCounter();
  }
}
