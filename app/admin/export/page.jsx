"use client";
import React, { useEffect, useState } from "react";
import DependentExport from "./components/DependentExport";
import ExpatriatesExport from "./components/ExpatriatesExport";
import { useAccountSettingContext } from "../context/AccountSettingContext";
import StatusBadge from "@/app/components/ui/tableComponent/StatusBadge";
import VisitorExport from "./components/VisitorExport";
import { docuemnts_data } from "@/app/function/static_data";
import { useExpatriateListContext } from "../account/[profile]/[id]/context/ExpatriateListContext";
import { useDependentListContext } from "../account/[profile]/[id]/context/DependentListContext";
import { useVisitorsListContext } from "../account/[profile]/[id]/context/VisitorsListContext";
import { ProgressSpinner } from "primereact/progressspinner";
import { motion } from "framer-motion";
import WebButton from "@/app/components/ui/WebButton";

const ExportPage = () => {
  const [isLoading, setIsLoading] = useState(0);
  const { customer } = useAccountSettingContext();
  const { expatriates } = useExpatriateListContext();
  const { dependent } = useDependentListContext();
  const { visitors } = useVisitorsListContext();

  useEffect(() => {
    if (customer) {
      if (expatriates.length > 0) {
        setIsLoading(1);
      }
    }
  }, [customer, expatriates, dependent, visitors]);

  const doc_status_ordered = docuemnts_data.sort((a, b) => b.id - a.id);

  const date = new Date().getDate();
  const month = new Date().getMonth();
  const month_name = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const year = new Date().getFullYear();
  return (
    <div className=" text-xs overflow-x-auto  ">
      {isLoading === 0 && (
        <>
          <div className="w-screen h-screen bg-gray-500 z-10 absolute top-0 left-0 opacity-50 justify-center items-center flex">
            <ProgressSpinner />
          </div>
        </>
      )}
      {isLoading === 1 && (
        <>
          <style scoped>
            {` @media print {
        @page {
        size:A2 landscape;
        margin: 10mm;
        
        }
        #btn-container {
        display:none;
        }

        table {
        page-break-inside:avoid;
        }

        thead {
        display:table-row-group;
        }
       
        .page-break { page-break-before: always;  }
        body {
        transform:scale(1);
        transform-origin:top left;
        }
        
        } `}
          </style>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex justify-between">
              <img
                src="https://indomonangjadi.com/wp-content/uploads/2023/11/Logo-Default.png"
                alt=""
                width={300}
              />
              <div className="w-1/2 text-end" id="btn-container">
                <WebButton
                  title={<i className="pi pi-print"></i>}
                  onClickFunction={() => {
                    window.print();
                  }}
                />
              </div>
            </div>
            <div className="py-3  ">
              <div className="w-full flex ">
                <table className="lg:w-1/3 ">
                  <tbody>
                    <tr>
                      <td className="w-2 font-bold">Report Date</td>
                      <td style={{ width: "1px" }}>:</td>
                      <td>
                        {date} {month_name[month]} {year}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <br />
              <div className="w-full flex ">
                <table className="lg:w-1/3 ">
                  <tbody>
                    <tr>
                      <td className=" w-2 font-bold">Customer ID</td>
                      <td className="">:</td>
                      <td className="">{customer[461]}</td>
                    </tr>
                    <tr>
                      <td className="font-bold">Status</td>
                      <td>:</td>

                      <td className="text-green-500">{customer[230]}</td>
                    </tr>
                    <tr>
                      <td className="font-bold">Name</td>
                      <td>:</td>

                      <td>{customer[228]}</td>
                    </tr>
                    <tr>
                      <td className="font-bold align-top">Address</td>
                      <td className=" align-top">:</td>

                      <td>{customer[432]}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="flex w-2/3 justify-end">
                  <table className="w-1/2">
                    <thead>
                      <tr>
                        <th
                          className="  text-white"
                          colSpan={3}
                          style={{ backgroundColor: "#9C1C23" }}
                        >
                          Summary
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className=" font-bold">Total Expatriate</td>
                        <td>:</td>
                        <td>{customer[1506]}</td>
                      </tr>
                      <tr>
                        <td className=" font-bold">Total Dependants</td>
                        <td>:</td>
                        <td>{customer[1507]}</td>
                      </tr>
                      <tr>
                        <td className=" font-bold">Total Visitors</td>
                        <td>:</td>
                        <td>{customer[1508]}</td>
                      </tr>
                      <tr className=" bg-gray-500">
                        <td className=" font-bold">Grand Total</td>
                        <td>:</td>
                        <td className=" font-bold">{customer[1509]}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="w-full py-5 overflow-x-auto ">
                <ExpatriatesExport />
              </div>
              <div className="w-full py-5 overflow-x-auto ">
                <DependentExport />
              </div>
              <div className="w-full py-5 overflow-x-auto ">
                <VisitorExport />
              </div>
              <div className="w-full py-5 overflow-x-auto">
                <table className="w-1/3 border">
                  <thead className="border">
                    <tr>
                      <th
                        colSpan={2}
                        className=" text-center bg-indomonangeRed text-white p-2"
                      >
                        Color Code
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {doc_status_ordered.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td className="p-1 border">
                            <div className="flex justify-center">
                              <StatusBadge
                                title={item.text}
                                bg_color={item.bg_color}
                                font_color="white"
                                className="w-full"
                              />
                            </div>
                          </td>
                          <td className="p-1 border">
                            {item.text === "Active" &&
                              `Document validity period > 60 days`}
                            {item.text === "Expired" &&
                              `Document validity period has expired`}
                            {item.text === "Expiry 1" &&
                              `Document validity period < 60 days`}
                            {item.text === "Expiry 2" &&
                              `Document validity period < 30 days`}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default ExportPage;
