 Sticker e-commerce website, user can buy sticker and make payment through online payment        

Project Overview                

  A full-stack e-commerce platform for buying and selling digital stickers. Built with React (Frontend) and
  Spring Boot (Backend), featuring secure payment integration via Stripe.

  Client Setup (React + TypeScript + Vite)

  Prerequisites

  - Node.js v18+
  - npm v9+
  - TypeScript
  - Vite.js

  Installation

  cd client
  npm install

  Development

  npm run dev  # Starts dev server with HMR

  Build Production

  npm run build  # Outputs to client/dist/

  Testing

  npm run test  # Runs Jest tests

  Server Setup (Spring Boot)

  Prerequisites

  - Java 17+
  - Maven 3.8+
  - PostgreSQL (for production)

  Installation

  cd fancysticker-server
  mvn clean install

  Running the Server

  # Start development server
  mvn spring-boot:run

  # Build production JAR
  mvn package

  Dependencies

  - Spring Security (for authentication)
  - Spring Data JPA (database ORM)
  - Stripe Spring Boot starter (payment integration)

  Functionality Overview

  User Features

  - 🛒 Browse and purchase stickers
  - 🎫 Add to cart and checkout
  - 🔒 Secure user authentication
  - 📋 View order history

  Admin Features

  - 🎨 Manage sticker inventory
  - 📊 Monitor orders and sales
  - 👥 User account management

  Deployment

  Production Setup

  1. Build both client and server:
  cd client && npm run build
  cd ../fancysticker-server && mvn package
  2. Start server:
  java -jar target/fancysticker-server-1.0.0.jar
  3. Access Swagger API docs at: /swagger-ui.html

  Environment Variables

  # client/.env
  VITE_API_URL=http://localhost:8080/api

  # server/.env
  STRIPE_SECRET_KEY=your_real_stripe_secret
  DATABASE_URL=jdbc:postgresql://localhost:5432/sticker_db

  Documentation

  API Endpoints

  - GET /api/products - Get all stickers
  - POST /api/cart - Add to cart
  - GET /api/orders - View order history