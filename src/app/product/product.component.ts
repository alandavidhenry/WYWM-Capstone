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

  constructor(private route: ActivatedRoute, private productService: ProductService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const productId = params['id']; // Get the 'id' route parameter
      this.product = this.productService.getProductById(productId); // Get product by id using 'ProductService'.
    });
    console.log('product',this.product);
    console.log(this.productService.products);
  }
}
