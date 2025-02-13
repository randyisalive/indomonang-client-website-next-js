"use client";
import { useAccountSettingContext } from "@/app/admin/context/AccountSettingContext";
import HomeCard from "@/app/components/home/HomeCard";
import { Skeleton } from "primereact/skeleton";
import React from "react";
import PrintSection from "./PrintSection";
import TableComponentNew from "../../components/TableComponentNew";
import { useExpatriateListContext } from "@/app/admin/account/[profile]/[id]/context/ExpatriateListContext";
import { useDependentListContext } from "@/app/admin/account/[profile]/[id]/context/DependentListContext";
import { useVisitorsListContext } from "@/app/admin/account/[profile]/[id]/context/VisitorsListContext";

const DocumentRecordCard = () => {
  const { customer, isLoading } = useAccountSettingContext();
  const { expatriates } = useExpatriateListContext();
  const { dependent } = useDependentListContext();
  const { visitors } = useVisitorsListContext();
  const data = [
    {
      id: 1,
      count: parseInt(customer[1506]),
      sub: "Total Expatriate",
      link: "/admin/account/Vm0wd2QyVkhVWGhUV0docFVtMW9WRll3Wkc5V01WbDNXa1JTVjFKdGVEQmFWVll3VmpGYWMySkVUbHBXVmxwUVZqQmFTMlJIVmtWUmJVWlhWakZLU1ZkV1kzaFRNVWw0V2toT2FGSnRVbGhaYkdSdlpWWmFjMVp0UmxkTlZuQlhWRlpXVjJGSFZuRlJWR3M5/Expatriate",
    },
    {
      id: 2,
      count: parseInt(customer[1507]),
      sub: "Total Dependent",
      link: "/admin/account/Vm0wd2QyVkhVWGhUV0docFVtMW9WRll3Wkc5V01WbDNXa1JTVjFKdGVEQmFWVll3VmpGYWMySkVUbHBXVmxwUVZqQmFTMlJIVmtWUmJVWlhWakZLU1ZkV1kzaFRNVWw0V2toT2FGSnRVbGhaYkdSdlpWWmFjMVp0UmxkTlZuQlhWRlpXVjJGSFZuRlJWR3M5/Dependent",
    },
    {
      id: 3,
      count: parseInt(customer[1508]),
      sub: "Total Visitors",
      link: "/admin/account/Vm0wd2QyVkhVWGhUV0docFVtMW9WRll3Wkc5V01WbDNXa1JTVjFKdGVEQmFWVll3VmpGYWMySkVUbHBXVmxwUVZqQmFTMlJIVmtWUmJVWlhWakZLU1ZkV1kzaFRNVWw0V2toT2FGSnRVbGhaYkdSdlpWWmFjMVp0UmxkTlZuQlhWRlpXVjJGSFZuRlJWR3M5/Visitors",
    },
  ];
  console.log(expatriates);

  const expat_column = [
    {
      header: "Name",
      key: "1082",
    },
    {
      header: "Address",
      key: "1087",
    },
    {
      header: "Nationality",
      key: "1084",
    },
    {
      header: "Position",
      key: "1085",
    },
  ];
  const dependent_column = [
    {
      header: "Name",
      key: "1100",
    },
    {
      header: "Expat Name",
      key: "1317",
    },
    {
      header: "Relation",
      key: "1096",
    },
    {
      header: "Nationality",
      key: "1102",
    },
  ];
  const visitors_column = [
    {
      header: "Name",
      key: "1442",
    },
    {
      header: "Visa Type",
      key: "1462",
    },
    {
      header: "Purpose",
      key: "1463",
    },
    {
      header: "Nationality",
      key: "1444",
    },
  ];

  return (
    <div className="py-5 flex gap-5  justify-evenly flex-wrap">
      {isLoading ? (
        <>
          {data.map((i) => {
            return <HomeCard key={i.id} item={i} />;
          })}
          <PrintSection />
          <div className=" w-full flex flex-col gap-5">
            <TableComponentNew
              title="Expariate List"
              search_bar={false}
              data={expatriates}
              columns={expat_column}
              link={`/admin/account/Vm0wd2QyVkhVWGhUV0docFVtMW9WRll3Wkc5V01WbDNXa1JTVjFKdGVEQmFWVll3VmpGYWMySkVUbHBXVmxwUVZqQmFTMlJIVmtWUmJVWlhWakZLU1ZkV1kzaFRNVWw0V2toT2FGSnRVbGhaYkdSdlpWWmFjMVp0UmxkTlZuQlhWRlpXVjJGSFZuRlJWR3M5/Expatriate`}
            />
            <TableComponentNew
              title="Dependent List"
              search_bar={false}
              data={dependent}
              columns={dependent_column}
            />
            <TableComponentNew
              title="Visitors List"
              search_bar={false}
              data={visitors}
              columns={visitors_column}
            />
          </div>
        </>
      ) : (
        <>
          <div className="py-1 flex gap-5  justify-evenly flex-wrap">
            <Skeleton width="180px" height="180px" />
            <Skeleton width="180px" height="180px" />
            <Skeleton width="180px" height="180px" />
          </div>
          <div className="w-full flex justify-center items-center">
            <Skeleton width="200px" height="40px" />
          </div>
        </>
      )}
    </div>
  );
};

export default DocumentRecordCard;
