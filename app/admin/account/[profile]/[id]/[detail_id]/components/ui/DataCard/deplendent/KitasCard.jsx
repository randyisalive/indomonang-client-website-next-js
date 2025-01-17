import StatusBadge from "@/app/components/ui/tableComponent/StatusBadge";
import { docuemnts_data } from "@/app/function/static_data";
import React from "react";

const KitasCard = ({ kitasData = {} }) => {
  return (
    <table className="min-w-full mt-3 text-sm" cellPadding={5}>
      <tbody>
        <tr>
          <td className="w-1/3">Status</td>
          <td>:</td>
          <td>
            {docuemnts_data
              .filter((item) => kitasData.status === item.text)
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
          <td className="w-1/3">No. KITAS</td>
          <td>:</td>
          <td>{kitasData.num}</td>
        </tr>
        <tr>
          <td className="w-1/3">Issuing Place</td>
          <td>:</td>
          <td>
            <td>{kitasData.issuingPlace}</td>
          </td>
        </tr>
        <tr>
          <td className="w-1/3">Issuing Date</td>
          <td>:</td>
          <td>
            <td>{kitasData.issuingDate}</td>
          </td>
        </tr>
        <tr>
          <td className="w-1/3">Expired Date</td>
          <td>:</td>
          <td>
            <td>{kitasData.expiredDate}</td>
          </td>
        </tr>
        <tr>
          <td className="w-1/3">Remaining Days</td>
          <td>:</td>
          <td>
            <td>{kitasData.ymd}</td>
          </td>
        </tr>
        <tr>
          <td className="w-1/3">KITAS</td>
          <td>:</td>
          <td>
            <label htmlFor="" className=" text-blue-500">
              {kitasData.attachment}
            </label>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default KitasCard;
