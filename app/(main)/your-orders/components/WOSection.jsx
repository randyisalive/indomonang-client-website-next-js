"use client";
import React from "react";
import { useWoContext } from "../context/WoContext";
import { motion } from "framer-motion";
import Image from "next/image";
import star from "../../../../public/solar_star-bold-duotone.png";

const WOSection = () => {
  const { wo, isLoading, handleWODialog, handleRating } = useWoContext();

  // avg ratings
  const avg_ratings = () => {
    let total = 0;
    let wo_len = 0;
    if (wo.data?.length > 0) {
      for (const i of wo.data) {
        if (parseInt(i.rating)) {
          total += parseInt(i.rating);
          wo_len += 1;
        } else {
          total += 0;
          wo_len += 0;
        }
      }
      return isNaN((total / wo_len).toFixed(1))
        ? 0
        : (total / wo_len).toFixed(1);
    }
  };

  const wo_card_datas = [
    { id: 0, title: "AVG Ratings", num: avg_ratings(), img: "" },
  ];

  return (
    <div className="flex flex-wrap lg:justify-start justify-center gap-[24px]">
      {!isLoading &&
        wo_card_datas.map((i) => {
          return (
            <motion.div
              key={i.id}
              className="flex bg-white z-10 shadow overflow-clip justify-center items-center"
              style={{
                padding: "32px 24px",
                gap: "24px",
                borderRadius: "12px",
                border: "1px solid #EAEAEA",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div
                className="flex bg-white z-10 flex-col relative "
                style={{ gap: "12px", width: "166.86px" }}
              >
                <span className=" font-bold z-20" style={{ color: "#919CA7" }}>
                  {i.title}
                </span>
                <span className=" font-bold z-20" style={{ fontSize: "28px" }}>
                  {i.num}
                </span>
                <div className=" absolute right-0 flex justify-center items-center">
                  <Image src={star} width={128} height={128} />
                </div>
              </div>
            </motion.div>
          );
        })}
    </div>
  );
};

export default WOSection;
