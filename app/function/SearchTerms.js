import { useState, useEffect, useMemo } from "react";
import useDebounce from "./useDebounce";

const SearchTerms = (
  initialData,
  searchTerm = "",
  setSearchTerm = () => {}
) => {
  const [filteredData, setFilteredData] = useState(initialData);
  const debounceSearchTerm = useDebounce(searchTerm, 500);

  // Preprocess initialData to normalize it (remove spaces and convert to lowercase)
  const preprocessedData = useMemo(() => {
    return initialData.map((item) => {
      const normalizedItem = {};
      for (const key in item) {
        normalizedItem[key] = String(item[key])
          .replace(/\s+/g, "")
          .toLowerCase();
      }
      return { ...item, normalized: normalizedItem };
    });
  }, [initialData]);

  useEffect(() => {
    const terms = debounceSearchTerm
      .split(",")
      .map((term) => term.trim().replace(/\s+/g, "").toLowerCase());

    if (terms.every((term) => term === "")) {
      setFilteredData(initialData);
      return;
    }

    const filtered = preprocessedData.filter((item) => {
      return terms.every((term) => {
        return Object.values(item.normalized).some((val) => val.includes(term));
      });
    });

    setFilteredData(filtered);
  }, [debounceSearchTerm, initialData, preprocessedData]);

  const dataToDisplay =
    filteredData.length > 0 || searchTerm !== "" ? filteredData : initialData;

  const clearSearchTerm = () => {
    setSearchTerm("");
  };

  return {
    searchTerm,
    filteredData,
    dataToDisplay,
    clearSearchTerm,
    setSearchTerm,
  };
};

export default SearchTerms;
