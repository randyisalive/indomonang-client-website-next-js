"use client";
import React from "react";
import TableComponentNew from "../../components/TableComponentNew";
import { useQuotationContext } from "../context/QuotationsContext";
import StatusBadge from "@/app/components/ui/tableComponent/StatusBadge";
import { quotation_status } from "@/app/function/static_data";
import QuotationSection from "./QuotationSection";
import Link from "next/link";
import { useDecryptionContext } from "@/app/Context/DecryptionContext";
import { ProgressSpinner } from "primereact/progressspinner";

const QuotationTable = () => {
  const { quotations, download_client_approval } = useQuotationContext();

  const columns_array = [
    {
      header: "Quotation ID",
      key: "quotation-id",
      render: (row) => {
        return (
          <span className="" onClick={() => download_client_approval(row.id)}>
            {row[434]}
          </span>
        );
      },
    },

    {
      header: "Quote Status",
      key: "441",
      render: (row) => {
        const filtered_data = quotation_status.filter(
          (item) => item.text === row[441]
        );
        return (
          <>
            {filtered_data.map((i) => {
              return (
                <StatusBadge
                  title={i.text}
                  font_color="white"
                  bg_color={i.bg_color}
                />
              );
            })}
          </>
        );
      },
    },
    { header: "Expiration Date", key: "614" },
    {
      header: "Sub Total",
      key: "3199",
      render: (row) => {
        return (
          <span className=" text-green-500 font-bold text-end">
            Rp. {parseInt(row[3199]).toLocaleString()} ,-
          </span>
        );
      },
    },
    {
      header: "Action",
      key: "",
      render: (row) => {
        return (
          <>
            <div className="flex gap-3">
              <Link
                href={`quotations/${row[3238]}`}
                className=" text-blue-500 text-sm cursor-pointer hover:underline"
              >
                View
              </Link>
            </div>
          </>
        );
      },
    },
  ];
  return (
    <div>
      {quotations === 0 ? (
        <div className=" my-5 p-3 flex justify-center items-center">
          <ProgressSpinner />
        </div>
      ) : (
        <React.Fragment>
          <QuotationSection data={quotations} />
          <TableComponentNew
            numbering={true}
            data={quotations}
            columns={columns_array}
            title=""
          />
        </React.Fragment>
      )}
    </div>
  );
};

export default QuotationTable;
