// Service used to hold shared data and use this data between components
// Each variable has a getter and setter

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  // Products object
  private productList: any = {};

  setProductList(value: any) {
    this.productList = value;
  }

  getProductList(): any {
    return this.productList;
  }

  // Products array
  private products: any[] = [];

  setProducts(value: any[]) {
    this.products = value;
  }

  getProducts(): any[] {
    return this.products;
  }

  // Random number for order number
  private randomNumber: number = 0;

  setRandomNumber(value: number) {
    this.randomNumber = value;
  }

  getRandomNumber(): number {
    return this.randomNumber;
  }

  // Tax amount
  private tax: number = 0.1;

  setTax(value: number) {
    this.tax = value;
  }

  getTax(): number {
    return this.tax;
  }

  // Delivery amount
  private delivery: number = 20;

  setDelivery(value: number) {
    this.delivery = value;
  }

  getDelivery(): number {
    return this.delivery;
  }

  // Subtotal
  private subTotal: number = 0;

  setSubTotal(value: number) {
    this.subTotal = value;
  }

  getSubTotal(): number {
    return this.subTotal;
  }

  // Customer first name
  private firstName: string = '';

  setFirstName(value: string) {
    this.firstName = value;
  }

  getFirstName(): string {
    return this.firstName;
  }

  // Customer email address
  private email: string = '';

  setEmail(value: string) {
    this.email = value;
  }

  getEmail(): string {
    return this.email;
  }

}
