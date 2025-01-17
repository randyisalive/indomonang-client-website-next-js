import React from "react";
import StatusBadge from "@/app/components/ui/tableComponent/StatusBadge";
import Link from "next/link";
import { useExpatriateListContext } from "../context/ExpatriateListContext";
import { docuemnts_data } from "@/app/function/static_data";

const ExpatriateList = () => {
  const th_array = ["Status", "Name", "Job Title", "Gender", "Nationality"];

  const { expatriates } = useExpatriateListContext();

  return (
    <table className="min-w-1/2 w-full mt-3 text-sm">
      <thead className="text-white" style={{ backgroundColor: "#9c1c23" }}>
        <tr>
          <th className="text-start ps-6 text-base border" colSpan={6}>
            Expatriate List
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
        {expatriates.map((item) => {
          return (
            <tr key={item.id}>
              <td className="border px-4 py-2 font-bold">
                <div className=" flex w-full justify-center items-center">
                  {docuemnts_data
                    .filter((i) => i.text === item[1289])
                    .map((i) => (
                      <StatusBadge
                        title={i.text}
                        bg_color={i.bg_color}
                        font_color="white"
                      />
                    ))}
                </div>
              </td>
              <td className="border px-4 py-2 text-blue-500 hover:underline cursor-pointer">
                <div>
                  <Link href={`./Expatriate/${item.id}`}> {item[1082]}</Link>
                </div>
              </td>
              <td className="border px-4 py-2 font-bold">{item[1085]}</td>
              <td className="border px-4 py-2 font-bold">{item[1083]}</td>
              <td className="border px-4 py-2 font-bold">{item[1084]}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ExpatriateList;
