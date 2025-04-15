export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  gender: 'men' | 'women';
  imageUrl: string;
  inStock: boolean;
  rating: number;
} 