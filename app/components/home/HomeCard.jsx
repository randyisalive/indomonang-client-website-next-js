"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import NumberFlow from "@number-flow/react";
import { useAccountDataContext } from "@/app/admin/context/AccountDataContext";

const HomeCard = ({ item = {} }) => {
  const nav = useRouter();
  const [count, setCount] = useState(Math.random() * 100);

  useEffect(() => {
    setCount(item.count);
  }, [item.count]);

  return (
    <div
      className="border flex w-1/3 justify-between shadow"
      style={{
        padding: "24px 32px",
        gap: "12px",
        borderRadius: "12px",
        background: `linear-gradient(to bottom,#FFFFFF 50%,${item.color} 100%)`,
      }}
    >
      <div className="flex flex-col" style={{ gap: "12px" }}>
        <span className=" font-semibold" style={{ color: "#919CA7" }}>
          {item.sub}
        </span>
        <span className=" font-bold" style={{ fontSize: "28px" }}>
          <NumberFlow value={item.count} />
        </span>
      </div>
      <div className=" flex items-center">
        <img src={`${item.icon}`} width={60} height={60} alt="" />
      </div>
    </div>
  );
};

export default HomeCard;
