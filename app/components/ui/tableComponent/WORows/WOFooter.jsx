import { useAccountDataContext } from "@/app/admin/context/AccountDataContext";
import React from "react";

const WOFooter = ({ currentRows = [], all_data = [] }) => {
  // role
  const { role } = useAccountDataContext();
  const rating_total = all_data
    .filter((item) => item.rating != 0)
    .reduce((acc, item) => {
      return acc + parseInt(item.rating ? item.rating : 0);
    }, 0);

  const rating_avg =
    rating_total / all_data.filter((item) => item.rating > 0).length;
  if (role === "Admin") {
    return (
      <tr>
        <td colSpan={6} className="text-start font-bold border px-4 py-2">
          Customer Ratings:
          <p className="font-normal mt-1">
            Rating AVG: {rating_avg.toFixed(2)}
            <i className="pi pi-star ms-1"></i>
          </p>
        </td>
        <td
          colSpan={2}
          className="border px-4 py-2  items-center text-center font-bold "
        ></td>
      </tr>
    );
  }
};

export default WOFooter;
