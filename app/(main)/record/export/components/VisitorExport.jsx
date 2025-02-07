import React from "react";
import DocumentTable from "./DocumentTable";
import { useVisitorsListContext } from "@/app/admin/account/[profile]/[id]/context/VisitorsListContext";

const VisitorExport = () => {
  const { visitors } = useVisitorsListContext();
  const visitors_sort = visitors.sort((a, b) => a[1442].localeCompare(b[1442]));
  const th_array = [
    "Name",
    "Address",
    "Nationality",
    "Passport",
    "VISA",
    "ITK",
    "SKJ",
  ];
  return (
    <table className="w-2/3" style={{ fontSize: "8px" }}>
      <thead className="fixed-header">
        <tr>
          <th className="p-2 bg-whiteMain border text-sm" colSpan={8}>
            Visitors
          </th>
        </tr>
        <tr className=" text-xs">
          {th_array.map((i) => {
            return (
              <th className="p-3 font-bold text-center bg-whiteMain border">
                {i}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {visitors_sort.map((i, index) => {
          return (
            <React.Fragment key={index}>
              <tr>
                <td className="p-1  border text-center">{i[1442]}</td>
                <td className="p-1 text-center border">
                  {i[1447] === "" ? (
                    i[1447]
                  ) : (
                    <p className=" text-red-500 font-bold">NO ADDRESS</p>
                  )}
                </td>
                <td className="p-1 text-center border">{i[1444]}</td>
                <td className="p-1 text-start border">
                  <DocumentTable
                    status={i[1484]}
                    noDoc={i[1480]}
                    expData={i[1483]}
                    remainingDays={i[1481]}
                  />
                </td>
                <td className="p-1 text-start border">
                  <DocumentTable
                    status={i[1432]}
                    noDoc={i[1321]}
                    expData={i[1327]}
                    remainingDays={i[1328]}
                  />
                </td>
                <td className="p-1 text-start border">
                  <DocumentTable
                    status={i[1428]}
                    noDoc={i[1339]}
                    expData={i[1341]}
                    remainingDays={i[1342]}
                  />
                </td>
                <td className="p-1 text-start border">
                  <DocumentTable
                    status={i[1430]}
                    noDoc={i[1344]}
                    expData={i[1346]}
                    remainingDays={i[1347]}
                  />
                </td>
              </tr>
            </React.Fragment>
          );
        })}
      </tbody>
    </table>
  );
};

export default VisitorExport;
