import StatusBadge from "@/app/components/ui/tableComponent/StatusBadge";
import { truncateString } from "@/app/function/TruncateString";
import React from "react";

const VisaCard = ({ visaData = {} }) => {
  return (
    <table className="min-w-full mt-3 text-sm" cellPadding={5}>
      <tbody>
        <tr>
          <td className="w-1/3">Status</td>
          <td>:</td>
          <td>
            <StatusBadge title={visaData.statusVisa} />
          </td>
        </tr>
        <tr>
          <td className="w-1/3">No. Visa</td>
          <td>:</td>
          <td>{visaData.visaNumber}</td>
        </tr>
        <tr>
          <td className="w-1/3">Issuing Date</td>
          <td>:</td>
          <td>{visaData.issuingData}</td>
        </tr>
        <tr>
          <td className="w-1/3">Expired Date</td>
          <td>:</td>
          <td>{visaData.expiredDate}</td>
        </tr>
        <tr>
          <td className="w-1/3">Remaining Days</td>
          <td>:</td>
          <td>
            {visaData.remainingDays} | {visaData.ymd}
          </td>
        </tr>
        <tr>
          <td className="w-1/3">Visa</td>
          <td>:</td>
          <td>
            <label
              htmlFor=""
              className=" text-blue-500 hover:underline cursor-pointer"
            >
              {visaData.attachment ? visaData.attachment : "-"}
            </label>
          </td>
        </tr>{" "}
        <tr>
          <td className="w-1/3 align-top">Purpose</td>
          <td className=" align-top">:</td>
          <td className="flex align-bottom justify-end">
            <p className="text-xs ">
              {truncateString(visaData.purpose ?? "", 100)}
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default VisaCard;
