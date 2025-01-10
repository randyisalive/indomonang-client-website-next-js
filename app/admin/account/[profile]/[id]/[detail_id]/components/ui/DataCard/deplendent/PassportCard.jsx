import StatusBadge from "@/app/components/ui/tableComponent/StatusBadge";
import React from "react";

const PassportCard = ({ passportData = {} }) => {
  return (
    <table className="min-w-full mt-3 text-sm" cellPadding={5}>
      <tbody>
        {console.log(passportData)}
        <tr>
          <td className="w-1/3">Status</td>
          <td>:</td>
          <td>
            <StatusBadge title={passportData.statusPass} />
          </td>
        </tr>
        <tr>
          <td className="w-1/3">No. Passport</td>
          <td>:</td>
          <td>{passportData.passportNum}</td>
        </tr>
        <tr>
          <td className="w-1/3">Issuing Date</td>
          <td>:</td>
          <td>{passportData.issuingDate}</td>
        </tr>
        <tr>
          <td className="w-1/3">Expired Date</td>
          <td>:</td>
          <td>{passportData.expiredDate}</td>
        </tr>
        <tr>
          <td className="w-1/3">Passport</td>
          <td>:</td>
          <td>
            <label htmlFor="" className=" text-blue-500">
              <td>{passportData.attachment}</td>
            </label>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default PassportCard;
