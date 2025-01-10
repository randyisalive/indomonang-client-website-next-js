import React from "react";
import { useDependentListContext } from "../context/DependentListContext";
import StatusBadge from "@/app/components/ui/tableComponent/StatusBadge";
import Link from "next/link";

const DependentList = () => {
  const th_array = [
    "Status",
    "Name",
    "Gender",
    "Nationality",
    "Relationship",
    "Expatriate",
  ];
  const { dependent } = useDependentListContext();
  return (
    <table className="min-w-1/2 w-full my-3 text-sm">
      <thead className="text-white" style={{ backgroundColor: "#9c1c23" }}>
        <tr>
          <th className="text-start ps-6 text-base border" colSpan={6}>
            Dependent List
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
        {dependent.map((item) => {
          return (
            <tr key={item.id}>
              <td className="border px-4 py-2 font-bold">
                <StatusBadge title={item[1390]} />
              </td>
              <td className="border px-4 py-2 text-blue-500 hover:underline cursor-pointer">
                <div>
                  <Link href={`./Dependent/${item.id}`}> {item[1100]}</Link>
                </div>
              </td>
              <td className="border px-4 py-2 ">{item[1101]}</td>
              <td className="border px-4 py-2 ">{item[1102]}</td>
              <td className="border px-4 py-2 ">{item[1096]}</td>
              <td className="border px-4 py-2 ">{item[1317]}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default DependentList;
