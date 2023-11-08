import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  cartCounter!: number;

  // CONSTRUCTOR
  constructor(private productService: ProductService, 
              private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.cartCounter = this.productService.getCartCounter();
    this.productService.cartCounterUpdated.subscribe(() => {
      this.cartCounter = this.productService.getCartCounter();
      this.cdr.detectChanges(); // Trigger change detection to update the template
    });
  }
}