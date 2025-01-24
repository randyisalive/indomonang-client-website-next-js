import { docuemnts_data } from "@/app/function/static_data";
import React from "react";
import { useExpatriateListContext } from "../../account/[profile]/[id]/context/ExpatriateListContext";
import DocumentTable from "./DocumentTable";

const ExpatriatesExport = () => {
  const { expatriates } = useExpatriateListContext();
  const th_array = [
    "Name",
    "Address",
    "Nationality",
    "Passport",
    "RPTKA",
    "Notifikasi",
    "VISA",
    "KITAS",
    "MERP",
    "STM",
    "SKTT",
    "LK",
    "SKJ",
    "EPO",
  ];
  return (
    <table className="w-full" style={{ fontSize: "8px" }}>
      <thead className="fixed-header">
        <tr>
          <th className="p-2 text-sm bg-whiteMain  border" colSpan={14}>
            Expatriate
          </th>
        </tr>
        <tr className=" text-xs">
          {th_array.map((i) => {
            return (
              <th className="p-3 font-bold text-center bg-whiteMain border ">
                {i}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {expatriates.map((item, index) => {
          return (
            <tr key={index}>
              <td className=" text-center border">{item[1082]}</td>
              <td className="text-center border">{item[1087]}</td>
              <td className=" text-center border">{item[1084]}</td>
              <td className=" text-center border">
                <DocumentTable
                  status={item[1413]}
                  noDoc={item[1154]}
                  expData={item[1161]}
                  remainingDays={item[1159]}
                />
              </td>
              <td className=" text-center border">
                <DocumentTable
                  status={item[1424]}
                  noDoc={item[1155]}
                  expData={item[1259]}
                  remainingDays={item[1260]}
                />
              </td>
              <td className=" text-center border">
                <DocumentTable
                  status={item[1423]}
                  noDoc={item[1156]}
                  expData={item[1275]}
                  remainingDays={item[1276]}
                />
              </td>
              <td className=" text-center border">
                <DocumentTable
                  status={item[1422]}
                  noDoc={item[1408]}
                  expData={item[1410]}
                  remainingDays={item[1411]}
                />
              </td>
              <td className=" text-center border">
                <DocumentTable
                  status={item[1421]}
                  noDoc={item[1157]}
                  expData={item[1257]}
                  remainingDays={item[1258]}
                />
              </td>
              <td className=" text-center border">
                <DocumentTable
                  status={item[1420]}
                  noDoc={item[1278]}
                  expData={item[1279]}
                  remainingDays={item[1281]}
                />
              </td>
              <td className=" text-center border">
                <DocumentTable
                  status={item[1419]}
                  noDoc={item[1283]}
                  expData={item[1285]}
                  remainingDays={item[1286]}
                />
              </td>
              <td className=" text-center border">
                <DocumentTable
                  status={item[1418]}
                  noDoc={item[1288]}
                  expData={item[1291]}
                  remainingDays={item[1303]}
                />
              </td>
              <td className="p-1 text-center border">
                <DocumentTable
                  status={item[1416]}
                  noDoc={item[1298]}
                  expData={item[1301]}
                  remainingDays={item[1308]}
                />
              </td>
              <td className="p-1 text-center border">
                <DocumentTable
                  status={item[1415]}
                  noDoc={item[1310]}
                  expData={item[1312]}
                  remainingDays={item[1313]}
                />
              </td>
              <td className="p-1 text-center border">
                {item[1315] || item[1290] ? (
                  <table className="w-full">
                    <tr>
                      <td className="text-center">{item[1315]}asasd</td>
                    </tr>
                    <tr>
                      <td className="text-center">{item[1290]}</td>
                    </tr>
                  </table>
                ) : (
                  <p className=" text-center text-red-500 font-bold">
                    NO PROCESS
                  </p>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ExpatriatesExport;
