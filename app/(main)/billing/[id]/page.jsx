"use client";
import HeaderComponent from "@/app/components/ui/HeaderComponent";
import StatusBadge from "@/app/components/ui/tableComponent/StatusBadge";
import { useParams } from "next/navigation";
import React from "react";
import parse from "html-react-parser";
import useBillingDetailsData from "./hooks/useBillingDetailsData";
import { ProgressSpinner } from "primereact/progressspinner";
import { motion } from "framer-motion";
import { useDecryptionContext } from "@/app/Context/DecryptionContext";
import { decryptMessage } from "@/app/function/decryptor";

const BillingDetail = () => {
  const { billing, invoice, wo, isLoading, handleDownloadInvoice } =
    useBillingDetailsData();
  const { id } = useParams();
  const { decKey } = useDecryptionContext();
  const decode_id = decryptMessage(decodeURIComponent(id), decKey);

  const breadcrumbs_array = [
    { id: 0, text: "Portal Home /", nav: "/" },
    { id: 1, text: "Payment History /", nav: "/invoice" },
    { id: 2, text: `${decode_id}` },
  ];

  return (
    <div className="flex flex-col  w-full mx-auto pt-7 mb-10 sm:px-6, lg:px-0 max-w-screen-xl">
      <HeaderComponent
        title="Payment Details"
        breadcrumbs_array={breadcrumbs_array}
      />
      {isLoading > 1 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex flex-col border bg-white shadow-md rounded-lg p-5 gap-3 mt-5"
        >
          <div className="flex items-center gap-2">
            <i className="pi pi-receipt font-light text-xl"></i>
            <span className="text-xl font-light m-0 p-0">Paid Invoices</span>
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
                          {item.invoice_id}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border px-4 py-2 font-bold">Due Date</td>
                        <td className="border px-4 py-2 ">{item.due_date}</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-bold">
                          Payment Deadline
                        </td>
                        <td className="border px-4 py-2 ">
                          {
                            item.payment_dates?.split(",")[
                              item.payment_dates?.split(",").length - 1
                            ]
                          }
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-bold">Invoice</td>
                        <td className="border px-4 py-2">
                          <i
                            className="pi pi-download cursor-pointer hover:text-blue-500"
                            onClick={() => handleDownloadInvoice(item.id)}
                          ></i>
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-bold">Total</td>
                        <td className="border px-4 py-2 text-red-600">
                          {item.amount}
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
      <div className="my-16 flex w-full flex-col">
        {isLoading > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col border mt-5  bg-white shadow-md rounded-lg p-5 gap-3"
          >
            <div className="flex items-center gap-2">
              <i className="pi pi-receipt font-light text-xl"></i>
              <span className="text-xl font-light m-0 p-0">Payment Detail</span>
            </div>
            <hr />
            <div className="text-sm  flex flex-wrap gap-5">
              {billing.map((item) => {
                return (
                  <div key={item.id} className="">
                    <table className="min-w-fit w-full  mt-3 text-sm">
                      <thead
                        className="text-white"
                        style={{ backgroundColor: "#9c1c23" }}
                      >
                        {console.log(item)}
                        <tr>
                          <th
                            className="text-start ps-6 border text-base"
                            colSpan={2}
                          >
                            P-{item.id}
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
                            Amount of Payment
                          </td>
                          <td className="border px-4 py-2 text-center text-green-600">
                            {item.sub_total}
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
                            Invoice No
                          </td>
                          <td className="border px-4 py-2 text-center">
                            {item.invoices_id}
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
                            Applicant
                          </td>
                          <td className="border px-4 py-2 ">{`${item[316]}`}</td>
                        </tr>{" "}
                        {console.log(item)}
                        <tr>
                          <td className="border px-4 py-2 font-bold">
                            Other Applicant
                          </td>
                          <td className="border px-4 py-2 ">
                            {item[318] ? parse(item[318]) : "-"}
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
      </div>
    </div>
  );
};

export default BillingDetail;
