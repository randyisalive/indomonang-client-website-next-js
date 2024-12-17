"use client";
import React from "react";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { getLocalStorage } from "@/app/function/getLocalStorage";

const JsonDisplay = ({ data }) => {
  const debugStatus = getLocalStorage("app-debug");
  if (debugStatus === "true") {
    return (
      <div className=" w-full flex flex-col justify-center items-center my-10">
        <div className="p-4 mt-5 w-6 bg-gray-100 rounded-lg shadow-md max-h-72 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">JSON Data</h2>
          <pre className="whitespace-pre-wrap break-all bg-gray-200 p-4 rounded-lg">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      </div>
    );
  }
  return <></>;
};

export default JsonDisplay;
