export type ProductType = {
  id: string;
  name: string;
  price: string;
  imageUrl: string;
  keywords?: string;
  description: string;
  currency: string;
  tags?: string[];
  stock?: number;
  category?: string;
  originalPrice?: number;
  discount?: number;
  rating?: string;
  createdAt?: string;
};