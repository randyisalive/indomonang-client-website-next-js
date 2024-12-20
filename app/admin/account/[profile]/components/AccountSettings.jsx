"use client";
import StatusBadge from "@/app/components/ui/tableComponent/StatusBadge";
import { ATOB } from "@/app/function/decryptor";
import { useParams } from "next/navigation";
import React from "react";
import useAccountSettingsData from "../hooks/useAccountSettingsData";
import "./AccountSettings.css";
import { ProgressSpinner } from "primereact/progressspinner";
import { motion } from "framer-motion";
import CopyButton from "@/app/components/ui/CopyButton";

const AccountSettings = () => {
  const { profile } = useParams();

  const { customer, isLoading } = useAccountSettingsData();

  const decrypt = ATOB(profile);
  if (decrypt === "account") {
    if (isLoading === 0) {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className=" w-full h-full flex justify-center items-center"
        >
          <ProgressSpinner />
        </motion.div>
      );
    }
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className=" p-3 shadow-sm flex flex-col gap-3"
        key={customer.id}
      >
        <span className=" text-3xl font-bold underline">Your Data</span>
        <div className="overflow-x-auto w-full shadow-md">
          <table className="min-w-1/2 w-full mt-3  text-sm">
            <thead
              className="text-white"
              style={{ backgroundColor: "#9c1c23" }}
            >
              <tr>
                <th className="text-start ps-6 border text-base" colSpan={2}>
                  Data
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2 font-bold">ID</td>
                <td className="border px-4 py-2 ">{customer[461]}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-bold">Company</td>
                <td className="border px-4 py-2 ">
                  {customer[228]} <CopyButton text={customer[228]} />
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-bold">Status</td>
                <td className="border px-4 py-2 ">
                  <StatusBadge
                    title={customer[230]}
                    font_color="white"
                    bg_color="green"
                  />
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-bold">Address</td>
                <td className="border px-4 py-2 ">
                  {customer[432]}
                  <CopyButton text={customer[432]} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="overflow-x-auto w-full shadow-md">
          <table className="min-w-1/2 w-full mt-3 text-sm">
            <thead
              className="text-white"
              style={{ backgroundColor: "#9c1c23" }}
            >
              <tr>
                <th className="text-start ps-6 border text-base" colSpan={2}>
                  Contact
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2 font-bold">Contact Person</td>
                <td className="border px-4 py-2 ">{customer[466]}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-bold">Job Title</td>
                <td className="border px-4 py-2 ">{customer[471]}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-bold">Phone</td>
                <td className="border px-4 py-2 ">
                  {customer[233]} <CopyButton text={customer[233]} />
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-bold">Email</td>
                <td className="border px-4 py-2 ">
                  {customer[229]}
                  <i className=" ms-2 pi pi-copy"></i>
                  <div></div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="overflow-x-auto w-full shadow-md">
          <table className="min-w-1/2 w-full mt-3 text-sm">
            <thead
              className="text-white"
              style={{ backgroundColor: "#9c1c23" }}
            >
              <tr>
                <th className="text-start ps-6 border text-base" colSpan={2}>
                  Total Foreign
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2 font-bold">
                  Total Expatriate{" "}
                </td>
                <td className="border px-4 py-2 ">{customer[1506]}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-bold">Total Dependent </td>
                <td className="border px-4 py-2 ">{customer[1507]}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-bold">Total Visitors </td>
                <td className="border px-4 py-2 ">{customer[1508]}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-bold">Grand Total </td>
                <td className="border px-4 py-2 ">{customer[1509]}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </motion.div>
    );
  }
};

export default AccountSettings;
