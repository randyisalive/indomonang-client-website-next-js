"use client";
import HomeCard from "@/app/components/home/HomeCard";
import React from "react";
import useHomeCardContainerData from "../hooks/useHomeCardContainerData";

const HomeCardContainer = () => {
  const { cardData } = useHomeCardContainerData();

  return (
    <div className="w-full  justify-center  flex gap-3 flex-wrap sm:justify-evenly ">
      {cardData.map((item) => {
        return <HomeCard key={`${item.id}`} item={item} />;
      })}
    </div>
  );
};

export default HomeCardContainer;
