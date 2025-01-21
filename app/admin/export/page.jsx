"use client";
import React from "react";
import { useExpatriateListContext } from "../account/[profile]/[id]/context/ExpatriateListContext";
import StatusBadge from "@/app/components/ui/tableComponent/StatusBadge";
import { docuemnts_data } from "@/app/function/static_data";
import { useDependentListContext } from "../account/[profile]/[id]/context/DependentListContext";
import DependentExport from "./components/DependentExport";
import ExpatriatesExport from "./components/ExpatriatesExport";

const ExportPage = () => {
  return (
    <div className=" text-xs overflow-x-auto  ">
      <style scoped>
        {` @media print {
        @page {
        size:A2 landscape;
        margin: 10mm;
        
        }

        thead {
        display:table-header-group;
        }
       
        .page-break { page-break-before: always;  }
        body {
        transform:scale(1);
        transform-origin:top left;
        }
        
        } `}
      </style>
      <div className="">
        <img
          src="https://indomonangjadi.com/wp-content/uploads/2023/11/Logo-Default.png"
          alt=""
          width={300}
        />
      </div>
      <div className="py-3  ">
        <table className="lg:w-1/3">
          <tbody>
            <tr>
              <td className="w-2">Report Date</td>
              <td>:</td>
              <td>31 December 2024</td>
            </tr>
          </tbody>
        </table>
        <br />
        <div className="w-full flex">
          <table className="lg:w-1/3 ">
            <tbody>
              <tr>
                <td className=" w-2 font-bold">Customer ID</td>
                <td className="">:</td>
                <td className="">C-27856</td>
              </tr>
              <tr>
                <td className="font-bold">Status</td>
                <td>:</td>

                <td className="text-green-500">Active</td>
              </tr>
              <tr>
                <td className="font-bold">Name</td>
                <td>:</td>

                <td>31 December 2024</td>
              </tr>
              <tr>
                <td className="font-bold">Address</td>
                <td>:</td>

                <td>31 December 2024</td>
              </tr>
              <tr>
                <td className="font-bold">PIC</td>
                <td>:</td>

                <td>31 December 2024</td>
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
                  <td>Total Expatriate</td>
                  <td>:</td>
                  <td>0 Persons</td>
                </tr>
                <tr>
                  <td>Total Dependants</td>
                  <td>:</td>
                  <td>0 Persons</td>
                </tr>
                <tr>
                  <td>Total Visitors</td>
                  <td>:</td>
                  <td>0 Persons</td>
                </tr>
                <tr className=" bg-gray-500">
                  <td>Grand Total</td>
                  <td>:</td>
                  <td className=" font-bold">0 Persons</td>
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
        <div className="w-full py-5 overflow-x-auto "></div>
      </div>
    </div>
  );
};

export default ExportPage;
