import StatusBadge from "@/app/components/ui/tableComponent/StatusBadge";
import React from "react";

const PassportCard = ({ passportData = {} }) => {
  return (
    <table className="min-w-full mt-3 text-sm" cellPadding={5}>
      <tbody>
        <tr>
          <td className="w-1/3">Status</td>
          <td>:</td>
          <td>
            <StatusBadge title={passportData[1427]} />
          </td>
        </tr>
        <tr>
          <td className="w-1/3">No. Passport</td>
          <td>:</td>
          <td>{passportData[1318]}</td>
        </tr>
        <tr>
          <td className="w-1/3">Issuing Date</td>
          <td>:</td>
          <td>
            <StatusBadge title="Active" />
          </td>
        </tr>
        <tr>
          <td className="w-1/3">Expired Date</td>
          <td>:</td>
          <td>
            <StatusBadge title="Active" />
          </td>
        </tr>
        <tr>
          <td className="w-1/3">Passport</td>
          <td>:</td>
          <td>
            <label htmlFor="" className=" text-blue-500">
              passport.pdf
            </label>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default PassportCard;
