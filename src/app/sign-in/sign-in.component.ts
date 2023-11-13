import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

  signInForm: FormGroup;

  // CONSTRUCTOR
  constructor(private fb: FormBuilder) {
    this.signInForm = this.createSignInForm();
  }

  // Form validation
  private createSignInForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  // Method to display error messages
  getErrorMessage(control: any, name: string, format: string) {
    if (control.hasError('required')) {
      return `${name} is required`;
    }
    if (control.hasError('email')) {
      return 'Invalid email address';
    }
    if (control.hasError('pattern')) {
      return `Please enter in the format: ${format}`;
    }
    return '';
  }

  // Form group getters
  get email() { return this.signInForm.get('email')!; }
  get password() { return this.signInForm.get('password')!; }

  send(): void {
    console.log('Not yet implemented')
  }
}