"use client";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import ExpatriateList from "./components/ExpatriateList";
import DependentList from "./components/DependentList";

const AccountDetailPage = () => {
  const { id } = useParams();
  return (
    <div className="my-3 overflow-x-auto">
      {id === "Expatriate" && <ExpatriateList />}
      {id === "Dependent" && <DependentList />}
    </div>
  );
};

export default AccountDetailPage;
