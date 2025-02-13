"use client";
import { useAccountDataContext } from "@/app/admin/context/AccountDataContext";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import WebButton from "../ui/WebButton";
import DebugButton from "./DebugButton";

const ProfileDropdown = () => {
  const cm = useRef(null);
  const [isOpen, setIsOpen] = useState(false); // click outside event
  const cardRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (cardRef.current && !cardRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [cardRef, isOpen, cm]);

  const { accounts, role } = useAccountDataContext();
  const Logout = () => {
    localStorage.clear();
    //router.push("/login");
    window.location.href = "/login";
  };
  const user_list = [
    {
      id: 0,
      link: "/admin/account",
      icon: "pi pi-user",
      title: "My Account",
      function: () => {},
    },
    {
      id: 1,
      link: "/",
      icon: "pi pi-sign-out",
      title: "Sign out",
      function: () => {
        Logout();
      },
    },
  ];

  return (
    <div className=" relative w-full justify-end flex">
      <div
        className="flex gap-1 items-center p-2   w-full justify-end "
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex gap-1 items-center cursor-pointer">
          <p>{accounts.username}</p>
          <i className={`pi pi-angle-right`}></i>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={cardRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="card flex flex-col min-w-full h-fit z-10 md:items-center shadow-md rounded-xl overflow-y-auto top-full right-0 absolute text-sm bg-white"
          >
            <div className="font-bold flex w-full justify-between p-3 border-b">
              Actions
            </div>
            <div className="h-full overflow-y-auto w-full">
              <ul className="">
                {user_list.map((item) => {
                  return (
                    <Link
                      href={item.link}
                      key={item.id}
                      onClick={item.function}
                    >
                      <li className="hover:bg-gray-100 cursor-pointer p-3 text-sm w-full flex items-center gap-3">
                        <i className={item.icon}></i>
                        <p>{item.title}</p>
                      </li>
                    </Link>
                  );
                })}
              </ul>
            </div>
            {role === "Admin" && (
              <div className="font-bold flex w-full justify-between p-3 border-t">
                <div className="flex gap-1 w-full items-center justify-between">
                  <DebugButton />
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileDropdown;
