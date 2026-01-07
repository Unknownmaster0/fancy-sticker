import { useEffect, useState } from "react";
import PageHeading from "./PageHeading";
import ProductListings from "./ProductListings";
import { useTheme } from "../context/ThemeContext";
import type { ProductType } from "../types/product";

const Home = () => {
  const { isDarkMode } = useTheme();
  const [products, setProducts] = useState<ProductType[] | null>(null);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        "https://695a840a950475ada466f783.mockapi.io/api/v1/Stickers"
      );
      const data = await response.json();
      setProducts(data);
    })();
  }, []);

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
