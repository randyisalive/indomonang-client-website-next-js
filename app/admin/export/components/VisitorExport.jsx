import React from "react";
import { useVisitorsListContext } from "../../account/[profile]/[id]/context/VisitorsListContext";
import DocumentTable from "./DocumentTable";

const VisitorExport = () => {
  const { visitors } = useVisitorsListContext();
  console.log(visitors);
  return (
    <table className="w-2/3" style={{ fontSize: "8px" }}>
      <thead className="fixed-header">
        <tr>
          <th
            className="p-2 text-white text-sm"
            style={{ backgroundColor: "#9C1C23" }}
            colSpan={8}
          >
            Visitors
          </th>
        </tr>
        <tr className=" text-xs">
          <th className="p-3 font-bold text-center bg-gray-500 border">Name</th>
          <th className="p-3 font-bold text-center bg-gray-500 border">
            Address
          </th>
          <th className="p-3 font-bold text-center bg-gray-500 border">
            Nationality
          </th>
          <th className="p-3 font-bold text-center bg-gray-500 border">
            Passport
          </th>
          <th className="p-3 font-bold text-center bg-gray-500 border">VISA</th>
          <th className="p-3 font-bold text-center bg-gray-500 border">ITK</th>
          <th className="p-3 font-bold text-center bg-gray-500 border">SKJ</th>
        </tr>
      </thead>
      <tbody>
        {visitors.map((i, index) => {
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
