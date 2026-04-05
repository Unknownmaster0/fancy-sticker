import PageTitle from "./PageTitle";
import emptyCartImage from "../assets/util/emptycart.png";
import { Link } from "react-router-dom";
import { useCart } from "../store/cart-context";
import { useMemo } from "react";
import CartTable from "./CartTable";
import { useAuth } from "../store/auth-context";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems } = useCart();
  const { isAuthenticated, user } = useAuth();
  const isCartEmtpy = useMemo(() => cartItems.length === 0, [cartItems]);
  const navigate = useNavigate();

  const isAddressIncomplete = useMemo(() => {
    if (!isAuthenticated || !user) return false; // If not authenticated, we don't consider the address incomplete here
    if (!user.addressDto) return true; // If addressDto is missing, it's incomplete
    const { street, city, state, postalCode, country } = user.addressDto;
    return !street || !city || !state || !postalCode || !country; // If any of the fields are missing, it's incomplete
  }, [user, isAuthenticated]);

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
            {isAddressIncomplete && (
              <p className="text-red-500 text-lg mt-2 text-center">
                Please update your address in your profile to proceed to
                checkout.
              </p>
            )}
            <CartTable />
            <div className="flex justify-between mt-8 space-x-4">
              {/* Back to Products Button */}
              <Link
                to={"/home"}
                className={`py-3 px-6 font-semibold text-lg rounded-full flex justify-center items-center transition-all duration-300
                  bg-linear-to-r from-primary-neon/90 to-accent-bright/90 text-white hover:shadow-[0_0_25px_rgba(217,70,239,0.4)] hover:scale-105`}
              >
                Back to Products
              </Link>
              {/* Proceed to Checkout Button */}
              <Link
                to={isAddressIncomplete ? "#" : "/checkout"}
                className={`py-3 px-6 font-semibold text-lg rounded-full flex justify-center items-center transition-all duration-300 
                  ${isAddressIncomplete ? "cursor-not-allowed opacity-50" : ""}
                  bg-linear-to-r from-primary-neon/90 to-accent-bright/90 text-white hover:shadow-[0_0_25px_rgba(217,70,239,0.4)] hover:scale-105`}
                onClick={(e) => {
                  if (!isAddressIncomplete) {
                    navigate("/checkout");
                  } else {
                    e.preventDefault(); // Prevent navigation if address is incomplete
                  }
                }}
              >
                Proceed to Checkout
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
