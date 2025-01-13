"use client";
import HeaderComponent from "@/app/components/ui/HeaderComponent";
import StatusBadge from "@/app/components/ui/tableComponent/StatusBadge";
import { useParams } from "next/navigation";
import React from "react";
import useBillingDetailsData from "./hooks/useBillingDetailsData";
import { ProgressSpinner } from "primereact/progressspinner";
import { motion } from "framer-motion";

const BillingDetail = () => {
  const { billing, invoice, wo, isLoading } = useBillingDetailsData();
  const { id } = useParams();

  const breadcrumbs_array = [
    { id: 0, text: "Portal Home /", nav: "/" },
    { id: 1, text: "Billing /", nav: "/billing" },
    { id: 2, text: `P-${id}` },
  ];

  return (
    <div className="flex flex-col  w-full mx-auto pt-7 mb-10 sm:px-6, lg:px-0 max-w-screen-xl">
      <HeaderComponent
        title="Billing Details"
        breadcrumbs={`Portal Home / Billing / P-${id}`}
        breadcrumbs_array={breadcrumbs_array}
      />
      {isLoading > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex flex-col border mt-5  bg-white shadow-md rounded-lg p-5 gap-3"
        >
          <div className="flex items-center gap-2">
            <i className="pi pi-receipt font-light text-xl"></i>
            <span className="text-xl font-light m-0 p-0">Bills</span>
          </div>
          <hr />
          <div className="text-sm">
            {billing.map((item) => {
              return (
                <div key={item.id} className="overflow-x-auto  sm:w-1/2">
                  <table className="min-w-fit w-full  mt-3 text-sm">
                    <thead
                      className="text-white"
                      style={{ backgroundColor: "#9c1c23" }}
                    >
                      <tr>
                        <th
                          className="text-start ps-6 border text-base"
                          colSpan={2}
                        >
                          {item[1955]}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border px-4 py-2 font-bold">
                          Transaction ID
                        </td>
                        <td className="border px-4 py-2 text-center">
                          {item.transactions_number}
                        </td>
                      </tr>

                      <tr>
                        <td className="border px-4 py-2 font-bold ">
                          Amount Paid
                        </td>
                        <td className="border px-4 py-2 text-center text-green-600">
                          {item.amount_of_payment}
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4  py-2 font-bold ">
                          Date of Payment
                        </td>
                        <td className="border px-4 text-center  py-2 ">
                          {item.date_of_payment}
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-bold">
                          Amount Total
                        </td>
                        <td className="border px-4 text-center py-2 text-blue-600">
                          {item[2211]}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              );
            })}
          </div>
        </motion.div>
      ) : (
        <div className="flex w-full my-16 h-full ">
          <ProgressSpinner />
        </div>
      )}

      <div className="my-16 flex w-full flex-col">
        {isLoading > 1 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col border bg-white shadow-md rounded-lg p-5 gap-3"
          >
            <div className="flex items-center gap-2">
              <i className="pi pi-receipt font-light text-xl"></i>
              <span className="text-xl font-light m-0 p-0">Invoices</span>
            </div>
            <hr />
            <div className="text-sm">
              {invoice.map((item) => {
                return (
                  <div key={item.id} className=" overflow-x-auto sm:w-1/2">
                    <table className="min-w-fit w-full mt-3 text-sm">
                      <thead
                        className="text-white"
                        style={{ backgroundColor: "#9c1c23" }}
                      >
                        <tr>
                          <th
                            className="text-start ps-6 border text-base"
                            colSpan={2}
                          >
                            {item[1907]}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border px-4 py-2 font-bold">
                            Due Date
                          </td>
                          <td className="border px-4 py-2 ">{item[1914]}</td>
                        </tr>
                        <tr>
                          <td className="border px-4 py-2 font-bold">
                            Payment Deadline
                          </td>
                          <td className="border px-4 py-2 ">{item[1913]}</td>
                        </tr>
                        <tr>
                          <td className="border px-4 py-2 font-bold">
                            Invoice
                          </td>
                          <td className="border px-4 py-2">{item[1968]}</td>
                        </tr>
                        <tr>
                          <td className="border px-4 py-2 font-bold">Total</td>
                          <td className="border px-4 py-2 text-red-600">
                            {item[2051]}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ) : (
          <div className="flex my-5 w-full h-full ">
            <ProgressSpinner />
          </div>
        )}
        {isLoading > 2 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col border mt-5  bg-white shadow-md rounded-lg p-5 gap-3"
          >
            <div className="flex items-center gap-2">
              <i className="pi pi-receipt font-light text-xl"></i>
              <span className="text-xl font-light m-0 p-0">Order Details</span>
            </div>
            <hr />
            <div className="text-sm">
              {wo.map((item) => {
                return (
                  <div key={item.id} className=" overflow-x-auto w-full">
                    <table className="min-w-1/2 sm:w-1/2 mt-3 text-sm">
                      <thead
                        className="text-white"
                        style={{ backgroundColor: "#9c1c23" }}
                      >
                        <tr>
                          <th
                            className="text-start ps-6 border text-base"
                            colSpan={2}
                          >
                            {item[2134]}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border px-4 py-2 font-bold">
                            Process
                          </td>
                          <td className="border px-4 py-2 ">{item[674]}</td>
                        </tr>
                        <tr>
                          <td className="border px-4 py-2 font-bold">Status</td>
                          <td className="border px-4 py-2 ">
                            <StatusBadge
                              title={item[2138]}
                              font_color="white"
                              bg_color="green"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="border px-4 py-2 font-bold">
                            Company
                          </td>
                          <td className="border px-4 py-2 select-none">
                            {item[314]}
                          </td>
                        </tr>
                        <tr>
                          <td className="border px-4 py-2 font-bold">
                            City / Country
                          </td>
                          <td className="border px-4 py-2 ">{`${item[1809]} / ${item[699]}`}</td>
                        </tr>
                        <tr>
                          <td className="border px-4 py-2 font-bold">
                            Time Estimation
                          </td>
                          <td className="border px-4 py-2 ">{item[791]} </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ) : (
          <div className="flex my-5 w-full h-full ">
            <ProgressSpinner />
          </div>
        )}
      </div>
    </div>
  );
};

export default BillingDetail;
