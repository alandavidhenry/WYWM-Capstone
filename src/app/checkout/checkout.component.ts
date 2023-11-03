import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from '../services/product-service.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  products: any[] = [];
  tax: number = 0.2
  delivery: number = 3;
  subTotal: any = 0;

  form: FormGroup = this.fb.group({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    cardNumber: '',
    cardExpiry: '',
    cardCode: ''
  });
  
  constructor(private ProductService: ProductService,
              private fb: FormBuilder) {}

  ngOnInit(): void {
    this.ProductService.loadCart();
    this.products = this.ProductService.getProduct();
    this.subTotal = this.ProductService.loadSubTotal();
  }
}
