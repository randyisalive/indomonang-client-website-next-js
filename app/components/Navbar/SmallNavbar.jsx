"use client";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Profile from "./Profile";
import NavbarItems from "./NavbarItems";

const SmallNavbar = () => {
  const [status, setStatus] = useState(false);
  useEffect(() => {
    if (status) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [status]);

  return (
    <div className="flex sm:hidden  ">
      <motion.i
        whileTap={{ scale: 0.889 }}
        className="pi pi-bars text-xl cursor-pointer"
        onClick={() => setStatus(!status)}
      ></motion.i>
      <AnimatePresence>
        {" "}
        {status && (
          <>
            <div
              onClick={() => setStatus(false)}
              className="absolute w-full bg-black opacity-30 top-0 z-40 min-h-svh right-0"
            ></div>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "50%" }}
              exit={{ width: 0 }}
              className=" shadow-xl absolute z-50 bg-white w-1/2 h-full opacity-1 right-0 top-0"
            >
              <div className="p-3">
                <motion.span
                  className=" text-3xl flex items-center gap-3 font-bold "
                  onClick={() => setStatus(false)}
                >
                  <motion.i
                    initial={{ left: 0 }}
                    animate={{ left: 10 }}
                    className="pi pi-angle-left text-xl "
                  ></motion.i>
                  Navigation
                </motion.span>
                <div className="flex flex-col gap-5">
                  <Profile />
                  <NavbarItems onClick={() => setStatus(false)} />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SmallNavbar;
