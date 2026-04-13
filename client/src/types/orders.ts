export type OrderStatus = "CREATED" | "CONFIRMED" | "CANCELLED";

export interface Orders {
  orderId: number;
  totalPrice: number;
  paymentStatus: string;
  orderStatus: OrderStatus;
  createdAt: string;
  updatedAt: string | null;
  orderItems: OrderItem[];
}

export interface OrderItem {
  orderItemId: number;
  productName: string;
  productImageUrl: string;
  quantity: number;
  price: number;
}

/**
 *ORDER_STATUS_CREATED = "CREATED"
ORDER_STATUS_CONFIRMED = "CONFIRMED"
ORDER_STATUS_CANCELLED = "CANCELLED"
 * 
 *{
    "orders": [
        {
            "orderId": 1,
            "totalPrice": 67.50,
            "paymentStatus": "succeeded",
            "orderStatus": "CREATED",
            "createdAt": "2026-03-31T18:24:06Z",
            "updatedAt": null,
            "orderItems": [
                {
                    "orderItemId": 1,
                    "productName": "Ronaldo",
                    "productImageUrl": "/stickers/ronaldo.png",
                    "quantity": 2,
                    "price": 8.00
                },
                {
                    "orderItemId": 2,
                    "productName": "Messi",
                    "productImageUrl": "/stickers/Messi.png",
                    "quantity": 2,
                    "price": 10.00
                },
                {
                    "orderItemId": 3,
                    "productName": "Three headed dragon symbol",
                    "productImageUrl": "/stickers/HouseOfTheDragonSymbol.png",
                    "quantity": 2,
                    "price": 9.00
                },
                {
                    "orderItemId": 4,
                    "productName": "Not a bug",
                    "productImageUrl": "/stickers/itsnotabug.png",
                    "quantity": 1,
                    "price": 6.00
                },
                {
                    "orderItemId": 5,
                    "productName": "CodeSmasher",
                    "productImageUrl": "/stickers/BreakingCode.png",
                    "quantity": 1,
                    "price": 7.50
                }
            ]
        },
        {
            "orderId": 2,
            "totalPrice": 63.50,
            "paymentStatus": "succeeded",
            "orderStatus": "CREATED",
            "createdAt": "2026-04-05T17:04:11Z",
            "updatedAt": null,
            "orderItems": [
                {
                    "orderItemId": 6,
                    "productName": "Virat Kohli",
                    "productImageUrl": "/stickers/Virat.png",
                    "quantity": 1,
                    "price": 9.00
                },
                {
                    "orderItemId": 7,
                    "productName": "Messi",
                    "productImageUrl": "/stickers/Messi.png",
                    "quantity": 1,
                    "price": 10.00
                },
                {
                    "orderItemId": 8,
                    "productName": "Ronaldo",
                    "productImageUrl": "/stickers/ronaldo.png",
                    "quantity": 1,
                    "price": 8.00
                },
                {
                    "orderItemId": 9,
                    "productName": "CodeSmasher",
                    "productImageUrl": "/stickers/BreakingCode.png",
                    "quantity": 1,
                    "price": 7.50
                },
                {
                    "orderItemId": 10,
                    "productName": "Three headed dragon symbol",
                    "productImageUrl": "/stickers/HouseOfTheDragonSymbol.png",
                    "quantity": 1,
                    "price": 9.00
                },
                {
                    "orderItemId": 11,
                    "productName": "Not a bug",
                    "productImageUrl": "/stickers/itsnotabug.png",
                    "quantity": 1,
                    "price": 6.00
                },
                {
                    "orderItemId": 12,
                    "productName": "Developer",
                    "productImageUrl": "/stickers/developer.png",
                    "quantity": 1,
                    "price": 5.00
                },
                {
                    "orderItemId": 13,
                    "productName": "CodeMate",
                    "productImageUrl": "/stickers/youaremycss.png",
                    "quantity": 2,
                    "price": 2.00
                },
                {
                    "orderItemId": 14,
                    "productName": "Devster",
                    "productImageUrl": "/stickers/EatSleepCode.png",
                    "quantity": 1,
                    "price": 5.00
                }
            ]
        }
    ]
}
 */
