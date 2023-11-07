import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent {

  // CONSTRUCTOR
  constructor(private fb: FormBuilder) {}

  // Form group
  contactForm: FormGroup = this.fb.group({
    email: '',
    firstName: '',
    lastName: '',
    message: ''
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
  get email() { return this.contactForm.get('email')!; }
  get firstName() { return this.contactForm.get('firstName')!; }
  get lastName() { return this.contactForm.get('lastName')!; }
  get message() { return this.contactForm.get('message')!; }

  // ON INIT
  ngOnInit(): void {

    // Form validation
    this.contactForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  send() {
    console.log('Not yet implemented')
  }

}
