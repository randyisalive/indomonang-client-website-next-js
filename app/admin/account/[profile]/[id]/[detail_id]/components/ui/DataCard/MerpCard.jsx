import StatusBadge from "@/app/components/ui/tableComponent/StatusBadge";
import React from "react";

const MerpCard = ({ merpData = {} }) => {
  return (
    <table className="min-w-full mt-3 text-sm" cellPadding={5}>
      <tbody>
        <tr>
          <td className="w-1/3">Status</td>
          <td>:</td>
          <td>
            <StatusBadge title={merpData[1427]} />
          </td>
        </tr>
        <tr>
          <td className="w-1/3">No. MERP</td>
          <td>:</td>
          <td>{merpData[1339]}</td>
        </tr>
        <tr>
          <td className="w-1/3">Issuing Place</td>
          <td>:</td>
          <td>{merpData[1384]}</td>
        </tr>
        <tr>
          <td className="w-1/3">Issuing Date</td>
          <td>:</td>
          <td>{merpData[1340]}</td>
        </tr>
        <tr>
          <td className="w-1/3">Expired Date</td>
          <td>:</td>
          <td>{merpData[1341]}</td>
        </tr>
        <tr>
          <td className="w-1/3">Remaining Days</td>
          <td>:</td>
          <td>
            {merpData[1342]} | {merpData[1343]}
          </td>
        </tr>
        <tr>
          <td className="w-1/3">Passport</td>
          <td>:</td>
          <td>
            <label htmlFor="" className=" text-blue-500">
              {merpData[2284]}
            </label>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default MerpCard;
