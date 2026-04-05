import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home, { ProductFetchLoading } from "./components/Home.tsx";
import About from "./components/About.tsx";
import Contact, { contactFormAction } from "./components/Contact.tsx";
import Cart from "./components/Cart.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import Login, { loginAction } from "./components/Login.tsx";
import ErrorPage from "./components/ErrorPage.tsx";
import ProductDetail from "./components/ProductDetail.tsx";
import { CartProvider } from "./store/cart-context.tsx";
import { ToastContainer, Bounce } from "react-toastify";
import { AuthProvider } from "./store/auth-context.tsx";
import Register, { registerAction } from "./components/Register.tsx";
import Orders from "./components/Orders.tsx";
import Profile, {
  profileAction,
  profileLoader,
} from "./components/Profile.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./components/CheckoutForm.tsx";
import OrderSuccess from "./components/OrderSuccess.tsx";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const routeDefinition = createRoutesFromElements(
  <Route path="/" element={<App />} errorElement={<ErrorPage />}>
    <Route index element={<Home />} loader={ProductFetchLoading} />
    <Route path="/home" element={<Home />} loader={ProductFetchLoading} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} action={contactFormAction} />
    <Route path="/login" element={<Login />} action={loginAction} />
    <Route path="/register" element={<Register />} action={registerAction} />
    <Route path="/cart" element={<Cart />} />
    <Route element={<ProtectedRoute />}>
      <Route path="/orders" element={<Orders />} />
      <Route path="/order-success" element={<OrderSuccess />} />
      {/* shouldRevalidate method -- checks if the action result was not successful, then only run the loader function again else not. */}
      <Route
        path="/profile"
        element={<Profile />}
        loader={profileLoader}
        action={profileAction}
        shouldRevalidate={({ actionResult }) => !actionResult.success}
      />
      <Route path="/checkout" element={<CheckoutForm />} />
    </Route>
    <Route path="/products/:id" element={<ProductDetail />} />
  </Route>,
);

const appRouter = createBrowserRouter(routeDefinition);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Elements stripe={stripePromise}>
      <AuthProvider>
        <ThemeProvider>
          <CartProvider>
            <RouterProvider router={appRouter} />
          </CartProvider>
        </ThemeProvider>
      </AuthProvider>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        draggable
        pauseOnHover
        theme={localStorage.getItem("isDarkMode") === "true" ? "dark" : "light"}
        transition={Bounce}
      />
    </Elements>
  </StrictMode>,
);
