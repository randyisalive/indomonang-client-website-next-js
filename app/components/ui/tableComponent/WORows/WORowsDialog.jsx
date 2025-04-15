"use client";
import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Timeline } from "primereact/timeline";
import parse from "html-react-parser";

import { Rating } from "primereact/rating";
import { useWoContext } from "@/app/(main)/your-orders/context/WoContext";
import { useWoDetailContext } from "@/app/(main)/your-orders/context/WoDetailContext";
import { Message } from "primereact/message";
import parser from "html-react-parser";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import OrderDetailsCard from "@/app/redesign/components/OrderDetailsCard";
import StatusBadge from "../StatusBadge";
import Status from "@/app/redesign/components/Status";

const WORowsDialog = ({ visible = false, onHide = () => {} }) => {
  // params
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { wo } = useWoContext();
  const { download_attachments, processedData, filteredCourier } =
    useWoDetailContext();
  const delivery_status = [
    { id: 0, text: "Open", bg_color: "#00C49A" },
    { id: 1, text: "On Delivery", bg_color: "#9cec5b" },
    { id: 2, text: "Closed", bg_color: "#BFC9CA" },
    { id: 3, text: "Canceled", bg_color: "#B6244F" },
  ];

  const wo_filtered = wo.filter((item) => item.id == id);
  console.log(filteredCourier);
  const events = [
    {
      status: "Open",
      icon: "pi pi-cart-plus",
      color: "#00C49A",
    },
    {
      status: "Drafting",
      icon: "pi pi-pencil",
      color: "#3F612D",
    },
    {
      status: "Checking",
      icon: "pi pi-search",
      color: "#8D80AD",
    },
    {
      status: "Processing",
      icon: "pi pi-spinner",
      color: "#192bc2",
    },
    {
      status: "Finished",
      icon: "pi pi-check",
      color: "#223FFF",
    },
  ];

  const customizedMarker = (item) => {
    const markerColor =
      item.status === wo_filtered[0]?.status?.text ? item.color : "#e5e7eb";
    return (
      <span
        className="flex w-[32px] h-[32px] rounded-full items-center justify-center text-white border-circle  shadow-sm z-10"
        style={{ backgroundColor: markerColor }}
      >
        <Image src={"/checkmark (2).png"} width={16} height={12} alt="ada" />
        {/*  <i
          className={`${item.icon} w-[24px] h-[24px]  flex items-center justify-center`}
        ></i> */}
      </span>
    );
  };

  // dropdown
  const [dropdown, setDropdown] = useState({
    order: false,
    applicant: false,
    delivery: false,
  });

  // card dialog data
  const order_details = [
    {
      id: 0,
      rows: [
        { title: "Reference Number", content: wo_filtered[0]?.ref_num },

        { title: "Company", content: wo_filtered[0]?.company },
        {
          title: "Service",
          content: wo_filtered[0]?.service,
        },
        { title: "City / Country", content: wo_filtered[0]?.city },
        {
          title: "Priority",
          content: wo_filtered[0]?.priority.text,
        },
        {
          title: "Ratings",
          content: (
            <>
              <Rating disabled cancel={false} value={wo_filtered[0]?.rating} />
            </>
          ),
        },
      ],
    },
  ];
  const applicant_info = [
    {
      id: 0,
      rows: [
        { title: "Name", content: wo_filtered[0]?.applicant },
        {
          title: "Nationality",
          content: wo_filtered[0]?.nationality,
        },
        { title: "Job Title", content: wo_filtered[0]?.job_title },
        {
          title: "Other Applicants",
          content: <>{parse(wo_filtered[0]?.other_expat_list)}</>,
        },
      ],
    },
  ];
  const delivery_info = filteredCourier?.map((item, index) => {
    // Get status data once per item
    const currentStatus = item[1547];
    const filteredStatus = delivery_status.find(
      (x) => x.text === currentStatus
    );

    // Status badge component renderer
    const renderStatusBadge = (status) => (
      <Status
        title={status}
        bg_color={currentStatus === status ? filteredStatus?.bg_color : ""}
        font_color={
          currentStatus === status
            ? status === "On Delivery"
              ? "black"
              : "white"
            : "black"
        }
      />
    );

    return {
      id: index,
      rows: [
        {
          title: "Courier",
          content: (
            <>
              {item[248] === "Internal" ? item[247] : item[249]} / {item[1569]}
            </>
          ),
        },
        {
          title: "Tracking Number",
          content: (
            <>
              {item[248] === "Internal" ? item[1569] : item[2773]}
              {item[248] === "External" && <CopyButton text={item[2773]} />}
            </>
          ),
        },
        {
          title: "Address",
          content: item[1548] || "No address provided",
        },
        {
          title: "Status",
          content: (
            <div className="flex gap-2">
              {["Open", "On Delivery", "Closed", "Canceled"].map(
                (status) =>
                  currentStatus === status && renderStatusBadge(status)
              )}
            </div>
          ),
        },
      ],
    };
  });

  return (
    <Dialog
      visible={visible}
      onHide={onHide}
      header={<p className=" text-[700] text-[28px]">Transaction Details</p>}
      className=" overflow-y-auto flex flex-col bg-white  w-[795px] h-[680px] "
      key={id}
    >
      <div className="flex w-full pl-[12px] pr-[12px]">
        <Timeline
          marker={customizedMarker}
          value={events}
          className="w-full md:w-20rem text-xs"
          layout="horizontal"
          content={(item) => {
            const markerColor =
              item.status === wo_filtered[0]?.status?.text
                ? item.status
                : "#e5e7eb";
            return (
              <p style={{ color: markerColor }} className=" text-start">
                {item.status}
              </p>
            );
          }}
        />
      </div>
      <div className="flex flex-col gap-[24px]">
        <OrderDetailsCard title="Order Details" data={order_details} />
        <OrderDetailsCard title="Applicant Info" data={applicant_info} />
        <OrderDetailsCard title="Delivery Info" data={delivery_info} />
        <OrderDetailsCard title="Processed Documents" />
        <OrderDetailsCard title="Courier" />
      </div>

      {processedData?.parent?.length > 0 && wo_filtered[0]?.rating != 0 && (
        <>
          {processedData.parent && (
            <div className="flex flex-col gap-1 mt-3 ">
              <span className=" text-base font-bold">Processed Documents</span>
              {processedData.document.map((item) => {
                return (
                  <table
                    key={item.id}
                    className="w-full text-xs border-t mt-1"
                    cellPadding={5}
                  >
                    <tr>
                      <td className="w-2">Document</td>
                      <td className="w-0">:</td>
                      <td className="  ">
                        <div
                          onClick={() => {
                            download_attachments(item.id, item[1649]);
                          }}
                          className="cursor-pointer w-fit  hover:underline text-blue-500 font-bold "
                        >
                          {item[1649]}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="w-2">Start Date</td>
                      <td className="w-0">:</td>
                      <td>{item[2775] ? item[2775] : "-"}</td>
                    </tr>
                    <tr>
                      <td className="w-2">Expired Date</td>
                      <td className="w-0">:</td>
                      <td>{item[1650] ? item[1650] : "-"}</td>
                    </tr>
                    <tr>
                      <td className="w-2">Validity</td>
                      <td className="w-0">:</td>
                      <td>{item[2776]}</td>
                    </tr>
                  </table>
                );
              })}
            </div>
          )}
        </>
      )}
      {wo_filtered[0]?.rating == 0 && (
        <div className="mt-10 mb-10">
          <Message text="Rate order first" severity="info" />
        </div>
      )}

      {/*      <div className="flex flex-col gap-1 mt-3 ">
        <span className=" text-base font-bold">Payment Details</span>
        <table className="w-full text-xs" cellPadding={5}>
          <tr>
            <td className="w-2">Courier </td>
            <td className="">:</td>
            <td>Kurir Rekomendasi - Kurir Rekomendasi</td>
          </tr>
          <tr>
            <td className="w-2">Tracking Number</td>
            <td className="">:</td>{" "}
            <td className=" font-bold">
              {courier.length > 0 &&
                courier[0][248] === "Internal" &&
                courier[0][248]}
              {courier.length > 0 &&
                courier[0][248] === "External" &&
                "TKP01-YQML51KJ"}
            </td>
          </tr>
          <tr>
            <td className="w-2">Address</td>
            <td className="">:</td>
            <td>{courier.length > 0 && courier[0][1548]}</td>
          </tr>
        </table>
      </div> */}

      {/* <table className="min-w-full mt-3  rounded-lg text-sm">
        <thead className="text-white" style={{ backgroundColor: "#9c1c23" }}>
          <tr>
            {th_array.map((th, index) => (
              <th key={index} className="py-3 px-4 text-center border">
                {th}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {processing.map((item, index) => {
            return (
              <>
                <tr key={item.id}>
                  <td className="border px-4 py-2 text-center">{index + 1}</td>
                  <td className="border px-4 py-2 text-center">
                    {item["1649"]}
                  </td>
                  <td
                    className="border px-4 py-2 text-center"
                    onClick={() => {
                      if (downloadStatus.length === 1) {
                        download_attachments(item.id);
                      }
                    }}
                  >
                    {downloadStatus.map((x) => {
                      if (x.id === item.id) {
                        return (
                          <>
                            <motion.i
                              key={item.id}
                              whileHover={{ color: "#9c1c23" }}
                              className={`pi pi-spinner pi-spin text-lg cursor-pointer font-bold`}
                            ></motion.i>
                          </>
                        );
                      } else {
                        return (
                          <>
                            <motion.i
                              key={item.id}
                              whileHover={{ color: "#9c1c23" }}
                              className={`pi pi-download text-lg cursor-pointer font-bold`}
                            ></motion.i>
                          </>
                        );
                      }
                    })}
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table> */}
    </Dialog>
  );
};

export default WORowsDialog;
