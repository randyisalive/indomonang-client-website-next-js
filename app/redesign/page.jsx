import React from "react";
import RecentOrderCardOne from "./components/RecentCardOrder/RecentOrderCardOne";
import RecentOrderCardTwo from "./components/RecentCardOrder/RecentOrderCardTwo";

const RedesignPage = () => {
  return (
    <div className=" flex justify-center">
      <div>
        <span className=" text-xl font-bold"> Recent Order Card</span>
        <ul className="flex flex-col  gap-3 mt-3">
          <li className="flex flex-col gap-3">
            <span>Type 1</span> <RecentOrderCardOne />
          </li>
          <li className="flex flex-col gap-3">
            <span>Type 2</span> <RecentOrderCardTwo />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RedesignPage;
