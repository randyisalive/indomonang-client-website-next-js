"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { motion } from "framer-motion";
import useTokenData from "@/app/hooks/useTokenData";
import WebButton from "../ui/WebButton";

const HomeCard = ({ item = {} }) => {
  const nav = useRouter();
  return (
    <motion.div
      whileHover={{ boxShadow: "0px 0px 10px 1px #9ca3af " }}
      key={`homeCard-${item.id}`}
      style={{ boxShadow: "0px 0px 10px 0px #ffffff" }}
      className="border  flex gap-3 flex-col w-44 h-44 rounded-lg cursor-pointer"
      onClick={() => nav.push(`${item.link}`)}
    >
      <span className="w-full text-end mt-3 p-2">
        <i className={`${item.icon}`}></i>
      </span>
      <div className="h-full gap-2 flex-col flex  items-center w-full text-end">
        <p className="text-6xl text-blue-800">{item.count}</p>
        <p>{item.sub}</p>
      </div>
    </motion.div>
  );
};

export default HomeCard;
