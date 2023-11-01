import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'wywm-capstone';

  isOpen: boolean = false;

  onIsOpenChange(isOpen: boolean) {
    this.isOpen = isOpen;
  }
}
