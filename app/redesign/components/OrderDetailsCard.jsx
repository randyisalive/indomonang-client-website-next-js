import { Rating } from "primereact/rating";
import React from "react";

const OrderDetailsCard = () => {
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
  return (
    <div
      className="bg-white flex flex-col"
      style={{
        width: "978px",
        padding: "24px 24px",
        gap: "12px",
        border: "1px solid #EAEAEA",
        borderRadius: "12px",
      }}
    >
      <div className="flex justify-between items-center ">
        <span className=" font-bold " style={{ fontSize: "28px" }}>
          Order Details
        </span>
        <i className="pi pi-angle-up" style={{ fontSize: "15px" }}></i>
      </div>
      <div
        className="min-w-full flex flex-col"
        style={{
          backgroundColor: "#FBFBFB",
          borderRadius: "8px",
          border: "1px solid #EAEAEA",
        }}
      >
        {dummy_data.map((i) => {
          return (
            <div
              key={i.id}
              className="w-full flex flex-col text-base"
              style={{ gap: "10px", padding: "12px 16px" }}
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
      </div>
    </div>
  );
};

export default OrderDetailsCard;
