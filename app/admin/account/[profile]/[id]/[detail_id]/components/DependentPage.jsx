"use client";
import React from "react";
import DataCard from "./ui/DataCard";
import { useDependentListContext } from "../../context/DependentListContext";
import { useParams, useRouter } from "next/navigation";

const DependentPage = ({ dependent_data = [] }) => {
  const { detail_id } = useParams();
  const filteredDependent = dependent_data.filter(
    (item) => item.id === detail_id
  );
  return (
    <div className="flex flex-col gap-3 md:flex md:flex-row flex-wrap">
      <DataCard
        icon="pi pi-send"
        title="PASSPORT"
        type="passport"
        data={filteredDependent}
      />
      <DataCard
        icon="pi pi-credit-card"
        title="VISA"
        type="visa"
        data={filteredDependent}
      />
      <DataCard
        icon="pi pi-credit-card"
        title="KITAS"
        type="kitas"
        data={filteredDependent}
      />
      <DataCard
        icon="pi pi-credit-card"
        title="MERP"
        type="merp"
        data={filteredDependent}
      />
    </div>
  );
};

export default DependentPage;
