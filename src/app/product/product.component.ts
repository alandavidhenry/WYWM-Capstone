import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product-service.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  product: any;

  // CONSTRUCTOR
  constructor(private route: ActivatedRoute, 
              private productService: ProductService) {}

  // ON INIT
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const productId = params['id']; // Get the 'id' route parameter
      this.product = this.productService.getProductById(productId); // Get product by id using 'ProductService'.
    });
  }
}
