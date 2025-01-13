"use client";
import React from "react";
import { Dialog } from "primereact/dialog";
import useProcessingData from "@/app/hooks/useProcessingData";

import { Timeline } from "primereact/timeline";

import CopyButton from "../../CopyButton";
import StatusBadge from "../StatusBadge";
import WebButton from "../../WebButton";
import { Rating } from "primereact/rating";
import { useWoContext } from "@/app/(main)/your-orders/context/WoContext";
import { useWoDetailContext } from "@/app/(main)/your-orders/context/WoDetailContext";

const WORowsDialog = ({
  visible = false,
  onHide = () => {},
  id = 0,
  rating = 0,
}) => {
  const { wo } = useWoContext();
  const {
    processing,
    getProcessing,
    download_attachments,
    downloadStatus,
    isLoading,
    processedData,
    filteredCourier,
  } = useWoDetailContext();
  const delivery_status = [
    { id: 0, text: "Open", bg_color: "#00C49A" },
    { id: 1, text: "On Delivery", bg_color: "#9cec5b" },
    { id: 2, text: "Closed", bg_color: "#BFC9CA" },
    { id: 3, text: "Canceled", bg_color: "#B6244F" },
  ];

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
        <span className=" text-base font-bold">Order Details</span>
        <table className="w-full text-xs">
          <tr>
            <td className=" text-gray-400">No. Invoice</td>
            {/*  {wo.invoice.length > 0 && (
              <td className=" text-end flex justify-end  font-bold">
                <div className=" w-fit hover:underline text-blue-500 cursor-pointer">
                  {wo.invoice[0][1907]}
                </div>
              </td>
            )} */}
          </tr>
          <tr>
            <td className=" text-gray-400">Order Date</td>
            {/*  {wo.wo.length > 0 && (
              <td className=" text-end">{wo.wo[0]["date_added"]}</td>
            )} */}
          </tr>
          <tr>
            <td className=" text-gray-400">Ratings</td>
            {/*  {wo.wo.length > 0 && (
              <td className=" flex justify-end">
                <Rating
                  cancel={false}
                  value={wo.wo[0][2631]}
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
            )} */}
          </tr>
        </table>
      </div>

      <div className="flex flex-col gap-1 mt-3 ">
        <span className=" text-base font-bold">Delivery Info</span>
        {filteredCourier.map((item) => {
          const filtered_status = delivery_status.filter(
            (x) => x.text === item[1547]
          );
          return (
            <table className="w-full text-xs border-t mt-1" cellPadding={5}>
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
                  {item[248] === "External" && <CopyButton text={item[2773]} />}
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
                      item[1547] === "Open" ? filtered_status[0].bg_color : ""
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
                      item[1547] === "Closed" ? filtered_status[0].bg_color : ""
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
                      font_color={item[1547] === "Canceled" ? "white" : "black"}
                    />
                  )}
                </td>
              </tr>
            </table>
          );
        })}
      </div>
      {processedData && (
        <>
          {processedData.parent && (
            <div className="flex flex-col gap-1 mt-3 ">
              <span className=" text-base font-bold">Processed Documents</span>
              {processedData.document.map((item) => {
                return (
                  <table
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
