"use client";
import HeaderComponent from "@/app/components/ui/HeaderComponent";
import StatusBadge from "@/app/components/ui/tableComponent/StatusBadge";
import { useParams } from "next/navigation";
import React from "react";

const BillingDetail = () => {
  const { id } = useParams();

  return (
    <div className="flex flex-col  w-full mx-auto pt-7 mb-10 sm:px-6, lg:px-0 max-w-screen-xl">
      <HeaderComponent
        title="Billing Details"
        breadcrumbs={`Portal Home / Billing / ${id}`}
      />
      <div className="flex flex-col border mt-5  bg-white shadow-md rounded-lg p-5 gap-3">
        <div className="flex items-center gap-2">
          <i className="pi pi-receipt font-light text-xl"></i>
          <span className="text-xl font-light m-0 p-0">Bills</span>
        </div>
        <div className="text-sm">
          <div className=" overflow-x-auto">
            <table className="min-w-fit w-fit mt-3 text-sm">
              <thead
                className="text-white"
                style={{ backgroundColor: "#9c1c23" }}
              >
                <tr>
                  <th className="text-start ps-6 border text-base" colSpan={2}>
                    WO-5
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2 font-bold">
                    Reference Number
                  </td>
                  <td className="border px-4 py-2 ">OZMUN</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-bold">Status</td>
                  <td className="border px-4 py-2 select-none">
                    <StatusBadge
                      title="Checking"
                      bg_color="green"
                      font_color="white"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-bold">Service</td>
                  <td className="border px-4 py-2 ">
                    APPROVAL CH (CLEARING HOUSE DITJEN IMIGRASI) (SINGLE ENTRY
                    VISA INDEX C)
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-bold">
                    Time Estimation
                  </td>
                  <td className="border px-4 py-2 ">31 October 2024 </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className=" overflow-x-auto">
            <table className="min-w-fit w-fit mt-3 text-sm">
              <thead
                className="text-white"
                style={{ backgroundColor: "#9c1c23" }}
              >
                <tr>
                  <th className="text-start ps-6 border text-base" colSpan={2}>
                    WO-5
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2 font-bold">
                    Reference Number
                  </td>
                  <td className="border px-4 py-2 ">OZMUN</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-bold">Status</td>
                  <td className="border px-4 py-2 select-none">
                    <StatusBadge
                      title="Checking"
                      bg_color="green"
                      font_color="white"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-bold">Service</td>
                  <td className="border px-4 py-2 ">
                    APPROVAL CH (CLEARING HOUSE DITJEN IMIGRASI) (SINGLE ENTRY
                    VISA INDEX C)
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-bold">
                    Time Estimation
                  </td>
                  <td className="border px-4 py-2 ">31 October 2024 </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="flex flex-col border mt-5  bg-white shadow-md rounded-lg p-5 gap-3">
        <div className="flex items-center gap-2">
          <i className="pi pi-receipt font-light text-xl"></i>
          <span className="text-xl font-light m-0 p-0">Invoices</span>
        </div>
        <div className="text-sm">
          <div className=" overflow-x-auto">
            <table className="min-w-fit w-fit mt-3 text-sm">
              <thead
                className="text-white"
                style={{ backgroundColor: "#9c1c23" }}
              >
                <tr>
                  <th className="text-start ps-6 border text-base" colSpan={2}>
                    WO-5
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2 font-bold">
                    Reference Number
                  </td>
                  <td className="border px-4 py-2 ">OZMUN</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-bold">Status</td>
                  <td className="border px-4 py-2 select-none">
                    <StatusBadge
                      title="Checking"
                      bg_color="green"
                      font_color="white"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-bold">Service</td>
                  <td className="border px-4 py-2 ">
                    APPROVAL CH (CLEARING HOUSE DITJEN IMIGRASI) (SINGLE ENTRY
                    VISA INDEX C)
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-bold">
                    Time Estimation
                  </td>
                  <td className="border px-4 py-2 ">31 October 2024 </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className=" overflow-x-auto">
            <table className="min-w-fit w-fit mt-3 text-sm">
              <thead
                className="text-white"
                style={{ backgroundColor: "#9c1c23" }}
              >
                <tr>
                  <th className="text-start ps-6 border text-base" colSpan={2}>
                    WO-5
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2 font-bold">
                    Reference Number
                  </td>
                  <td className="border px-4 py-2 ">OZMUN</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-bold">Status</td>
                  <td className="border px-4 py-2 select-none">
                    <StatusBadge
                      title="Checking"
                      bg_color="green"
                      font_color="white"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-bold">Service</td>
                  <td className="border px-4 py-2 ">
                    APPROVAL CH (CLEARING HOUSE DITJEN IMIGRASI) (SINGLE ENTRY
                    VISA INDEX C)
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-bold">
                    Time Estimation
                  </td>
                  <td className="border px-4 py-2 ">31 October 2024 </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="flex flex-col border mt-5  bg-white shadow-md rounded-lg p-5 gap-3">
        <div className="flex items-center gap-2">
          <i className="pi pi-receipt font-light text-xl"></i>
          <span className="text-xl font-light m-0 p-0">Order Details</span>
        </div>
        <div className="text-sm">
          <div className=" overflow-x-auto">
            <table className="min-w-fit w-fit mt-3 text-sm">
              <thead
                className="text-white"
                style={{ backgroundColor: "#9c1c23" }}
              >
                <tr>
                  <th className="text-start ps-6 border text-base" colSpan={2}>
                    WO-5
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2 font-bold">
                    Reference Number
                  </td>
                  <td className="border px-4 py-2 ">OZMUN</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-bold">Status</td>
                  <td className="border px-4 py-2 select-none">
                    <StatusBadge
                      title="Checking"
                      bg_color="green"
                      font_color="white"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-bold">Service</td>
                  <td className="border px-4 py-2 ">
                    APPROVAL CH (CLEARING HOUSE DITJEN IMIGRASI) (SINGLE ENTRY
                    VISA INDEX C)
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-bold">
                    Time Estimation
                  </td>
                  <td className="border px-4 py-2 ">31 October 2024 </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className=" overflow-x-auto">
            <table className="min-w-fit w-fit mt-3 text-sm">
              <thead
                className="text-white"
                style={{ backgroundColor: "#9c1c23" }}
              >
                <tr>
                  <th className="text-start ps-6 border text-base" colSpan={2}>
                    WO-5
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2 font-bold">
                    Reference Number
                  </td>
                  <td className="border px-4 py-2 ">OZMUN</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-bold">Status</td>
                  <td className="border px-4 py-2 select-none">
                    <StatusBadge
                      title="Checking"
                      bg_color="green"
                      font_color="white"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-bold">Service</td>
                  <td className="border px-4 py-2 ">
                    APPROVAL CH (CLEARING HOUSE DITJEN IMIGRASI) (SINGLE ENTRY
                    VISA INDEX C)
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-bold">
                    Time Estimation
                  </td>
                  <td className="border px-4 py-2 ">31 October 2024 </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingDetail;
