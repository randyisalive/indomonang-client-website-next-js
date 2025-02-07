"use client";
import { useAccountSettingContext } from "@/app/admin/context/AccountSettingContext";
import HomeCard from "@/app/components/home/HomeCard";
import { Skeleton } from "primereact/skeleton";
import React from "react";
import PrintSection from "./PrintSection";

const DocumentRecordCard = () => {
  const { customer, isLoading } = useAccountSettingContext();
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

  return (
    <div className="py-5 flex gap-5  justify-evenly flex-wrap">
      {isLoading ? (
        <>
          {data.map((i) => {
            return <HomeCard key={i.id} item={i} />;
          })}
          <PrintSection />
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
