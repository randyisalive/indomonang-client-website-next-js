"use client";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import ExpatriateList from "./components/ExpatriateList";
import DependentList from "./components/DependentList";
import VisitorsList from "./components/VisitorsList";
import DocumentsList from "./components/DocumentsList";

const AccountDetailPage = () => {
  const { id } = useParams();
  return (
    <div className="my-3 overflow-x-auto mx-10 md:mx-0">
      {id === "Expatriate" && <ExpatriateList />}
      {id === "Dependent" && <DependentList />}
      {id === "Visitors" && <VisitorsList />}
      {id === "Documents" && <DocumentsList />}
    </div>
  );
};

export default AccountDetailPage;
