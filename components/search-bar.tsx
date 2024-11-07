"use client"; // Ensure this is a client component
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { SearchIcon } from "lucide-react";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

const SearchBar = () => {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    // const fetchNames = async () => {
    //   try {
    //     const products = await getProducts({});
    //     const productNames = products?.map((product) => product?.name);
    //     const categories = await getCategories();
    //     const categoryNames = categories?.map((category) => category?.name);
    //     const suggestions = categoryNames?.concat(...productNames);
    //     setSuggestions(suggestions);
    //   } catch (error) {
    //     console.error("SEARCH_BAR_ERROR ", error);
    //   }
    // };
    // fetchNames();
    // Sample data for crops and diseases
    const items = [
      "Rice",
      "Wheat",
      "Maize",
      "Tomato",
      "Potato",
      "Fungal Disease",
      "Bacterial Wilt",
      "Blight",
      // Add more items as needed
    ];
    setSuggestions(items);
  }, []);

  const handleSearch = () => {
    if (query.length < 3) {
      toast.error("Query must be at least 3 characters long.");
      return;
    }

    // Regular expression to check if the query contains only letters
    const regex = /^[a-zA-Z\s]+$/; // This matches only letters (uppercase and lowercase)

    if (!regex.test(query)) {
      toast.error("Query can only contain letters.");
      return;
    }
    toast.success(query);
    //   router.push(`/product/?search=${query}`);
    // Implement logic to search crops and diseases by name in multiple languages
    // For demonstration, log the search term
    console.log("Searching for:", query);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    // Filter suggestions based on the input
    // Filter suggestions based on the query
    const filtered = suggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredSuggestions(filtered);
    setShowDropdown(value.length > 0 && filtered.length > 0); // Show dropdown if there are suggestions
  };
  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion.toLowerCase());
    setShowDropdown(false); // Close dropdown on selection
    setSuggestions([]); // Clear suggestions after selection
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="relative flex items-center w-full md:w-auto"
    >
      {/* Search bar for large screens */}
      <div className=" items-center flex">
        <input
          type="text"
          value={query}
          onChange={handleInputChange} // Correctly update search term
          placeholder={t("search")}
          className="border border-gray-300 rounded-l-md px-4 py-2  bg-white dark:bg-black"
        />

        <button
          onClick={handleSearch}
          className="bg-green-500 text-white dark:text-blackrounded-r-md px-4 py-2 flex items-center" // Green background for button
        >
          <SearchIcon className="w-5 h-5" />
        </button>
      </div>
      {showDropdown && (
        <motion.ul
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-10 mt-2 w-full bg-white dark:bg-black border border-gray-300 rounded-md shadow-lg"
        >
          {filteredSuggestions.map((suggestion, index) => (
            <motion.li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-4 py-2 hover:bg-green-100 cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              {suggestion}
            </motion.li>
          ))}
        </motion.ul>
      )}
    </motion.div>
  );
};

export default SearchBar;
