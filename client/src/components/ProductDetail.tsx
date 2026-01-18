import { Link, useLocation, useNavigate } from "react-router-dom";
import type { ProductType } from "../types/product";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faShoppingBasket,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { useRef, useState, type MouseEventHandler } from "react";

const ProductDetail = () => {
  const location = useLocation();
  const product: ProductType = location.state?.product;
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [isHovering, setIsHovering] = useState(false);
  const [backgroundPosition, setBackgroundPosition] = useState("center");
  const zoomRef = useRef<HTMLDivElement>(null);

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
    if (!zoomRef.current) return;
    const { left, top, width, height } =
      zoomRef.current.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setBackgroundPosition(`${x}% ${y}%`);
  };

  const handleMouseEnter = () => setIsHovering(true);

  const handleMouseLeave = () => {
    setIsHovering(false);
    setBackgroundPosition("center");
  };

  const handleViewCart = () => navigate("/cart");

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-8 font-primary">
      <div className="max-w-5xl w-full mx-auto flex flex-col md:flex-row md:space-x-8 px-6 p-8 bg-card-light dark:bg-card-bg rounded-lg shadow-lg">
        {/* Product Image with Zoom Effect */}
        <div
          ref={zoomRef}
          onMouseMove={isHovering ? handleMouseMove : undefined}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="w-full md:w-1/2 border border-primary-neon-200 dark:border-primary-neon-600 rounded-md shadow-lg overflow-hidden bg-cover"
          style={{
            backgroundImage: `url(${product.imageUrl})`,
            backgroundSize: isHovering ? "200%" : "cover",
            backgroundPosition: backgroundPosition,
          }}
        >
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full opacity-0"
          />
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2 flex flex-col space-y-6 mt-8 md:mt-0">
          <Link
            to="/home"
            className="inline-flex items-center text-primary-neon dark:text-text-main font-medium hover:text-primary-neon-600 dark:hover:text-primary-neon-300 transition"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
            Back To All Products
          </Link>

          <div>
            <h1 className="text-3xl font-extrabold text-text-dark dark:text-text-main mb-4">
              {product.name}
            </h1>
            <p className="text-lg text-text-light-muted dark:text-text-muted mb-4">
              {product.description}
            </p>
            <div className="text-2xl font-bold text-primary-neon dark:text-secondary-neon">
              ${product.price}
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            {/* Quantity Input */}
            <div className="flex items-center space-x-4">
              <label
                htmlFor="quantity"
                className="text-text-dark dark:text-text-main font-semibold"
              >
                Qty:
              </label>
              <input
                type="number"
                id="quantity"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="w-16 px-2 py-1 border border-primary-neon-300 dark:border-primary-neon-500 rounded-md focus:ring-2 focus:ring-primary-neon dark:focus:ring-secondary-neon focus:outline-none bg-white dark:bg-card-bg text-text-dark dark:text-text-main"
              />
            </div>

            {/* Add to Cart Button */}
            <button className="w-full px-4 py-2 bg-primary-neon dark:bg-secondary-neon text-white dark:text-bg-dark rounded-md text-lg font-semibold hover:brightness-110 dark:hover:brightness-90 transition drop-shadow-[0_0_15px_rgba(217,70,239,0.4)]">
              Add to Cart
              <FontAwesomeIcon icon={faShoppingCart} className="ml-2" />
            </button>

            {/* View Cart Button */}
            <button
              onClick={handleViewCart}
              className="w-full px-4 py-2 bg-accent-bright dark:bg-accent-lime text-white dark:text-bg-dark rounded-md text-lg font-semibold hover:brightness-110 dark:hover:brightness-90 transition"
            >
              View Cart
              <FontAwesomeIcon icon={faShoppingBasket} className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
