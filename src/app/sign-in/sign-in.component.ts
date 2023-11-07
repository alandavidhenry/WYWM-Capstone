import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

  // CONSTRUCTOR
  constructor(private fb: FormBuilder) {}

  // Form group
  signInForm: FormGroup = this.fb.group({
    email: '',
    password: '',
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
  get email() { return this.signInForm.get('email')!; }
  get password() { return this.signInForm.get('password')!; }

  // ON INIT
  ngOnInit(): void {

    // Form validation
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  send() {
    console.log('Not yet implemented')
  }

}
