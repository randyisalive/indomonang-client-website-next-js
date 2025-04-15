"use client";
import { Rating } from "primereact/rating";
import React, { useState } from "react";
import { motion } from "framer-motion";

const OrderDetailsCard = ({ data = [], title = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dummy_data = [
    {
      id: 0,
      rows: [
        { title: "Company", content: "Tech Innovations" },
        {
          title: "Service",
          content:
            "APPROVAL DITJEN IMIGRASI (ALIH STATUS ITK - ITAS) (SPONSOR PERUSAHAAN)",
        },
        { title: "Reference Number", content: "ORD123456" },
        { title: "City / Country", content: "San Francisco, USA" },
        {
          title: "Priority",
          content: "rahmandi.madenda2024@student.president.ac.id",
        },
        {
          title: "Ratings",
          content: (
            <>
              <Rating disabled cancel={false} value={2} />
            </>
          ),
        },
      ],
    },
  ];
  const handleOpen = () => setIsOpen((prev) => !prev);
  return (
    <div
      className="bg-white flex flex-col w-full rounded-[12px] ] p-[24px] gap-[12px]"
      style={{ border: "1px solid #EAEAEA" }}
    >
      <div className="flex justify-between items-center ">
        <span className=" font-bold " style={{ fontSize: "28px" }}>
          {title}
        </span>
        <motion.i
          initial={{ rotate: 0 }}
          animate={{ rotate: isOpen ? 90 : 0 }}
          className="pi pi-angle-up"
          onClick={() => handleOpen()}
          style={{ fontSize: "20px" }}
        ></motion.i>
      </div>
      <motion.div
        initial={{ height: "auto" }}
        animate={{ height: isOpen ? 0 : "auto" }}
        exit={{ height: 0 }}
        className="min-w-full flex flex-col overflow-y-clip"
        style={{
          backgroundColor: "#FBFBFB",
          borderRadius: "8px",
          border: "1px solid #EAEAEA",
        }}
      >
        {data.map((i) => {
          return (
            <div
              key={i.id}
              className="w-full flex flex-col text-base gap-[10px] py-[16px] px-[12px] overflow-hidden"
              style={{ padding: "12px 16px" }}
            >
              {i.rows.map((x) => {
                return (
                  <React.Fragment>
                    <div className="w-full flex" style={{ gap: "8px" }}>
                      <span
                        className=" font-normal"
                        style={{ width: "190px", color: "#919CA7" }}
                      >
                        {x.title}
                      </span>
                      <span style={{ color: "#919CA7" }}>:</span>
                      <span className="w-full font-normal flex items-center">
                        {x.content}
                      </span>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default OrderDetailsCard;
