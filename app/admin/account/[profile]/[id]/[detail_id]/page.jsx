"use client";
import React from "react";
import DataCard from "./components/ui/DataCard";
import DependentPage from "./components/DependentPage";
import {
  DependentListProvider,
  useDependentListContext,
} from "../context/DependentListContext";
import { useParams } from "next/navigation";
import ExpatriatePage from "./components/ExpatriatePage";
import { useExpatriateListContext } from "../context/ExpatriateListContext";
import VisitorsPage from "./components/VisitorsPage";
import { useVisitorsListContext } from "../context/VisitorsListContext";

const DetailPage = () => {
  const { id, detail_id } = useParams();
  const { dependent } = useDependentListContext();
  const { expatriates } = useExpatriateListContext();
  const { visitors } = useVisitorsListContext();

  return (
    <div className="mx-10 lg:mx-0">
      {id === "Dependent" && <DependentPage dependent={dependent} />}
      {id === "Expatriate" && (
        <ExpatriatePage expatriate={expatriates} detail_id={detail_id} />
      )}
      {id === "Visitors" && (
        <VisitorsPage visitors={visitors} detail_id={detail_id} />
      )}
    </div>
  );
};

export default DetailPage;
