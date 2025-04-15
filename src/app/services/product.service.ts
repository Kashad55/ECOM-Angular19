import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    // Men's Clothing
    {
      id: 1,
      name: 'Classic Fit Dress Shirt',
      description: 'A versatile dress shirt perfect for formal occasions or office wear.',
      price: 49.99,
      category: 'shirts',
      gender: 'men',
      imageUrl: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=870&auto=format&fit=crop',
      inStock: true,
      rating: 4.5
    },
    {
      id: 2,
      name: 'Slim Fit Jeans',
      description: 'Comfortable slim fit jeans that pair well with any casual outfit.',
      price: 59.99,
      category: 'pants',
      gender: 'men',
      imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=1026&auto=format&fit=crop',
      inStock: true,
      rating: 4.2
    },
    {
      id: 3,
      name: 'Wool Blend Overcoat',
      description: 'A stylish and warm overcoat, perfect for winter months.',
      price: 129.99,
      category: 'outerwear',
      gender: 'men',
      imageUrl: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=774&auto=format&fit=crop',
      inStock: true,
      rating: 4.7
    },
    {
      id: 4,
      name: 'Cotton Polo Shirt',
      description: 'Classic polo shirt made from premium cotton for everyday wear.',
      price: 34.99,
      category: 'shirts',
      gender: 'men',
      imageUrl: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?q=80&w=1170&auto=format&fit=crop',
      inStock: true,
      rating: 4.0
    },
    {
      id: 5,
      name: 'Casual Chino Pants',
      description: 'Versatile chino pants that transition easily from work to weekend.',
      price: 54.99,
      category: 'pants',
      gender: 'men',
      imageUrl: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=1287&auto=format&fit=crop',
      inStock: true,
      rating: 4.3
    },
    
    // Women's Clothing
    {
      id: 6,
      name: 'Floral Print Dress',
      description: 'A beautiful floral print dress perfect for spring and summer.',
      price: 79.99,
      category: 'dresses',
      gender: 'women',
      imageUrl: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=746&auto=format&fit=crop',
      inStock: true,
      rating: 4.6
    },
    {
      id: 7,
      name: 'High-Waisted Skinny Jeans',
      description: 'Stylish high-waisted jeans that flatter your figure.',
      price: 64.99,
      category: 'pants',
      gender: 'women',
      imageUrl: 'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?q=80&w=687&auto=format&fit=crop',
      inStock: true,
      rating: 4.4
    },
    {
      id: 8,
      name: 'Cashmere Blend Sweater',
      description: 'Luxuriously soft sweater that keeps you warm and stylish.',
      price: 89.99,
      category: 'tops',
      gender: 'women',
      imageUrl: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=705&auto=format&fit=crop',
      inStock: true,
      rating: 4.8
    },
    {
      id: 9,
      name: 'Tailored Blazer',
      description: 'A professional blazer that adds polish to any outfit.',
      price: 99.99,
      category: 'outerwear',
      gender: 'women',
      imageUrl: 'https://images.unsplash.com/photo-1555529771-835f59fc5efe?q=80&w=687&auto=format&fit=crop',
      inStock: false,
      rating: 4.5
    },
    {
      id: 10,
      name: 'Midi Skirt',
      description: 'Elegant midi skirt that transitions seamlessly from day to night.',
      price: 49.99,
      category: 'skirts',
      gender: 'women',
      imageUrl: 'https://images.unsplash.com/photo-1577900232427-18219b8349d3?q=80&w=770&auto=format&fit=crop',
      inStock: true,
      rating: 4.2
    }
  ];

  constructor() { }

  getAllProducts(): Observable<Product[]> {
    return of(this.products);
  }

  getProductById(id: number): Observable<Product | undefined> {
    return of(this.products.find(product => product.id === id));
  }

  getProductsByGender(gender: 'men' | 'women'): Observable<Product[]> {
    return of(this.products.filter(product => product.gender === gender));
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    return of(this.products.filter(product => product.category === category));
  }
}
