export type OrderStatus = "CREATED" | "CONFIRMED" | "CANCELLED";

export interface Orders {
  orderId: string;
  totalPrice: number;
  paymentStatus: string;
  orderStatus: OrderStatus;
  createdAt: string;
  updatedAt: string | null;
  orderItems: OrderItem[];
}

export interface OrderItem {
  orderItemId: string;
  productName: string;
  productImageUrl: string;
  quantity: number;
  price: number;
}
