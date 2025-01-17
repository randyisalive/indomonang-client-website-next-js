import StatusBadge from "@/app/components/ui/tableComponent/StatusBadge";
import { docuemnts_data } from "@/app/function/static_data";
import React from "react";

const StmCard = ({ data = {} }) => {
  return (
    <table className="min-w-full mt-3 text-sm" cellPadding={5}>
      <tbody>
        <tr>
          <td className="w-1/3">Status</td>
          <td>:</td>
          <td>
            {docuemnts_data
              .filter((item) => data.status === item.text)
              .map((i) => {
                return (
                  <StatusBadge
                    title={i.text}
                    bg_color={i.bg_color}
                    font_color="white"
                  />
                );
              })}
          </td>
        </tr>
        <tr>
          <td className="w-1/3">No. STM</td>
          <td>:</td>
          <td>{data.num}</td>
        </tr>
        <tr>
          <td className="w-1/3">Issuing Place</td>
          <td>:</td>
          <td>{data.issuingPlace}</td>
        </tr>
        <tr>
          <td className="w-1/3">Issuing Date</td>
          <td>:</td>
          <td>{data.issuingDate}</td>
        </tr>
        <tr>
          <td className="w-1/3">Expired Date</td>
          <td>:</td>
          <td>{data.expiredDate}</td>
        </tr>
        <tr>
          <td className="w-1/3">Remaining Days</td>
          <td>:</td>
          <td>
            {data.remainingDays} | {data.ymd}
          </td>
        </tr>
        <tr>
          <td className="w-1/3">STM</td>
          <td>:</td>
          <td>
            <label
              htmlFor=""
              className=" text-blue-500 cursor-pointer hover:underline"
            >
              {data.attachment}
            </label>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default StmCard;
