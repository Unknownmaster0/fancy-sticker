import { useEffect, useState } from "react";
import PageHeading from "./PageHeading";
import ProductListings from "./ProductListings";
import { useTheme } from "../context/ThemeContext";
import type { ProductType } from "../types/product";
import apiClient from "../api/apiClient";

const Home = () => {
  const { isDarkMode } = useTheme();
  const [products, setProducts] = useState<ProductType[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get<any>("/products");
      setProducts(response.data);
    } catch (error) {
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="text-xl font-semibold">Loading products...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="text-xl text-red-500">Error: {error}</span>
      </div>
    );
  }

  return (
    <div
      className={`max-w-5xl mx-auto px-6 py-10 transition-colors duration-300 ${
        isDarkMode ? "bg-bg-dark text-white" : "bg-bg-light text-text-dark"
      }`}
    >
      <PageHeading>
        Stickers are a fun and creative way to express yourself, decorate your
        belongings, and add a personal touch to everyday items. Whether you're
        looking to jazz up your laptop, water bottle, or notebook, stickers
        offer a versatile and affordable solution. With a wide variety of
        designs, themes, and styles available, there's something for everyone.
        Explore our collection of high-quality stickers that are perfect for any
        occasion or interest. Start personalizing your world today with our
        unique and eye-catching stickers!
      </PageHeading>
      <ProductListings products={products || null} />
    </div>
  );
};

export default Home;
