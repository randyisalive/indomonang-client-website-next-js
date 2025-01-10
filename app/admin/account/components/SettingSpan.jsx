"use client";
import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { BTOA } from "@/app/function/decryptor";
import Link from "next/link";

const SettingSpan = () => {
  const router = useRouter();
  const nav_data = [
    {
      id: 0,
      text: "Profile Settings",
      link: `/admin/account`,
    },
    {
      id: 1,
      text: "Account Detail",
      link: `/admin/account/${BTOA("account")}`,
    },
    {
      id: 2,
      text: "Last Login",
      link: `/admin/account/${BTOA("last-login")}`,
    },
  ];

  return (
    <>
      <div className=" block ">
        <motion.span
          onClick={() => router.push("/")}
          whileHover={`hover`}
          className=" font-bold text-5xl flex items-center gap-3 mb-5 cursor-pointer"
        >
          <motion.i
            variants={{ hover: { x: -10 } }}
            className=" hidden lg:block pi pi-angle-left text-2xl"
          ></motion.i>
          <motion.span
            className=" block ms-5 lg:ms-0"
            variants={{ hover: { textDecoration: "underline" } }}
          >
            Settings
          </motion.span>
        </motion.span>
        <ul className="flex  w-full lg:w-0  lg:flex-col gap-3 ms-5">
          {nav_data.map((item) => {
            return (
              <Link key={item.id} className=" w-fit" href={item.link} passHref>
                <motion.li
                  whileTap={{ scale: 0.889 }}
                  className={` shadow-md hover:text-blue-500 border p-3 rounded-full w-fit cursor-pointer`}
                >
                  {item.text}
                </motion.li>
              </Link>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default SettingSpan;
