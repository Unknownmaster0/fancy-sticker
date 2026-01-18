import { useNavigate } from "react-router-dom";
import PageTitle from "./PageTitle";
import emptyCartImage from "../assets/util/emptycart.png";

const Cart = () => {
  const navigation = useNavigate();

  const handleClick = () => {
    navigation("/home");
  };

  return (
    <div className="py-12 font-primary min-h-[78vh]">
      <div className="max-w-4xl mx-auto px-4">
        <PageTitle title="Your Cart" />
        <div className="text-center text-text-light-muted dark:text-text-muted flex flex-col items-center">
          <p className="max-w-xl px-2 mx-auto text-base mb-4">
            Oops... Your cart is empty. Continue shopping
          </p>
          <img
            src={emptyCartImage}
            alt="Empty Cart"
            className="max-w-75 mx-auto mb-6 bg-card-light dark:bg-zinc-400 rounded-md"
          />
          <button
            onClick={handleClick}
            className="py-2 px-4 bg-primary-neon dark:bg-secondary-neon text-white dark:text-bg-dark text-xl font-semibold rounded-md flex justify-center items-center hover:brightness-110 dark:hover:brightness-90 transition drop-shadow-[0_0_15px_rgba(217,70,239,0.4)]"
          >
            Back to Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
