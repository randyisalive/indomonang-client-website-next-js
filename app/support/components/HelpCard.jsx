"use client";
import React from "react";
import { motion } from "framer-motion";

const HelpCard = () => {
  return (
    <motion.div
      whileHover={{ backgroundColor: " #FBFBFB" }}
      style={{ backgroundColor: "#ffffff" }}
      className=" p-1 border shadow rounded cursor-pointer"
    >
      <img
        src="https://www.hollywoodreporter.com/wp-content/uploads/2012/12/img_logo_blue.jpg?w=1440&h=810&crop=1"
        alt="asdsad"
        width={300}
        height={200}
        className="border-0 bg-white"
      />
      <div className="flex items-center gap-2 p-2 ">
        <p>📄</p>
        <p>1. Get Started</p>
      </div>
    </motion.div>
  );
};

export default HelpCard;
