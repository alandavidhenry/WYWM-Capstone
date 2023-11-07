import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { SharedDataService } from '../services/shared-data.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  product!: any[];
  productList: any;

  // CONSTRUCTOR
  constructor(private route: ActivatedRoute, 
              private productService: ProductService,
              private sharedData: SharedDataService) {}

  // ON INIT
  ngOnInit(): void {

    this.productList = this.sharedData.getProductList();

    this.route.params.subscribe(params => {
      const productId = params['id']; // Get the 'id' route parameter
      this.product = this.productService.getProductById(productId); // Get product by id using 'ProductService'.
      console.log('Product:', this.product); // Check if the product is loaded correctly

      if (this.product) {
        console.log('Product:', this.product);
      } else {
        // Handle the case where the product is not found, for example, by redirecting to a 404 page.
      }
    });

    console.log('Product List:', this.productList);
  }

}
