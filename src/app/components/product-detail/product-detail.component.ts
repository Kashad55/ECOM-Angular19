import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink]
})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined;
  relatedProducts: Product[] = [];
  quantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.loadProduct(id);
    });
  }

  loadProduct(id: number): void {
    this.productService.getProductById(id).subscribe(product => {
      this.product = product;
      if (product) {
        this.loadRelatedProducts(product);
      }
    });
  }

  loadRelatedProducts(product: Product): void {
    this.productService.getProductsByGender(product.gender).subscribe(products => {
      // Get products from the same category excluding current product
      let related = products.filter(p => 
        p.category === product.category && 
        p.id !== product.id
      );
      
      // If not enough products from the same category, add more from the same gender
      if (related.length < 4) {
        const moreProducts = products.filter(p => 
          p.category !== product.category && 
          p.id !== product.id
        );
        related = [...related, ...moreProducts].slice(0, 4);
      } else {
        related = related.slice(0, 4);
      }
      
      this.relatedProducts = related;
    });
  }

  incrementQuantity(): void {
    this.quantity++;
  }

  decrementQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart(): void {
    if (this.product && this.product.inStock) {
      this.cartService.addToCart(this.product, this.quantity);
    }
  }
}
