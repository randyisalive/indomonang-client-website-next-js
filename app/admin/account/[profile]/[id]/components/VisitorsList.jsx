import React from "react";
import { useVisitorsListContext } from "../context/VisitorsListContext";
import StatusBadge from "@/app/components/ui/tableComponent/StatusBadge";
import Link from "next/link";

const VisitorsList = () => {
  const th_array = ["Status", "Name", "Date of Birth", "Gender", "Nationality"];
  const { visitors } = useVisitorsListContext();
  return (
    <table className="min-w-1/2 w-full mt-3 text-sm">
      <thead className="text-white" style={{ backgroundColor: "#9c1c23" }}>
        <tr>
          <th className="text-start ps-6 text-base border" colSpan={6}>
            Visitors List
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
        {visitors.map((item) => {
          return (
            <tr key={item.id}>
              <td className="border px-4 py-2 font-bold">
                <StatusBadge title={item[1454]} />
              </td>
              <td className="border px-4 py-2 text-blue-500 hover:underline cursor-pointer">
                <div>
                  <Link href={`./Visitors/${item.id}`}> {item[1442]}</Link>
                </div>
              </td>
              <td className="border px-4 py-2 ">{item[1446]}</td>
              <td className="border px-4 py-2 font-bold">{item[1443]}</td>
              <td className="border px-4 py-2 font-bold">{item[1444]}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default VisitorsList;
