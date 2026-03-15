import PageHeading from "./PageHeading";
import ProductListings from "./ProductListings";
import { useTheme } from "../context/ThemeContext";
import type { ProductType } from "../types/product";
import apiClient from "../api/apiClient";
import { isAxiosError } from "axios";
import { useLoaderData } from "react-router-dom";

const Home = () => {
  const { isDarkMode } = useTheme();

  const products = useLoaderData<ProductType[] | null>();

  return (
    <div
      className={`max-w-5xl mx-auto px-6 py-10 transition-colors duration-300 ${
        isDarkMode ? "bg-bg-dark text-white" : "bg-bg-light text-text-dark"
      }`}
    >
      <PageHeading>
        Stickers are a fun and creative way to express yourself, decorate your
        belongings, and add a personal touch to everyday items. Whether you're
        looking to jazz up your laptop, water bottle, or notebook, stickers
        offer a versatile and affordable solution. With a wide variety of
        designs, themes, and styles available, there's something for everyone.
        Explore our collection of high-quality stickers that are perfect for any
        occasion or interest. Start personalizing your world today with our
        unique and eye-catching stickers!
      </PageHeading>
      <ProductListings products={products || null} />
    </div>
  );
};

export default Home;

export const ProductFetchLoading = async () => {
  // todo: When backend is giving error while fetching products, then errorPage is shown without footer and header. Fix it.
  try {
    const response = await apiClient.get<any>("/products");
    return response.data;
  } catch (error) {
    let title: string = "Failed to fetch products";
    let message: string =
      "An unexpected error occurred while fetching products.";
    let status: number | undefined = 500;
    if (isAxiosError(error)) {
      title = error.name;
      message = error.message;
      status = error.response?.status;
    } else if (error instanceof Error) {
      title = error.name;
      message = error.message;
    }

    throw new Response(JSON.stringify({ message }), {
      status,
      statusText: title,
    });
  }
};
