import { docuemnts_data } from "@/app/function/static_data";
import React from "react";

const DocumentTable = ({
  status = "",
  noDoc = "",
  expData = "",
  remainingDays = "",
}) => {
  return (
    <>
      {noDoc ? (
        <table
          className="w-full "
          cellPadding={0}
          cellSpacing={0}
          style={{ fontSize: "6px" }}
        >
          <tbody>
            <tr>
              <td className=" font-bold text-start">Status: </td>
              <td className="text-end">
                <div className="w-full  flex justify-end">
                  {docuemnts_data
                    .filter((i) => i.text === status)
                    .map((x) => (
                      <p
                        key={x.id}
                        className="font-bold"
                        style={{ color: x.bg_color }}
                      >
                        {status}
                      </p>
                    ))}
                </div>
              </td>
            </tr>
            <tr>
              <td className=" font-bold text-start">No. Doc: </td>
              <td className="text-end">{noDoc}</td>
            </tr>
            <tr>
              <td className=" font-bold text-start">Exp Date: </td>
              <td className="text-end">{expData}</td>
            </tr>
            <tr>
              <td className=" font-bold text-start">Remaining Days:</td>
              <td className="text-end">{remainingDays}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p className="text-center text-red-500 font-bold">NO PROCESS</p>
      )}
    </>
  );
};

export default DocumentTable;
