import React, { useContext, useEffect, useState, useMemo, useCallback } from "react";
import IdolCard from "./IdolCard";
import { IdolContext } from "../ContextApi/IdolContext";
import LoadingSpinner from "../404ErrorPage/LoadingSpinner";
import axios from "axios";

const apiUrl = import.meta.env.VITE_BACK_END_URL;
const ITEMS_PER_PAGE = 12;

function IdolCardsList() {
  const { idolList } = useContext(IdolContext);
  const [loading, setLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState({});
  const [priceRange, setPriceRange] = useState(5000);
  const [sortOrder, setSortOrder] = useState("default");
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/products/category/fetch`);
        if (response.status === 200) {
          console.log("cat", response.data);
          setCategories(response.data);
          setSelectedCategories(
            response.data.name.reduce((acc, cat) => ({ ...acc, [cat.id]: false }), {})
          );
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleCategorySelect = useCallback((categoryId) => {
    setSelectedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
    setCurrentPage(1);
  }, []);

  const handleResetCategories = () => {
    setSelectedCategories(
      categories.reduce((acc, cat) => ({ ...acc, [cat.id]: false }), {})
    );
    setCurrentPage(1);
  };

  const filteredIdols = useMemo(() => {
    return idolList?.filter((idol) => {
      const isCategorySelected = Object.entries(selectedCategories).some(
        ([catId, isSelected]) => isSelected && String(catId) === String(idol.category?.id)
      );
      const isPriceInRange = idol.price <= priceRange;
      const noCategorySelected = !Object.values(selectedCategories).some(Boolean);

      return (noCategorySelected || isCategorySelected) && isPriceInRange;
    });
  }, [idolList, selectedCategories, priceRange]);

  const sortedAndFilteredIdols = useMemo(() => {
    return [...filteredIdols].sort((a, b) => {
      if (sortOrder === "lowToHigh") return a.price - b.price;
      if (sortOrder === "highToLow") return b.price - a.price;
      return 0;
    });
  }, [filteredIdols, sortOrder]);

  const totalPages = Math.ceil(sortedAndFilteredIdols.length / ITEMS_PER_PAGE);
  const idolsToShow = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedAndFilteredIdols.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [sortedAndFilteredIdols, currentPage]);

  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen bg-white flex">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {/* Sidebar */}
          <div className="w-80 bg-white shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Filters</h3>

            {/* Category Filter */}
            <div className="mb-6">
              <h4 className="text-md font-semibold mb-2">Categories</h4>
              <div className="space-y-2">
                <label className="flex items-center gap-2 px-3 py-1.5 rounded-lg cursor-pointer transition hover:bg-gray-200">
                  <input
                    type="checkbox"
                    checked={Object.values(selectedCategories).every((val) => !val)}
                    onChange={handleResetCategories}
                    className="form-checkbox text-blue-500 w-4 h-4"
                  />
                  <span className="text-gray-800 text-sm font-medium">All</span>
                </label>
                {categories.map((cat) => (
                  <label
                    key={cat.id}
                    htmlFor={`cat-${cat.id}`}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg cursor-pointer transition hover:bg-gray-200">
                    <input
                      id={`cat-${cat.id}`}
                      type="checkbox"
                      checked={selectedCategories[cat.id] || false}
                      onChange={() => handleCategorySelect(cat.id)}
                      className="form-checkbox text-blue-500 w-4 h-4"
                    />
                    <span className="text-gray-800 text-sm font-medium">{cat.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="mb-6">
              <h4 className="text-md font-semibold mb-2">Price Range</h4>
              <input
                type="range"
                min="0"
                max="5000"
                step="100"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full cursor-pointer"
              />
              <div className="flex justify-between text-sm text-gray-600 mt-1">
                <span>₹0</span>
                <span>₹{priceRange}</span>
                <span>₹5000+</span>
              </div>
            </div>

            {/* Sort By Dropdown */}
            <div className="mb-6">
              <h4 className="text-md font-semibold mb-2">Sort By</h4>
              <select
                className="w-full px-3 py-2 border rounded-lg bg-white text-gray-800 cursor-pointer"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}>
                <option value="default">Default</option>
                <option value="lowToHigh">Price: Low to High</option>
                <option value="highToLow">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Main content */}
          <div className="flex flex-col min-h-screen flex-grow">
            <div className="flex-grow">
              {idolsToShow.length === 0 ? (
                <p className="text-center w-full py-10 text-gray-600">
                  No idols found with selected filters.
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                  {idolsToShow.map((idol) => (
                    <IdolCard
                      key={idol._id}
                      id={idol._id}
                      title={idol.title}
                      thumbnail={idol.thumbnail?.image_url}
                      category={idol.category.name}
                      price={idol.price}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-auto py-4 bg-white shadow-lg">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition">
                  Previous
                </button>
                <span className="mx-4 px-4 py-2 bg-gray-200 rounded-lg">
                  {currentPage} / {totalPages}
                </span>
                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition">
                  Next
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default IdolCardsList;
