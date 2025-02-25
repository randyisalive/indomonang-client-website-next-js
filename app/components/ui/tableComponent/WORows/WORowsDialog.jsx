"use client";
import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Timeline } from "primereact/timeline";
import CopyButton from "../../CopyButton";
import StatusBadge from "../StatusBadge";
import { Rating } from "primereact/rating";
import { useWoContext } from "@/app/(main)/your-orders/context/WoContext";
import { useWoDetailContext } from "@/app/(main)/your-orders/context/WoDetailContext";
import { Message } from "primereact/message";
import parser from "html-react-parser";
import { motion, AnimatePresence } from "framer-motion";

const WORowsDialog = ({ visible = false, onHide = () => {}, id = 0 }) => {
  const { wo } = useWoContext();
  const { download_attachments, processedData, filteredCourier } =
    useWoDetailContext();
  const delivery_status = [
    { id: 0, text: "Open", bg_color: "#00C49A" },
    { id: 1, text: "On Delivery", bg_color: "#9cec5b" },
    { id: 2, text: "Closed", bg_color: "#BFC9CA" },
    { id: 3, text: "Canceled", bg_color: "#B6244F" },
  ];

  const wo_filtered = wo.filter((item) => item.id === id);
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

  const [read_more, setReadMore] = useState(false);

  const customizedMarker = (item) => {
    const markerColor =
      item.status === wo_filtered[0]?.status?.name ? item.color : "#e5e7eb";
    return (
      <span
        className="flex p-1 align-items-center justify-content-center text-white border-circle  shadow-sm z-10"
        style={{ backgroundColor: markerColor }}
      >
        <i className={`${item.icon} text-xs`}></i>
      </span>
    );
  };

  // dropdown
  const [dropdown, setDropdown] = useState({
    order: false,
    applicant: false,
    delivery: false,
  });

  return (
    <Dialog
      visible={visible}
      onHide={onHide}
      style={{ width: "50rem", height: "50rem" }}
      header="Transaction Detail"
      className=" overflow-y-auto"
      key={id}
    >
      <div className="flex flex-col gap-1 mt-3 ">
        <motion.div
          whileHover={{ backgroundColor: "#efefef" }}
          style={{ backgroundColor: "#ffffff" }}
          onClick={() =>
            setDropdown((prev) => ({ ...prev, order: !dropdown.order }))
          }
          className="w-full flex border-b rounded-lg p-1 justify-start gap-3 items-center cursor-pointer"
        >
          <span className=" text-base font-bold ">Order Details</span>
          <motion.i
            animate={dropdown.order ? { rotate: 0 } : { rotate: 90 }}
            className="pi pi-angle-right"
          ></motion.i>
        </motion.div>
        <motion.div
          animate={dropdown.order ? { height: 0 } : { height: "auto" }}
          className="  overflow-y-clip"
        >
          <table className="w-full text-xs" cellPadding={5}>
            <tr>
              <td className=" text-gray-400 w-2">Company</td>
              <td className="" style={{ width: "100px" }}>
                :
              </td>
              <td className=" text-start w-full">{wo_filtered[0].company}</td>
            </tr>
            <tr>
              <td className=" text-gray-400">Service</td>
              <td>:</td>
              <td className=" text-start w-fit">{wo_filtered[0].service}</td>
            </tr>
            <tr>
              <td className=" text-gray-400">Reference Number</td>
              <td>:</td>
              <td className=" text-start ">
                <div className=" w-fit ">{wo_filtered[0].ref_num}</div>
              </td>
            </tr>
            <tr>
              <td className=" text-gray-400">City / Country</td>
              <td>:</td>

              <td className=" text-start">{wo_filtered[0].city}</td>
            </tr>
            <tr>
              <td className=" text-gray-400">Priority</td>
              <td>:</td>

              <td className=" text-start">{wo_filtered[0].priority}</td>
            </tr>
            <tr>
              <td className=" text-gray-400">Ratings</td>
              <td>:</td>
              {wo.length > 0 && (
                <td className=" flex justify-start items-center">
                  <Rating
                    cancel={false}
                    value={wo_filtered[0]?.rating}
                    className=" scale-90"
                    readOnly
                    pt={{
                      onIcon: {
                        className: "",
                        style: { color: "#9A1C20" },
                      },
                    }}
                  />
                </td>
              )}
            </tr>
          </table>{" "}
          <div className="flex w-full">
            <Timeline
              marker={customizedMarker}
              value={events}
              className="w-full md:w-20rem text-xs"
              layout="horizontal"
              content={(item) => {
                const markerColor =
                  item.status === wo_filtered[0]?.status?.name
                    ? item.color
                    : "#e5e7eb";
                return (
                  <p style={{ color: markerColor }} className=" text-start">
                    {item.status}
                  </p>
                );
              }}
            />
          </div>
        </motion.div>
      </div>
      <div className="flex flex-col gap-1 mt-3 ">
        <motion.div
          onClick={() =>
            setDropdown((prev) => ({ ...prev, applicant: !dropdown.applicant }))
          }
          whileHover={{ backgroundColor: "#efefef" }}
          style={{ backgroundColor: "#ffffff" }}
          className="w-full flex border-b justify-start rounded-lg p-1  gap-3 items-center cursor-pointer"
        >
          <span className=" text-base font-bold ">Applicant Info</span>

          <motion.i
            animate={dropdown.applicant ? { rotate: 0 } : { rotate: 90 }}
            className="pi pi-angle-right"
          ></motion.i>
        </motion.div>
        <motion.div
          animate={dropdown.applicant ? { height: 0 } : { height: "auto" }}
          className="  overflow-y-clip"
        >
          <table className="w-full text-xs  " cellPadding={5}>
            <tr>
              <td className="w-2">Name </td>
              <td style={{ width: "1px" }}>:</td>
              <td className="text-start font-bold">
                {wo_filtered[0]?.applicant}
              </td>
            </tr>
            <tr>
              <td className="w-2">Nationality</td>
              <td style={{ width: "1px" }}>:</td>
              <td className=" font-bold">{wo_filtered[0]?.nationality}</td>
            </tr>
            <tr>
              <td className="w-2">Job Title</td>
              <td style={{ width: "1px" }}>:</td>
              <td>{wo_filtered[0]?.job_title}</td>
            </tr>{" "}
            <tr>
              <td className="text-xs pl-1  align-top">Other Applicants</td>
              <td className="align-top">:</td>
              <td className=" align-top">
                {wo_filtered[0].other_expat_list && (
                  <React.Fragment>
                    {parser(wo_filtered[0].other_expat_list)}
                  </React.Fragment>
                )}
              </td>
            </tr>
          </table>
        </motion.div>
      </div>
      {filteredCourier.length > 0 && (
        <div className="flex flex-col gap-1 mt-3 ">
          <motion.div
            onClick={() =>
              setDropdown((prev) => ({
                ...prev,
                delivery: !dropdown.delivery,
              }))
            }
            whileHover={{ backgroundColor: "#efefef" }}
            style={{ backgroundColor: "#ffffff" }}
            className="w-full flex border-b justify-start rounded-lg p-2 gap-3 items-center cursor-pointer"
          >
            <span className=" text-base font-bold ">Delivery Info</span>
            <motion.i
              animate={dropdown.delivery ? { rotate: 0 } : { rotate: 90 }}
              className="pi pi-angle-right"
            ></motion.i>
          </motion.div>
          <motion.div
            animate={dropdown.delivery ? { height: 0 } : { height: "auto" }}
            className=" overflow-y-clip"
          >
            {filteredCourier.map((item) => {
              const filtered_status = delivery_status.filter(
                (x) => x.text === item[1547]
              );
              return (
                <table
                  key={item.id}
                  className="w-full text-xs  mt-1"
                  cellPadding={5}
                >
                  <tr>
                    <td className="w-2">Courier </td>
                    <td className="">:</td>
                    <td>
                      {item[248] === "Internal" ? item[247] : item[249]} /{" "}
                      {item[1569]}
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td className="w-2">Tracking Number</td>
                    <td className="">:</td>{" "}
                    <td className=" font-bold">
                      {item[248] === "Internal" ? item[1569] : item[2773]}
                      {item[248] === "External" && (
                        <CopyButton text={item[2773]} />
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="w-2">Address</td>
                    <td className="">:</td>
                    <td>{item[1548]}</td>
                  </tr>
                  <tr>
                    <td className="w-2">Status</td>
                    <td>:</td>
                    <td className=" flex gap-3">
                      <StatusBadge
                        title="Open"
                        bg_color={
                          item[1547] === "Open"
                            ? filtered_status[0].bg_color
                            : ""
                        }
                        font_color={item[1547] === "Open" ? "white" : "black"}
                      />
                      <StatusBadge
                        title="On Delivery"
                        bg_color={
                          item[1547] === "On Delivery"
                            ? filtered_status[0].bg_color
                            : ""
                        }
                        font_color={
                          item[1547] === "On Delivery" ? "black" : "black"
                        }
                      />
                      <StatusBadge
                        title="Arrived"
                        bg_color={
                          item[1547] === "Closed"
                            ? filtered_status[0].bg_color
                            : ""
                        }
                        font_color={item[1547] === "Closed" ? "white" : "black"}
                      />
                      {item[1547] === "Canceled" && (
                        <StatusBadge
                          title="Canceled"
                          bg_color={
                            item[1547] === "Canceled"
                              ? filtered_status[0].bg_color
                              : ""
                          }
                          font_color={
                            item[1547] === "Canceled" ? "white" : "black"
                          }
                        />
                      )}
                    </td>
                  </tr>
                </table>
              );
            })}
          </motion.div>
        </div>
      )}

      {processedData.parent.length > 0 && wo_filtered[0]?.rating != 0 && (
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
      {wo_filtered[0].rating == 0 && (
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

      {/*  <table className="min-w-full mt-3  rounded-lg text-sm">
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
