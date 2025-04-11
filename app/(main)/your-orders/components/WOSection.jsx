"use client";
import React from "react";
import { useWoContext } from "../context/WoContext";
import { motion } from "framer-motion";

const WOSection = () => {
  const { wo, isLoading, handleWODialog, handleRating } = useWoContext();
  const wo_drafting = wo.filter((i) => i.status.value === 166).length;
  const wo_open = wo.filter((i) => i.status.value === 88).length;
  const wo_checking = wo.filter((i) => i.status.value === 212).length;
  const wo_processing = wo.filter((i) => i.status.value === 198).length;
  const wo_finished = wo.filter((i) => i.status.value === 165).length;
  const wo_cancelled = wo.filter((i) => i.status.value === 199).length;

  // avg ratings
  const avg_ratings = () => {
    let total = 0;
    let wo_len = 0;
    for (const i of wo) {
      if (parseInt(i.rating) && i.status.value === 165) {
        total += parseInt(i.rating);
        wo_len += 1;
      } else {
        total += 0;
        wo_len += 0;
      }
    }
    return isNaN((total / wo_len).toFixed(1)) ? 0 : (total / wo_len).toFixed(1);
  };

  const wo_card_datas = [
    { id: 0, title: "AVG Ratings", num: avg_ratings(), img: "" },
    { id: 1, title: "Drafting", num: wo_drafting, img: "" },
    { id: 2, title: "Open", num: wo_open, img: "" },
    { id: 3, title: "Checking", num: wo_checking, img: "" },
    { id: 4, title: "Processing", num: wo_processing, img: "" },
    { id: 5, title: "Finished", num: wo_finished, img: "" },
    { id: 6, title: "Cancelled", num: wo_cancelled, img: "" },
  ];

  return (
    <div className="flex flex-wrap lg:justify-start justify-center gap-[24px]">
      {wo_card_datas.map((i) => {
        return (
          <motion.div
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
              <div
                className=" absolute   left-1/3 flex justify-center items-center rounded-full"
                style={{
                  width: "128px",
                  height: "128px",
                  backgroundColor: "#FFF8F8",
                }}
              >
                <i
                  className="pi pi-star-fill"
                  style={{ fontSize: "128px", color: "#FFDCDE" }}
                ></i>
              </div>
              <span className=" font-bold z-20" style={{ color: "#919CA7" }}>
                {i.title}
              </span>
              <span className=" font-bold" style={{ fontSize: "28px" }}>
                {i.num}
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default WOSection;
