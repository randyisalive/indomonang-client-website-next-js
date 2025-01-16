import React from "react";
import { useCompanyDocumentContext } from "../context/CompanyDocumentContext";
import StatusBadge from "@/app/components/ui/tableComponent/StatusBadge";

const DocumentsList = ({ visitors = [] }) => {
  const th_array = [
    "No",
    "Document No.",
    "Status",
    "Document Name",
    "Expired Date",
    "Remaining Days",
    "Attachment",
  ];

  const { documentData } = useCompanyDocumentContext();
  console.log(documentData);

  return (
    <table className="min-w-1/2 w-full  text-xs">
      <thead className="text-white" style={{ backgroundColor: "#9c1c23" }}>
        <tr>
          <th className="text-start ps-6 text-base border" colSpan={7}>
            Company Documents List
          </th>
        </tr>
        <tr className="border">
          {th_array.map((item) => {
            return (
              <th
                key={item}
                className=" border text-start px-4 py-2  text-black"
                style={{ backgroundColor: "#f3f4f6" }}
              >
                {item}
              </th>
            );
          })}
        </tr>
      </thead>

      <tbody>
        {documentData.map((item, index) => {
          return (
            <tr key={item.id}>
              <td className="border px-4 py-2 text-center">{index + 1}</td>
              <td className="border px-4 py-2 ">{item[1293]}</td>
              <td className="border px-4 py-2 ">
                <div className="flex w-full justify-center">
                  <StatusBadge title={item[1296]} />
                </div>
              </td>
              <td className="border px-4 py-2 ">{item[1292]}</td>
              <td className="border px-4 py-2 ">{item[1306]}</td>
              <td className="border px-4 py-2 ">{item[1307]}</td>
              <td className="border px-4 py-2 ">{item[1309]}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default DocumentsList;
