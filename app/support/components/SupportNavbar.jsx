"use client";
import React from "react";
import { support_navbar_data } from "../data/support_navbar_data";
import { motion } from "framer-motion";
import Link from "next/link";

const SupportNavbar = () => {
  return (
    <div className="p-3 text-sm flex gap-3 items-center sticky top-0 bg-white z-10">
      <ul className="flex ">
        {support_navbar_data.map((i) => {
          return (
            <Link
              href={i.link}
              className={`${i.text === "/" ? "cursor-default" : ""}`}
            >
              <motion.li
                whileHover={
                  i.text !== "/"
                    ? { backgroundColor: "#EDEDED" }
                    : { backgroundColor: "#ffffff" }
                }
                style={{ backgroundColor: "#ffffff" }}
                key={i.id}
                className={`flex items-center gap-2 p-1 rounded-lg ${
                  i.text !== "/" ? "cursor-pointer" : ""
                }`}
              >
                <i className={i.icon}></i>
                <p>{i.text}</p>
              </motion.li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default SupportNavbar;
