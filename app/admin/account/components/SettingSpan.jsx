"use client";
import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const SettingSpan = () => {
  const router = useRouter();
  return (
    <motion.span
      onClick={() => router.push("/")}
      whileHover={`hover`}
      className=" font-bold text-5xl flex items-center gap-3 mb-5 cursor-pointer"
    >
      <motion.i
        variants={{ hover: { x: -10 } }}
        className="pi pi-angle-left text-2xl"
      ></motion.i>
      <motion.span variants={{ hover: { textDecoration: "underline" } }}>
        Settings
      </motion.span>
    </motion.span>
  );
};

export default SettingSpan;
