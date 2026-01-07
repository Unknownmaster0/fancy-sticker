import type { ProductType } from "../types/product";
import Price from "./Price";
import { useTheme } from "../context/ThemeContext";

const ProductCard = ({ product }: { product: ProductType }) => {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`border-[1.5px] rounded-3xl overflow-hidden flex flex-col transition-all duration-500 hover:-translate-y-[-15px] hover:scale-[1.02] hover:border-primary-neon hover:shadow-[0_0_40px_rgba(217,70,239,0.3),0_0_20px_rgba(6,182,212,0.2)] ${
        isDarkMode
          ? "bg-card-bg border-[rgba(217,70,239,0.2)]"
          : "bg-card-light border-[rgba(217,70,239,0.1)]"
      }`}
    >
      <div
        className={`h-72 flex items-center justify-center relative overflow-hidden transition-colors duration-300 ${
          isDarkMode
            ? "bg-linear-to-br from-card-bg to-[#2a1f4a]"
            : "bg-linear-to-br from-[#f0f0f5] to-[#e8e8f0]"
        }`}
      >
        <div
          className="absolute top-[-50%] right-[-50%] w-[200%] h-[200%] pointer-events-none animate-pulse-custom"
          style={{
            backgroundImage: isDarkMode
              ? "radial-gradient(circle, rgba(217, 70, 239, 0.1), transparent)"
              : "radial-gradient(circle, rgba(217, 70, 239, 0.05), transparent)",
          }}
        ></div>
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-[70%] h-[70%] object-contain transition-transform duration-500 group-hover:scale-110"
          style={{ width: "70%", height: "70%" }}
        />
      </div>
      <div className="p-6">
        <h2 className="text-xl font-bold text-transparent bg-clip-text bg-linear-to-r from-primary-neon to-secondary-neon mb-2">
          {product.name}
        </h2>
        <p
          className={`text-sm mb-6 transition-colors duration-300 ${
            isDarkMode ? "text-text-muted" : "text-text-light-muted"
          }`}
        >
          {product.description}
        </p>
        <div className="flex justify-between items-center">
          <div className="bg-linear-to-r from-primary-neon to-accent-bright text-white font-bold py-2.5 px-6 rounded-full text-sm uppercase tracking-wider drop-shadow-[0_0_15px_rgba(217,70,239,0.4)]">
            <Price currency={"₨"} price={product.price} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
