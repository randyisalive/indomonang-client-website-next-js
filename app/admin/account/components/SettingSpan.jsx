"use client";
import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { BTOA } from "@/app/function/decryptor";
import Link from "next/link";

const SettingSpan = () => {
  const router = useRouter();
  const { pathname } = router;
  console.log(router);
  const nav_data = [
    {
      id: 0,
      text: "Profile Settings",
      link: `/admin/account`,
    },
    {
      id: 1,
      text: "Account Settings",
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
      <ul className="flex flex-col gap-3 ms-5">
        {nav_data.map((item) => {
          return (
            <motion.li
              key={item.id}
              whileTap={{ scale: 0.889 }}
              className={` shadow-md border p-3 rounded-full w-fit cursor-pointer`}
            >
              <Link href={item.link}>{item.text}</Link>{" "}
            </motion.li>
          );
        })}
      </ul>
    </>
  );
};

export default SettingSpan;
