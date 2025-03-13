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
      title: "My Orders",
      dropdown: false,
      link: "/your-orders",
      content: [
        /*  { id: 0, text: "Your Orders", link: "/your-orders" },
        { id: 2, text: "Billings List", link: "/billing" },
        { id: 2, text: "Payment History", link: "/invoice" },

        { id: 3, text: "", link: "", line: true }, */
      ],
    },
    {
      id: 2,
      title: "My Document",
      dropdown: false,
      content: [
        { id: 0, text: "Upload", link: "/upload" },
        { id: 1, text: "Records", link: "/record" },
      ],
    },

    {
      id: 6,
      title: "My Finance",
      dropdown: false,
      content: [
        {
          id: 2,
          text: "Quotations",
          link: "/quotations",
        },
        {
          id: 0,
          text: "Billing List",
          link: `/billing`,
        },
        {
          id: 1,
          text: "Payment History",
          link: "/invoice",
        },
      ],
    },
    {
      id: 7,
      title: "Redesign",
      dropdown: false,
      link: "/redesign",
      content: [],
    },
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
          className="flex items-center  bg-white  relative "
          style={{ gap: "8px" }}
        >
          <motion.span
            style={item.dropdown ? { color: "#1062FE" } : { color: "#000" }}
            whileHover={{ color: "#1062FE" }}
            className="cursor-pointer"
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
