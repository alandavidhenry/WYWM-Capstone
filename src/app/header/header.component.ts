import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  isOpen: boolean = false;

  @Output() isOpenChange = new EventEmitter<boolean>();

  toggleOpen() {
    this.isOpen = !this.isOpen;
    this.isOpenChange.emit(this.isOpen);
  }

}
