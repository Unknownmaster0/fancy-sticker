import { useLoaderData, useNavigate } from "react-router-dom";
import apiClient from "../api/apiClient";
import type { Orders } from "../types/orders";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import PageTitle from "./PageTitle";

const Orders = () => {
  const orders: Orders[] = useLoaderData();
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  const toggleOrderExpand = (orderId: string) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const getStatusColor = (status: string) => {
    const statusLower = status.toLowerCase();
    switch (statusLower) {
      case "confirmed":
        return "bg-accent-lime text-black";
      case "created":
        return "bg-primary-neon text-white";
      case "cancelled":
        return "bg-red-500 text-white";
      case "succeeded":
        return "bg-green-500 text-white";
      default:
        return "bg-secondary-neon text-white";
    }
  };

  const getStatusBorderColor = (status: string) => {
    const statusLower = status.toLowerCase();
    switch (statusLower) {
      case "confirmed":
        return "border-l-4 border-accent-lime";
      case "created":
        return "border-l-4 border-primary-neon";
      case "cancelled":
        return "border-l-4 border-red-500";
      case "succeeded":
        return "border-l-4 border-green-500";
      default:
        return "border-l-4 border-secondary-neon";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!orders || orders.length === 0) {
    return (
      <div
        className={`min-h-screen pt-10 ${
          isDarkMode
            ? "bg-bg-dark text-text-main"
            : "bg-bg-light text-text-dark"
        }`}
      >
        <PageTitle title="My Orders" />
        <div
          className={`max-w-6xl mx-auto px-4 py-16 text-center ${
            isDarkMode ? "bg-bg-dark" : "bg-bg-light"
          }`}
        >
          <p
            className={`text-lg ${
              isDarkMode ? "text-text-muted" : "text-text-light-muted"
            }`}
          >
            No orders found. Start shopping now!
          </p>
          <button
            onClick={() => navigate("/home")}
            className="mt-6 px-8 py-3 rounded-lg font-semibold transition-all duration-300 bg-linear-to-r from-primary-neon to-secondary-neon hover:shadow-lg hover:shadow-primary-neon/50 text-white"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen pt-10 ${
        isDarkMode ? "bg-bg-dark text-text-main" : "bg-bg-light text-text-dark"
      }`}
    >
      <PageTitle title="My Orders" />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.orderId}
              className={`rounded-xl border-2 transition-all duration-300 overflow-hidden ${
                isDarkMode
                  ? "bg-card-bg border-primary-neon border-opacity-30 hover:border-opacity-60 hover:shadow-lg hover:shadow-primary-neon/30"
                  : "bg-card-light border-primary-neon border-opacity-40 hover:border-opacity-80 hover:shadow-lg hover:shadow-primary-neon/20"
              }`}
            >
              {/* Order Header */}
              <div
                onClick={() => toggleOrderExpand(order.orderId)}
                className={`p-6 cursor-pointer transition-all duration-300 ${
                  expandedOrderId === order.orderId
                    ? isDarkMode
                      ? "bg-linear-to-r from-primary-neon/20 to-secondary-neon/20"
                      : "bg-linear-to-r from-primary-neon/10 to-secondary-neon/10"
                    : ""
                }`}
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                  {/* Order ID and Date */}
                  <div>
                    <p
                      className={`text-sm ${
                        isDarkMode ? "text-text-muted" : "text-text-light-muted"
                      }`}
                    >
                      Order ID
                    </p>
                    <p className="text-xl font-bold text-primary-neon">
                      #{order.orderId}
                    </p>
                    <p
                      className={`text-xs mt-1 ${
                        isDarkMode ? "text-text-muted" : "text-text-light-muted"
                      }`}
                    >
                      {formatDate(order.createdAt)}
                    </p>
                  </div>

                  {/* Total Price */}
                  <div>
                    <p
                      className={`text-sm ${
                        isDarkMode ? "text-text-muted" : "text-text-light-muted"
                      }`}
                    >
                      Total Price
                    </p>
                    <p className="text-2xl font-bold text-secondary-neon">
                      ${order.totalPrice.toFixed(2)}
                    </p>
                  </div>

                  {/* Payment Status */}
                  <div>
                    <p
                      className={`text-sm ${
                        isDarkMode ? "text-text-muted" : "text-text-light-muted"
                      }`}
                    >
                      Payment
                    </p>
                    <span
                      className={`inline-block px-4 py-2 rounded-full text-sm font-semibold mt-1 ${getStatusColor(
                        order.paymentStatus,
                      )}`}
                    >
                      {order.paymentStatus.charAt(0).toUpperCase() +
                        order.paymentStatus.slice(1)}
                    </span>
                  </div>

                  {/* Order Status */}
                  <div>
                    <p
                      className={`text-sm ${
                        isDarkMode ? "text-text-muted" : "text-text-light-muted"
                      }`}
                    >
                      Status
                    </p>
                    <span
                      className={`inline-block px-4 py-2 rounded-full text-sm font-semibold mt-1 ${getStatusColor(
                        order.orderStatus,
                      )}`}
                    >
                      {order.orderStatus}
                    </span>
                  </div>
                </div>

                {/* Expand Arrow */}
                <div className="flex justify-end mt-4">
                  <svg
                    className={`w-6 h-6 text-primary-neon transition-transform duration-300 ${
                      expandedOrderId === order.orderId ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                </div>
              </div>

              {/* Order Items - Expandable Section */}
              {expandedOrderId === order.orderId && (
                <div
                  className={`border-t-2 ${
                    isDarkMode
                      ? "border-primary-neon border-opacity-20 bg-card-bg"
                      : "border-primary-neon border-opacity-30 bg-card-light"
                  }`}
                >
                  <div className="p-6">
                    <h3 className="text-lg font-bold mb-4 text-accent-bright">
                      Order Items
                    </h3>
                    <div className="space-y-4">
                      {order.orderItems.map((item) => (
                        <div
                          key={item.orderItemId}
                          className={`flex items-center gap-4 p-4 rounded-lg transition-all duration-300 ${getStatusBorderColor(
                            order.orderStatus,
                          )} ${
                            isDarkMode
                              ? "bg-card-bg hover:bg-opacity-80"
                              : "bg-card-light hover:bg-opacity-90"
                          }`}
                        >
                          {/* Product Image */}
                          <div className="shrink-0">
                            <img
                              src={item.productImageUrl}
                              alt={item.productName}
                              className="w-24 h-24 object-cover rounded-lg border-2 border-secondary-neon border-opacity-50"
                            />
                          </div>

                          {/* Product Info */}
                          <div className="grow">
                            <h4 className="text-lg font-semibold mb-2">
                              {item.productName}
                            </h4>
                            <div className="grid grid-cols-3 gap-8 text-sm">
                              <div>
                                <p
                                  className={`${
                                    isDarkMode
                                      ? "text-text-muted"
                                      : "text-text-light-muted"
                                  }`}
                                >
                                  Quantity
                                </p>
                                <p className="font-bold text-secondary-neon">
                                  {item.quantity}
                                </p>
                              </div>
                              <div className="flex justify-center">
                                <div>
                                  <p
                                    className={`${
                                      isDarkMode
                                        ? "text-text-muted"
                                        : "text-text-light-muted"
                                    }`}
                                  >
                                    Unit Price
                                  </p>
                                  <p className="font-bold text-accent-bright">
                                    ${item.price.toFixed(2)}
                                  </p>
                                </div>
                              </div>
                              <div className="flex justify-end">
                                <div>
                                  <p
                                    className={`${
                                      isDarkMode
                                        ? "text-text-muted"
                                        : "text-text-light-muted"
                                    }`}
                                  >
                                    Subtotal
                                  </p>
                                  <p className="font-bold text-accent-lime">
                                    ${(item.quantity * item.price).toFixed(2)}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Order Summary */}
                    <div
                      className={`mt-6 pt-6 border-t-2 ${
                        isDarkMode
                          ? "border-primary-neon border-opacity-20"
                          : "border-primary-neon border-opacity-30"
                      }`}
                    >
                      <div className="flex justify-end items-center gap-4">
                        <span className="text-lg font-semibold">
                          Order Total:
                        </span>
                        <span
                          className={`text-3xl font-bold text-primary-neon`}
                        >
                          ${order.totalPrice.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export async function OrdersLoader() {
  try {
    const response = (await apiClient("/orders")).data;
    console.log("Orders:", response);
    return response.orders;
  } catch (error: any) {
    throw new Response(
      error.response?.data?.message || "Failed to load orders",
      { status: error.status || 500 },
    );
  }
}

export default Orders;
