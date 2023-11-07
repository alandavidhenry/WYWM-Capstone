import { Component } from '@angular/core';
import { SharedDataService } from '../services/shared-data.service';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.scss']
})
export class OrderConfirmationComponent {

  randomNumber: number;
  firstName: string;
  email: string;

  // CONSTRUCTOR
  constructor(private sharedData: SharedDataService) {
    this.randomNumber = this.sharedData.getRandomNumber();
    this.firstName = this.sharedData.getFirstName();
    this.email = this.sharedData.getEmail();
  }

}
