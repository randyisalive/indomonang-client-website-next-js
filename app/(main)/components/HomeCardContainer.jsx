"use client";
import HomeCard from "@/app/components/home/HomeCard";
import React from "react";
import useHomeCardContainerData from "../hooks/useHomeCardContainerData";
import { ProgressSpinner } from "primereact/progressspinner";
import { Skeleton } from "primereact/skeleton";
import { AnimatePresence, motion } from "framer-motion";

const HomeCardContainer = () => {
  const { cardData, isLoading } = useHomeCardContainerData();

  return (
    <>
      <AnimatePresence>
        {isLoading === 0 ? (
          <motion.div className="  w-full flex gap-5">
            <div className="w-1/4">
              <Skeleton height="200px" className=" rounded-lg" />
            </div>
            <div className="w-1/4">
              <Skeleton height="200px" className=" rounded-lg" />
            </div>
            <div className="w-1/4">
              <Skeleton height="200px" className=" rounded-lg" />
            </div>
            <div className="w-1/4">
              <Skeleton height="200px" className=" rounded-lg" />
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full  justify-center  flex gap-3 flex-wrap sm:justify-evenly "
          >
            {cardData.map((item) => {
              return <HomeCard key={`${item.id}`} item={item} />;
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HomeCardContainer;
