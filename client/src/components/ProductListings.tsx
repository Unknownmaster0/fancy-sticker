import type { ProductType } from "../types/product";
import ProductCard from "./ProductCard";
import { useTheme } from "../context/ThemeContext";
import SearchBox from "./SearchBox";
import Dropdown from "./Dropdown";
import { useMemo, useState } from "react";

const sortList = ["Popularity", "Price: Low to High", "Price: High to Low"];

const ProductListings = ({ products }: { products: ProductType[] | null }) => {
  const { isDarkMode } = useTheme();
  const [searchText, setSearchText] = useState<string>("");
  const [selectedSort, setSelectedSort] = useState<string>("Popularity");

  const filterSortedProducts: ProductType[] = useMemo(() => {
    if (!products || products?.length === 0) return [];

    // search for the searchText in the name and description fields
    let filteredProducts: ProductType[] = products?.filter(
      (product) =>
        product.name.toLowerCase().includes(searchText.toLowerCase()) ||
        product.description.toLowerCase().includes(searchText.toLowerCase())
    );

    if (!filteredProducts || filteredProducts.length === 0) return [];

    // sort based on selectedSort
    return (
      filteredProducts &&
      filteredProducts.slice().sort((a, b) => {
        switch (selectedSort) {
          case "Price: Low to High":
            return parseFloat(a.price) - parseFloat(b.price);
          case "Price: High to Low":
            return parseFloat(b.price) - parseFloat(a.price);
          default:
            return parseInt(b.popularity) - parseInt(a.popularity);
        }
      })
    );
  }, [products, searchText, selectedSort]);

  const handleSearchChange = (value: string) => {
    setSearchText(value);
  };

  const handleSortChange = (value: string) => {
    setSelectedSort(value);
  };

  return (
    <div
      className={`max-w-5xl mx-auto px-6 py-10 transition-colors duration-300 ${
        isDarkMode ? "bg-bg-dark" : "bg-bg-light"
      }`}
    >
      <div className="flex flex-col sm:flex-row justify-between items-center gap-7 sm:gap-40 pt-12 mb-10">
        <SearchBox
          label="Search"
          placeholder="Search products..."
          value={searchText}
          handleSearch={(searchTerm) => handleSearchChange(searchTerm)}
        />
        <Dropdown
          label="Sort by"
          options={sortList}
          selectedValue={selectedSort}
          handleSort={(sortValue) => handleSortChange(sortValue)}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {filterSortedProducts && filterSortedProducts.length > 0 ? (
          filterSortedProducts.map((product, idx) => (
            <ProductCard key={idx} product={product} />
          ))
        ) : (
          <p className="text-center text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-primary-neon to-secondary-neon py-20 col-span-full">
            {" "}
            No Products Available!{" "}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductListings;
