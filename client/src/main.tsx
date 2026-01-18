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
import Login from "./components/Login.tsx";
import ErrorPage from "./components/ErrorPage.tsx";
import ProductDetail from "./components/ProductDetail.tsx";

const routeDefinition = createRoutesFromElements(
  <Route path="/" element={<App />} errorElement={<ErrorPage />}>
    <Route index element={<Home />} loader={ProductFetchLoading} />
    <Route path="/home" element={<Home />} loader={ProductFetchLoading} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} action={contactFormAction} />
    <Route path="/login" element={<Login />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/products/:id" element={<ProductDetail />} />
  </Route>
);

const appRouter = createBrowserRouter(routeDefinition);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider router={appRouter} />
    </ThemeProvider>
  </StrictMode>
);
