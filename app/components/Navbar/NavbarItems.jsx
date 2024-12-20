"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

const NavbarItems = ({ onClick = () => {} }) => {
  const navbar_data = [
    {
      id: 0,
      title: "Home",
      dropdown: false,
      link: "/",
      content: [],
    },
    {
      id: 1,
      title: "Layanan",
      dropdown: false,
      content: [
        { id: 0, text: "WO List", link: "/your-orders" },
        { id: 1, text: "", link: "", line: true },
      ],
    },
    {
      id: 2,
      title: "Billing",
      dropdown: false,
      content: [
        { id: 4, text: "Billing List", link: "/billing" },
        { id: 4, text: "Invoices", link: "/invoice" },
        { id: 5, text: "", link: "", line: true },
        { id: 6, text: "Pesan Layanan Saya", link: "" },
        { id: 7, text: "Pesan Addons", link: "" },
      ],
    },
    {
      id: 3,
      title: "Upload Documents",
      link: "/upload",
      dropdown: false,
      content: [],
    },
    { id: 4, title: "Buat Tiket", dropdown: false, content: [] },
  ];

  const [items, setItems] = useState(navbar_data);

  const router = useRouter();

  const handleItems = (id) => {
    setItems((prev) =>
      prev.map((x) =>
        x.id === id
          ? { ...x, dropdown: !x.dropdown }
          : { ...x, dropdown: false }
      )
    );
  };

  // click outside event
  const cardRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (cardRef.current && !cardRef.current.contains(e.target)) {
        setItems((prev) => prev.map((x) => ({ ...x, dropdown: false })));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {items.map((item) => (
        <motion.div
          key={item.id}
          style={
            item.dropdown
              ? { borderBottom: "3px solid #1062fe" }
              : { borderBottom: "3px solid #ffffff" }
          }
          className="flex items-center  bg-white p-3 pb-2 pt-0 relative gap-2"
        >
          <motion.span
            style={item.dropdown ? { color: "#1062FE" } : { color: "#000" }}
            whileHover={{ color: "#1062FE" }}
            className="bg-dark cursor-pointer"
            onClick={() => handleItems(item.id)}
          >
            {item.link ? (
              <Link href={item.link} onClick={onClick}>
                {item.title}
              </Link>
            ) : (
              item.title
            )}
          </motion.span>
          {item.content.length > 0 ? (
            <>
              <motion.i
                style={
                  item.dropdown ? { color: "#1062FE" } : { color: "#1f2937" }
                }
                animate={item.dropdown ? { rotate: 90 } : {}}
                initial={{ rotate: 0 }}
                className={`pi pi-angle-right text-xs `}
              ></motion.i>
              <AnimatePresence>
                {item.dropdown && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    ref={cardRef}
                    className="absolute z-50 w-64 text-xs top-full bg-white border rounded-lg mt-3"
                  >
                    {item.content.map((content, index) => (
                      <React.Fragment key={index}>
                        {content.line ? (
                          <hr className="m-0 p-0" />
                        ) : (
                          <motion.div
                            key={`ct-${index}`}
                            className="w-full"
                            style={{ cursor: "pointer" }}
                            whileHover={{ color: "#1062FE", x: 10 }}
                            onClick={() => {
                              handleItems(item.id);
                              router.push(content.link);
                            }}
                          >
                            <Link href={content.link} onClick={onClick}>
                              <div className="py-3 px-3 w-full font-bold ">
                                {content.text}
                              </div>
                            </Link>
                          </motion.div>
                        )}
                      </React.Fragment>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          ) : null}
        </motion.div>
      ))}
    </>
  );
};

export default NavbarItems;
