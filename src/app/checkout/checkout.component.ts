import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../services/product-service.service';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

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

  checkoutForm: FormGroup = this.fb.group({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    cardNumber: '',
    cardExpiry: '',
    cardCode: ''
  });

  // Method to display error messages
  getErrorMessage(control: any, name: string, format: string) {
    if (control.hasError('required')) {
      return name + ' is required';
    }
    if (control.hasError('email')) {
      return 'Invalid email address';
    }
    if (control.hasError('pattern')) {
      return 'Please enter in the format: ' + format;
    }
    return '';
  }
  
  constructor(private ProductService: ProductService,
              private fb: FormBuilder) {}

  get firstName() { return this.checkoutForm.get('firstName')!; }
  get lastName() { return this.checkoutForm.get('lastName')!; }
  get email() { return this.checkoutForm.get('email')!; }
  get phone() { return this.checkoutForm.get('phone')!; }
  get address() { return this.checkoutForm.get('address')!; }
  get cardNumber() { return this.checkoutForm.get('cardNumber')!; }
  get cardExpiry() { return this.checkoutForm.get('cardExpiry')!; }
  get cardCode() { return this.checkoutForm.get('cardCode')!; }

  ngOnInit(): void {
    this.ProductService.loadCart();
    this.products = this.ProductService.getProduct();
    this.subTotal = this.ProductService.loadSubTotal();

    this.checkoutForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      cardNumber: ['', Validators.required, Validators.pattern('\d{16}')],
      cardExpiry: ['', Validators.required, Validators.pattern('\d{2}/\d{2}')],
      cardCode: ['', Validators.required, Validators.pattern('\d{3}')],
    });
  }

   // Email.js
   async send() {
    let randomNumber = Math.floor(Math.random() * 10000);
    emailjs.init('OaStgUBaejbAxjFos');
    let response = await emailjs.send("service_rffgj3m", "template_5e0n0xe", {
      subject: 'New WYWM Store order: WYWM' + randomNumber,
      orderNumber: 'WYWM' + randomNumber,
      firstName: this.checkoutForm.value.firstName,
      lastName: this.checkoutForm.value.lastName,
      email: this.checkoutForm.value.email,
      phone: this.checkoutForm.value.phone,
      address: this.checkoutForm.value.address,
      cardNumber: this.checkoutForm.value.cardNumber.slice(12,16),
      cardExpiry: this.checkoutForm.value.cardExpiry,
      html: this.products.map((product) => {
        `<h1>Name: ${product.name}</h1>`
      }),
    });
    alert('Message has been sent');
    this.checkoutForm.reset();
  }
}
