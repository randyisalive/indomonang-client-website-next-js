"use client";
import React, { useRef, useState, useEffect } from "react";
import { Avatar } from "primereact/avatar";
import { AnimatePresence, motion } from "framer-motion";
import { decryptMessage } from "@/app/function/decryptor";
import { useRouter } from "next/navigation";

function Profile({ Logout = () => {}, keys = "", image = {} }) {
  const [clicked, setClicked] = useState(false);
  const router = useRouter();
  const items = [
    {
      label: "My Account",
      icon: "pi pi-cog",
      command: () => {
        router.push("admin/account");
      },
      permission: ["Admin", "Client", "Developer", ""],
    },

    {
      permission: ["Admin", "Client", "Developer", ""],
      separator: true,
    },
    {
      label: "Logout",
      permission: ["Admin", "Client", "Developer", ""],
      icon: "pi pi-sign-out",
      command: () => {
        Logout();
      },
    },
  ];

  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setClicked(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <motion.div
      ref={ref}
      className="d-flex justify-content-end m-3 flex-column"
      initial={{ width: "auto", minWidth: "200px" }}
      animate={clicked ? { minWidth: "200px" } : { minWidth: "200px" }}
      style={{ width: "auto", minWidth: "100px" }}
    >
      <motion.div
        whileHover={{ backgroundColor: "#e5e7eb" }}
        className="d-flex w-100 px-2 rounded-5 align-items-center py-2"
        onClick={() => setClicked(!clicked)}
        style={{
          backgroundColor: "#ffffff",
          position: "relative",
          justifyContent: "space-between",
          userSelect: "none",
        }}
      >
        <Avatar
          className="rounded-8"
          icon="pi pi-user"
          size="medium"
          style={{ backgroundColor: "white" }}
          image={image.content}
          imageFallback="none.jpg"
          imageAlt={image.filename}
        />
        <motion.i
          className="pi pi-angle-down"
          style={{ fontSize: "15px" }}
          initial={{ rotate: 90 }}
          animate={clicked ? { rotate: 0 } : { rotate: 90 }}
        />
        <AnimatePresence>
          {clicked && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="w-100 rounded-3 card py-2"
              style={{
                position: "absolute",
                top: 60,
                left: 0,
                fontSize: "13px",
                zIndex: 1000,
              }}
            >
              {items.map((x, index) => {
                if (
                  x.permission.includes(
                    decryptMessage(localStorage.getItem("role"), keys)
                  )
                ) {
                  return (
                    <>
                      <motion.div
                        key={index}
                        className="d-flex align-items-center gap-2 pb-1 px-2 pt-1"
                        whileHover={
                          !x.separator ? { backgroundColor: "#E5E7EB" } : {}
                        }
                        onClick={x.command}
                        style={
                          !x.separator
                            ? {
                                height: "50%",
                                cursor: "pointer",
                                backgroundColor: "#ffffff",
                              }
                            : { height: "50%" }
                        }
                      >
                        {x.separator ? (
                          <div className="my-2 w-100 border-bottom"></div>
                        ) : (
                          <>
                            <i className={x.icon}></i>
                            <p>{x.label}</p>
                          </>
                        )}
                      </motion.div>
                    </>
                  );
                }
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

export default Profile;
