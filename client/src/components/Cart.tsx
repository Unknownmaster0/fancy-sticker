import PageTitle from "./PageTitle";
import emptyCartImage from "../assets/util/emptycart.png";
import { Link } from "react-router-dom";
import { useCart } from "../store/cart-context";
import { useMemo } from "react";
import CartTable from "./CartTable";

const Cart = () => {
  const { cartItems } = useCart();

  const isCartEmtpy = useMemo(() => cartItems.length === 0, [cartItems]);

  return (
    <div className="py-12 font-primary min-h-[78vh]">
      <div className="max-w-4xl mx-auto px-4">
        <PageTitle title="Your Cart" />
        {isCartEmtpy ? (
          <div className="text-center text-text-light-muted dark:text-text-muted flex flex-col items-center">
            <p className="max-w-xl px-2 mx-auto text-base mb-4">
              Oops... Your cart is empty. Continue shopping
            </p>
            <img
              src={emptyCartImage}
              alt="Empty Cart"
              className="max-w-75 mx-auto mb-6 bg-card-light dark:bg-zinc-400 rounded-md"
            />
            <Link
              to={"/home"}
              className="py-2 px-4 bg-primary-neon dark:bg-secondary-neon text-white dark:text-bg-dark text-xl font-semibold rounded-md flex justify-center items-center hover:brightness-110 dark:hover:brightness-90 transition drop-shadow-[0_0_15px_rgba(217,70,239,0.4)]"
            >
              Back to Products
            </Link>
          </div>
        ) : (
          <>
            <CartTable />
            <div className="flex justify-between mt-8 space-x-4">
              {/* Back to Products Button */}
              <Link
                to="/home"
                className={`py-3 px-6 font-semibold text-lg rounded-full flex justify-center items-center transition-all duration-300
                  bg-linear-to-r from-primary-neon/90 to-accent-bright/90 text-white hover:shadow-[0_0_25px_rgba(217,70,239,0.4)] hover:scale-105`}
              >
                Back to Products
              </Link>
              {/* Proceed to Checkout Button */}
              <button
                className={`py-3 px-6 font-semibold text-lg rounded-full flex justify-center items-center transition-all duration-300 
                  bg-linear-to-r from-primary-neon/90 to-accent-bright/90 text-white hover:shadow-[0_0_25px_rgba(217,70,239,0.4)] hover:scale-105`}
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
