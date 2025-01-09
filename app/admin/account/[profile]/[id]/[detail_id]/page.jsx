"use client";
import React from "react";
import DataCard from "./components/ui/DataCard";
import DependentPage from "./components/DependentPage";
import { useDependentListContext } from "../context/DependentListContext";

const DetailPage = () => {
  const { dependent } = useDependentListContext();

  return (
    <div className="mx-10 lg:mx-0">
      <DependentPage dependent_data={dependent} />
    </div>
  );
};

export default DetailPage;
