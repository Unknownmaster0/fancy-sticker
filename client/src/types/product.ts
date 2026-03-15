export type ProductType = {
  productId: string;
  name: string;
  price: string;
  imageUrl: string;
  popularity: string;
  description: string;
  currency: string;
  keywords?: string;
  tags?: string[];
  stock?: number;
  category?: string;
  originalPrice?: number;
  discount?: number;
  rating?: string;
  createdAt?: string;
};

export type ContactRequestType = {
  name: string;
  email: string;
  mobileNumber: string;
  message: string;
};
