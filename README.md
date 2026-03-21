# Fancy Sticker E-Commerce Platform

A full-stack e-commerce platform for buying and selling digital stickers. Built with React (Frontend) and Spring Boot (Backend), featuring secure payment integration via Stripe.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Overview
Fancy Sticker is an e-commerce platform where users can browse, purchase, and manage digital sticker collections. The platform includes user authentication, shopping cart functionality, secure payments through Stripe, and admin capabilities for managing inventory and orders.

## Features

### User Features
- 🛒 Browse and search through sticker collections
- 🎫 Add stickers to cart and proceed to checkout
- 🔒 Secure user authentication (login/register)
- 💳 Payment processing with Stripe integration
- 📋 View order history and track purchases
- 👤 User profile management

### Admin Features
- 🎨 Manage sticker inventory (add/edit/delete stickers)
- 📊 Monitor orders and sales analytics
- 👥 User account management
- 📈 Sales reporting and statistics

## Tech Stack

### Frontend (Client)
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 4
- **State Management**: React Context API
- **Routing**: React Router DOM v7
- **UI Components**: Font Awesome Icons
- **Notifications**: React Toastify
- **HTTP Client**: Axios
- **State Persistence**: JS Cookie

### Backend (Server)
- **Framework**: Spring Boot 3
- **Language**: Java 17+
- **Build Tool**: Maven
- **Database**: PostgreSQL (production), H2 (development)
- **ORM**: Spring Data JPA
- **Security**: Spring Security with JWT authentication
- **Payment**: Stripe Spring Boot Starter
- **API Documentation**: Swagger/OpenAPI
- **Validation**: Hibernate Validator

## Installation

### Prerequisites
- Node.js v18+ and npm v9+
- Java 17+ and Maven 3.8+
- PostgreSQL (for production deployment)

### Frontend Setup
```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Start development server
npm run dev
```

### Backend Setup
```bash
# Navigate to server directory
cd fancysticker-server

# Install dependencies and build
mvn clean install

# Start development server
mvn spring-boot:run
```

### Production Build
```bash
# Build frontend
cd client
npm run build

# Build backend
cd ../fancysticker-server
mvn package

# Run production JAR
java -jar target/fancysticker-server-1.0.0.jar
```

## Usage

### Development
1. Start the backend server: `mvn spring-boot:run` (in fancysticker-server directory)
2. Start the frontend development server: `npm run dev` (in client directory)
3. Access the application at: http://localhost:5173
4. API documentation available at: http://localhost:8080/swagger-ui.html

### Environment Variables

#### Client (.env)
```
VITE_API_URL=http://localhost:8080/api
```

#### Server (.env)
```
STRIPE_SECRET_KEY=your_real_stripe_secret_key_here
DATABASE_URL=jdbc:postgresql://localhost:5432/sticker_db
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRATION_MS=86400000
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Products
- `GET /api/products` - Get all stickers
- `GET /api/products/{id}` - Get sticker by ID
- `POST /api/products` - Create new sticker (Admin)
- `PUT /api/products/{id}` - Update sticker (Admin)
- `DELETE /api/products/{id}` - Delete sticker (Admin)

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/{itemId}` - Update cart item quantity
- `DELETE /api/cart/{itemId}` - Remove item from cart

### Orders
- `GET /api/orders` - Get user's order history
- `POST /api/orders` - Create new order
- `GET /api/orders/{id}` - Get order by ID
- `GET /api/admin/orders` - Get all orders (Admin)
- `PUT /api/admin/orders/{id}/status` - Update order status (Admin)

### Payments
- `POST /api/payment/create-intent` - Create Stripe payment intent
- `POST /api/payment/webhook` - Stripe webhook endpoint

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please make sure to update tests as appropriate and follow the existing code style.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Stripe for payment processing
- Font Awesome for icons
- Tailwind CSS for styling
- Vite for fast development experience
- Spring Boot team for robust backend framework

---
*Last updated: March 2026*