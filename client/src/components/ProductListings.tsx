import type { ProductType } from "../types/product";
import ProductCard from "./ProductCard";
import { useTheme } from "../context/ThemeContext";

const ProductListings = ({ products }: { products: ProductType[] | null }) => {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`max-w-5xl mx-auto px-6 py-10 transition-colors duration-300 ${
        isDarkMode ? "bg-bg-dark" : "bg-bg-light"
      }`}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {products && products.length > 0 ? (
          products.map((product) => <ProductCard product={product} />)
        ) : (
          <p className="text-center text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-primary-neon to-secondary-neon py-20 col-span-full">
            {" "}
            No Products Available!{" "}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductListings;
