// Service used to hold shared data and use this data between components
// Each variable has a getter and setter

import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private products: any[] = [];
  private shirts: any[] = [];
  private books: Product[] = [];
  private randomNumber: number = 0;
  private tax: number = 0.1;
  private delivery: number = 20;
  private subTotal: number = 0;
  private firstName: string = '';
  private email: string = '';

  setProducts(value: any[]): void {
    this.products = value;
  }

  getProducts(): any[] {
    return this.products;
  }

  setShirts(value: any[]): void {
    this.shirts = value;
  }

  getShirts(): any[] {
    return this.shirts;
  }

  setBooks(value: Product[]): void {
    this.books = value;
  }

  getBooks(): Product[] {
    return this.books;
  }

  setRandomNumber(value: number): void {
    this.randomNumber = value;
  }

  getRandomNumber(): number {
    return this.randomNumber;
  }

  setTax(value: number): void {
    this.tax = value;
  }

  getTax(): number {
    return this.tax;
  }

  setDelivery(value: number): void {
    this.delivery = value;
  }

  getDelivery(): number {
    return this.delivery;
  }

  setSubTotal(value: number): void {
    this.subTotal = value;
  }

  getSubTotal(): number {
    return this.subTotal;
  }

  setFirstName(value: string): void {
    this.firstName = value;
  }

  getFirstName(): string {
    return this.firstName;
  }

  setEmail(value: string): void {
    this.email = value;
  }

  getEmail(): string {
    return this.email;
  }
}
