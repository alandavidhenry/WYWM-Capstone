import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent {
  
  newUserForm: FormGroup;

  // CONSTRUCTOR
  constructor(private fb: FormBuilder) {
    this.newUserForm = this.createNewUserForm();
  }

  // Form group
  private createNewUserForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      confirmEmail: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required]
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
  get email() { return this.newUserForm.get('email')!; }
  get confirmEmail() { return this.newUserForm.get('confirmEmail')!; }
  get password() { return this.newUserForm.get('password')!; }
  get confirmPassword() { return this.newUserForm.get('confirmPassword')!; }
  get firstName() { return this.newUserForm.get('firstName')!; }
  get lastName() { return this.newUserForm.get('lastName')!; }
  get phone() { return this.newUserForm.get('phone')!; }
  get address() { return this.newUserForm.get('address')!; }

  send(): void {
    console.log('Not yet implemented')
  }
}