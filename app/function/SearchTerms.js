import { useState, useEffect } from "react";

const SearchTerms = (
  initialData,
  searchTerm = "",
  setSearchTerm = () => {}
) => {
  const [filteredData, setFilteredData] = useState(initialData);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredData(initialData);
    } else {
      const lowercasedTerm = searchTerm.toLowerCase();
      const result = initialData.filter((item) =>
        Object.values(item).some((val) =>
          String(val).toLowerCase().includes(lowercasedTerm)
        )
      );
      setFilteredData(result);
    }
  }, [searchTerm]);

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
