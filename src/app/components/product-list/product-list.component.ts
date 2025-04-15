import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  gender: 'men' | 'women' | null = null;
  
  // Filters
  categories: string[] = [];
  selectedCategories: string[] = [];
  maxPrice: number = 200;
  inStockOnly: boolean = false;
  sortOption: string = 'nameAsc';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const genderParam = params['gender'];
      if (genderParam === 'men' || genderParam === 'women') {
        this.gender = genderParam;
        this.loadProductsByGender(this.gender as 'men' | 'women');
      } else {
        this.loadAllProducts();
      }
    });
  }

  loadAllProducts(): void {
    this.productService.getAllProducts().subscribe(products => {
      this.products = products;
      this.extractCategories();
      this.applyFilters();
    });
  }

  loadProductsByGender(gender: 'men' | 'women'): void {
    this.productService.getProductsByGender(gender).subscribe(products => {
      this.products = products;
      this.extractCategories();
      this.applyFilters();
    });
  }

  extractCategories(): void {
    this.categories = Array.from(new Set(this.products.map(product => product.category)));
  }

  toggleCategory(category: string): void {
    if (this.selectedCategories.includes(category)) {
      this.selectedCategories = this.selectedCategories.filter(c => c !== category);
    } else {
      this.selectedCategories.push(category);
    }
    this.applyFilters();
  }

  applyFilters(): void {
    let filtered = [...this.products];

    // Apply category filter
    if (this.selectedCategories.length > 0) {
      filtered = filtered.filter(product => this.selectedCategories.includes(product.category));
    }

    // Apply price filter
    filtered = filtered.filter(product => product.price <= this.maxPrice);

    // Apply in-stock filter
    if (this.inStockOnly) {
      filtered = filtered.filter(product => product.inStock);
    }

    this.filteredProducts = filtered;
    this.sortProducts();
  }

  sortProducts(): void {
    switch (this.sortOption) {
      case 'nameAsc':
        this.filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'nameDesc':
        this.filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'priceAsc':
        this.filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'priceDesc':
        this.filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'ratingDesc':
        this.filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
    }
  }

  clearFilters(): void {
    this.selectedCategories = [];
    this.maxPrice = 200;
    this.inStockOnly = false;
    this.sortOption = 'nameAsc';
    this.applyFilters();
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }
}
