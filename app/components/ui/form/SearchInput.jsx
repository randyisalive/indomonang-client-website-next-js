"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";

const SearchInput = ({
  name = "",
  search = "",
  setSearch = () => {},
  className = {},
  placeholder = "Search",
  width = "w-1/4",
}) => {
  const clearSearch = () => {
    setSearch("");
  };
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className={`relative flex items-center ${width}`}>
      <div className="flex left-0 absolute ms-3">
        <i className="pi pi-search"></i>
      </div>
      <input
        type="text"
        name={name}
        onChange={(e) => handleSearch(e)}
        value={search}
        placeholder={placeholder}
        className={`pl-10 py-2 border-2 focus:border-blue-500 focus:outline-none w-full ${className}`}
      />
      <div className="absolute  text-xs gap-2 flex items-center right-0 me-3">
        <AnimatePresence>
          {search.length > 0 ? (
            <motion.i
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pi pi-times text-xs text-gray-600 hover:cursor-pointer"
              onClick={() => clearSearch()}
            ></motion.i>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SearchInput;
