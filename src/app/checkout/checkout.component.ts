import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../services/product-service.service';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { NotificationService } from '../services/notification.service';

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

  // Form group
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
  
  // Constructor
  constructor(private ProductService: ProductService,
              private fb: FormBuilder,
              private notifyService: NotificationService) {}

  // Form group getters
  get firstName() { return this.checkoutForm.get('firstName')!; }
  get lastName() { return this.checkoutForm.get('lastName')!; }
  get email() { return this.checkoutForm.get('email')!; }
  get phone() { return this.checkoutForm.get('phone')!; }
  get address() { return this.checkoutForm.get('address')!; }
  get cardNumber() { return this.checkoutForm.get('cardNumber')!; }
  get cardExpiry() { return this.checkoutForm.get('cardExpiry')!; }
  get cardCode() { return this.checkoutForm.get('cardCode')!; }

  // NG On Init
  ngOnInit(): void {
    this.ProductService.loadCart();
    this.products = this.ProductService.getProduct();
    this.subTotal = this.ProductService.loadSubTotal();

    // Form validation
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
    // Generate random order number
    let randomNumber = Math.floor(Math.random() * 10000);

    // Retrieve data from local storage
    const subTotal: number = JSON.parse(localStorage.getItem('subTotal') || '0');

    const tax: number = 0.2;
    const delivery: number = 3;


    // Initialise emailjs
    emailjs.init('OaStgUBaejbAxjFos');

    let response = await emailjs.send("service_rffgj3m", "template_5e0n0xe", {
      subject: `New WYWM Store order: WYWM${randomNumber}`,
      orderNumber: `WYWM ${randomNumber}`,
      firstName: this.checkoutForm.value.firstName,
      lastName: this.checkoutForm.value.lastName,
      email: this.checkoutForm.value.email,
      phone: this.checkoutForm.value.phone,
      address: this.checkoutForm.value.address,
      cardNumber: this.checkoutForm.value.cardNumber.slice(12,16),
      cardExpiry: this.checkoutForm.value.cardExpiry,
      orderHeader: 
        `<table style="table-layout: fixed; width: 100%; border: 1px solid black;">
          <td><b>Name</b></td>
          <td><b>Price</b></td>
          <td><b>Quantity</b></td>
          <td><b>Subtotal</b></td>
        </table>`,
      orderDetails: this.products.map((product) => {
        return `<table style="table-layout: fixed; width: 100%; border: 1px solid black;">
                  <tr>
                    <td><b>${product.name}</b></td>
                    <td>£${product.price}</td>
                    <td>${product.quantity}</td>
                    <td>£${product.quantity * product.price}</td>
                  </tr>
                </table>`;
      }).join(''),
      orderTotals: 
        `<p>Sub total: £${subTotal}</p>
        <p>Tax: ${tax * 100}%</p>
        <p>Delivery: £${delivery}</p>
        <p><b>Total: £${subTotal * (tax + 1) + delivery}</b></p>`,
    });
    this.notifyService.success('Your order has been sent');
    this.checkoutForm.reset();
  }
}