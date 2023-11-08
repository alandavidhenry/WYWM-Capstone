import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { NotificationService } from '../services/notification.service';
import { SharedDataService } from '../services/shared-data.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  products!: any[];
  tax!: number;
  delivery!: number;
  subTotal!: number;

  // CONSTRUCTOR
  constructor(private router: Router,
    private ProductService: ProductService,
    private fb: FormBuilder,
    private notifyService: NotificationService,
    private sharedData: SharedDataService ) {}

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

  // Form group getters
  get firstName() { return this.checkoutForm.get('firstName')!; }
  get lastName() { return this.checkoutForm.get('lastName')!; }
  get email() { return this.checkoutForm.get('email')!; }
  get phone() { return this.checkoutForm.get('phone')!; }
  get address() { return this.checkoutForm.get('address')!; }
  get cardNumber() { return this.checkoutForm.get('cardNumber')!; }
  get cardExpiry() { return this.checkoutForm.get('cardExpiry')!; }
  get cardCode() { return this.checkoutForm.get('cardCode')!; }

  // ON INIT
  ngOnInit(): void {
    this.ProductService.loadCart();
    this.products = this.sharedData.getProducts();
    this.subTotal = this.sharedData.getSubTotal();

    // Set variables from Shared Data service
    this.products = this.sharedData.getProducts();
    this.tax = this.sharedData.getTax();
    this.delivery = this.sharedData.getDelivery();

    // Form validation
    this.checkoutForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
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
    // Set random order number in Shared Data service
    this.sharedData.setRandomNumber(randomNumber);

    // Set first name in Shared Data service
    this.sharedData.setFirstName(this.checkoutForm.value.firstName);

    // Set email in Shared Data service
    this.sharedData.setEmail(this.checkoutForm.value.email);

    // Retrieve data from local storage
    const subTotal: number = JSON.parse(localStorage.getItem('subTotal') || '0');

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
        <p>Tax: ${this.tax * 100}%</p>
        <p>Delivery: £${this.delivery}</p>
        <p><b>Total: £${Math.floor(subTotal * (this.tax + 1) + this.delivery)}</b></p>`,
    });
    this.notifyService.success('Your order has been sent');
    this.checkoutForm.reset();
    this.ProductService.removeAllProducts();
    this.router.navigate(['/order-confirmation']);
  }
}