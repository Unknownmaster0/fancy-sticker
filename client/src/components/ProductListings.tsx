import type { ProductType } from "../types/product";
import ProductCard from "./ProductCard";

const ProductListings = ({ products }: { products: ProductType[] | null }) => {
  return (
    <div className="product-listings-container">
      <div className="product-listings-grid">
        {products && products.length > 0 ? (
          products.map((product) => <ProductCard product={product} />)
        ) : (
          <p className="product-listings-empty"> No Products Available! </p>
        )}
      </div>
    </div>
  );
};

export default ProductListings;
