import { useEffect, useState } from "react";
import PageHeading from "./PageHeading";
import ProductListings from "./ProductListings";
import type { ProductType } from "../types/product";

const Home = () => {
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
    <div className="home-container">
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
