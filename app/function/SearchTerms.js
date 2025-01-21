import { useState, useEffect } from "react";

const SearchTerms = (
  initialData,
  searchTerm = "",
  setSearchTerm = () => {}
) => {
  const [filteredData, setFilteredData] = useState(initialData);

  useEffect(() => {
    const terms = searchTerm
      .split(",")
      .map((term) => term.trim().replace(/\s+/g, "").toLowerCase());
    console.log("Search Terms:", terms);

    let filtered = initialData;

    if (terms.every((term) => term === "")) {
      setFilteredData(initialData);
    } else {
      filtered = filtered.filter((item) => {
        return terms.every((term) => {
          return Object.values(item).some((val) =>
            String(val).replace(/\s+/g, "").toLowerCase().includes(term)
          );
        });
      });
    }

    console.log("Filtered Result:", filtered);
    setFilteredData(filtered);
  }, [searchTerm, initialData]);

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
