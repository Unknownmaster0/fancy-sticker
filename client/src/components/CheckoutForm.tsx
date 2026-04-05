import { useState } from "react";
import { useAuth } from "../store/auth-context";
import { useTheme } from "../context/ThemeContext";
import apiClient from "../api/apiClient";
import { useCart } from "../store/cart-context";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import PageTitle from "./PageTitle";
import { toast } from "react-toastify";
import type { StripeCardNumberElement } from "@stripe/stripe-js";

export default function CheckoutForm() {
  const { user } = useAuth();
  const { isDarkMode } = useTheme();
  const { cartItems, totalPrice, clearCart } = useCart();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [elementErrors, setElementErrors] = useState({
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
  });

  // Theme-aware color configuration
  const labelStyle = isDarkMode
    ? "block text-lg font-semibold text-accent-bright mb-2"
    : "block text-lg font-semibold text-primary-neon mb-2";

  const fieldBaseClass = isDarkMode
    ? "w-full px-4 py-2 text-base border rounded-md transition border-primary-neon focus:ring focus:ring-primary-neon focus:outline-none text-text-main bg-card-bg placeholder-text-muted"
    : "w-full px-4 py-2 text-base border rounded-md transition border-primary-neon focus:ring focus:ring-primary-neon focus:outline-none text-text-dark bg-card-light placeholder-text-light-muted";

  const fieldErrorClass = isDarkMode
    ? "border-accent-bright focus:ring-accent-bright"
    : "border-accent-bright focus:ring-accent-bright";

  const fieldValidClass = isDarkMode
    ? "border-primary-neon focus:ring-primary-neon"
    : "border-primary-neon focus:ring-primary-neon";

  const getClassForElement = (field: keyof typeof elementErrors) =>
    `${fieldBaseClass} ${
      elementErrors[field] ? fieldErrorClass : fieldValidClass
    }`;

  const elementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: isDarkMode ? "#ffffff" : "#1a1a1a",
        backgroundColor: isDarkMode ? "#1a1f3a" : "#fafaf8",
        fontFamily: '"Josefin Sans", system-ui, sans-serif',
      },
      invalid: {
        color: "#ec4899",
        backgroundColor: isDarkMode ? "#1a1f3a" : "#fafaf8",
      },
    },
  };

  function handleCardChange(field: string, event: any) {
    setElementErrors((prev) => ({
      ...prev,
      [field]: event.error ? event.error.message : "",
    }));
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      setErrorMessage("Stripe.js is not loaded yet.");
      return;
    }

    if (Object.values(elementErrors).some((error) => error)) {
      setErrorMessage("Please correct the highlighted errors.");
      return;
    }

    setIsProcessing(true);

    try {
      const response = await apiClient.post("/payment/create-payment-intent", {
        amount: totalPrice * 100,
        currency: "inr",
      });

      const { clientSecret } = response.data;

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(
              CardNumberElement,
            ) as StripeCardNumberElement,
            billing_details: {
              name: user?.name,
              email: user?.email,
              phone: user?.mobileNumber,
              address: {
                line1: user?.addressDto?.street,
                city: user?.addressDto?.city,
                state: user?.addressDto?.state,
                postal_code: user?.addressDto?.postalCode,
                country: user?.addressDto?.country,
              },
            },
          },
        },
      );

      if (error) {
        setErrorMessage(error.message || "Payment failed. Please try again.");
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        toast.success("Payment successful!");
        try {
          await apiClient.post("/orders", {
            totalPrice: totalPrice,
            paymentId: paymentIntent.id,
            paymentStatus: paymentIntent.status,
            items: cartItems.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.price,
            })),
          });
          sessionStorage.setItem("skipRedirectPath", "true");
          clearCart();
          navigate("/order-success");
        } catch (orderError) {
          console.error("Failed to create order:", orderError);
          setErrorMessage("Order creation failed. Please contact support.");
        }
      }
    } catch (error) {
      setErrorMessage("Error processing payment. Please try again later.");
      console.error("Error creating PaymentIntent:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center font-sans transition-colors duration-300 ${
        isDarkMode ? "bg-bg-dark" : "bg-bg-light"
      }`}
    >
      <div
        className={
          isProcessing
            ? "visible flex flex-col justify-center items-center my-50"
            : "hidden"
        }
      >
        <p
          className={`mt-4 text-2xl font-normal ${
            isDarkMode ? "text-accent-bright" : "text-primary-neon"
          }`}
        >
          Processing Payment.... Don't refresh the page
        </p>
      </div>
      <div
        className={
          isProcessing
            ? "hidden"
            : `visible ${
                isDarkMode ? "bg-card-bg" : "bg-card-light"
              } shadow-[0_0_40px_rgba(217,70,239,0.2)] rounded-lg max-w-md w-full px-8 py-6 border border-primary-neon border-opacity-20`
        }
      >
        <PageTitle title="Complete Your Payment" />

        <p
          className={`text-center mt-8 text-lg font-semibold mb-8 ${
            isDarkMode ? "text-text-muted" : "text-text-light-muted"
          }`}
        >
          Amount to be charged:{" "}
          <strong className="text-accent-bright">
            ${totalPrice.toFixed(2)}
          </strong>
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {errorMessage && (
            <div className="text-accent-bright text-sm text-center font-semibold">
              {errorMessage}
            </div>
          )}
          {/* Card Number */}
          <div>
            <label htmlFor="cardNumber" className={labelStyle}>
              Card Number
            </label>
            <div id="cardNumber" className={getClassForElement("cardNumber")}>
              <CardNumberElement
                options={elementOptions}
                onChange={(event) => handleCardChange("cardNumber", event)}
              />
            </div>
            {elementErrors.cardNumber && (
              <p className="text-accent-bright text-sm mt-1 font-semibold">
                {elementErrors.cardNumber}
              </p>
            )}
          </div>

          {/* Card Expiry */}
          <div>
            <label htmlFor="cardExpiry" className={labelStyle}>
              Expiry Date
            </label>
            <div id="cardExpiry" className={getClassForElement("cardExpiry")}>
              <CardExpiryElement
                options={elementOptions}
                onChange={(event) => handleCardChange("cardExpiry", event)}
              />
            </div>
            {elementErrors.cardExpiry && (
              <p className="text-accent-bright text-sm mt-1 font-semibold">
                {elementErrors.cardExpiry}
              </p>
            )}
          </div>

          {/* Card CVC */}
          <div>
            <label htmlFor="cardCvc" className={labelStyle}>
              CVC
            </label>
            <div id="cardCvc" className={getClassForElement("cardCvc")}>
              <CardCvcElement
                options={elementOptions}
                onChange={(event) => handleCardChange("cardCvc", event)}
              />
            </div>
            {elementErrors.cardCvc && (
              <p className="text-accent-bright text-sm mt-1 font-semibold">
                {elementErrors.cardCvc}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={!stripe || isProcessing}
              className={`w-full px-6 py-2 mt-6 text-lg font-semibold rounded-md transition duration-300 border border-primary-neon ${
                isDarkMode
                  ? "bg-linear-to-r from-primary-neon to-accent-bright text-text-main hover:shadow-[0_0_30px_rgba(217,70,239,0.5)]"
                  : "bg-linear-to-r from-primary-neon to-accent-bright text-white hover:shadow-[0_0_30px_rgba(217,70,239,0.5)]"
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isProcessing ? "Payment processing..." : "Pay Now"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
