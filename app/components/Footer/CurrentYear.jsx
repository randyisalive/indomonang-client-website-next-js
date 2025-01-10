"use client";
import React from "react";

const CurrentYear = () => {
  const year = new Date().getFullYear();
  return <>{year}</>;
};

export default CurrentYear;
