import { Link } from "react-router-dom";
import PageTitle from "./PageTitle";
import orderSuccessImg from "../assets/util/order-confirmed.png";

const OrderSuccess = () => {
  return (
    <div className="min-h-screen py-12 sm:pt-20 font-primary bg-bg-light dark:bg-bg-dark text-text-dark dark:text-text-main transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4">
        <PageTitle title="Hurray! Order placed successfully" />
      </div>
      <div className="text-center text-lg text-text-light-muted dark:text-text-muted flex flex-col items-center">
        <p className="max-w-xl text-center px-4 mx-auto leading-6 mb-6">
          Your order has been placed successfully. The items in your order will
          be delivered within 48 hours.
        </p>
        <img
          src={orderSuccessImg}
          alt="Order Success"
          className="w-full max-w-112.5 mx-auto mb-8"
        />
        <Link
          to="/home"
          className="px-6 py-3 text-white dark:text-bg-dark text-xl font-semibold rounded-md transition-all duration-300 bg-primary-neon dark:bg-secondary-neon hover:brightness-110 dark:hover:brightness-90 drop-shadow-[0_0_15px_rgba(217,70,239,0.4)] dark:drop-shadow-[0_0_15px_rgba(6,182,212,0.3)]"
        >
          Keep Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
