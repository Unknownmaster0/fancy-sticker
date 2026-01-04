import type { ProductType } from "../types/product";

const ProductCard = ({ product }: { product: ProductType }) => {
  return (
    <div className="product-card">
      <div className="product-card-image-container">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="product-card-image"
        />
        <div className="product-card-details">
          <h2 className="product-card-title">{product.name}</h2>
          <p className="product-card-description">{product.description}</p>
        </div>
        <div className="product-card-footer"></div>
      </div>
    </div>
  );
};

export default ProductCard;
