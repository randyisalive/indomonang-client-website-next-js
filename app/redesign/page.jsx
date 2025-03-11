import React from "react";
import RecentOrderCardOne from "./components/RecentCardOrder/RecentOrderCardOne";
import RecentOrderCardTwo from "./components/RecentCardOrder/RecentOrderCardTwo";
import Status from "./components/Status";
import PriorityBadge from "./components/PriorityBadge";
import DeliveryBadge from "./components/DeliveryBadge";

const RedesignPage = () => {
  return (
    <div className=" flex justify-center flex-col w-full items-center">
      <div className="flex w-1/2 flex-col">
        <span className=" text-xl font-bold"> Recent Order Card</span>
        <ul className="flex flex-col  gap-3 mt-3">
          <li className="flex flex-col gap-3">
            <RecentOrderCardOne />
          </li>
        </ul>
      </div>
      <div className="flex w-1/2 flex-col my-3">
        <span className=" text-xl font-bold"> Status Badge</span>
        <ul className="flex flex-col  gap-3 mt-3">
          <li className="flex gap-3">
            <Status title="Open" bg_color=" bg-mainBlue" />
            <Status title="Drafting" bg_color=" bg-mainOrage" />
            <Status title="Checking" bg_color=" bg-secondaryBrown" />
            <Status title="Cancelled" bg_color=" bg-mainRed" />
            <Status title="Processing" bg_color=" bg-secondaryBlue" />
            <Status title="Finished" bg_color=" bg-mainGreen" />
          </li>
        </ul>
      </div>
      <div className="flex w-1/2 flex-col my-3">
        <span className=" text-xl font-bold"> Priority Badge</span>
        <ul className="flex flex-col  gap-3 mt-3">
          <li className="flex gap-3">
            <PriorityBadge
              title="Normal"
              bg_color="#E6FEF6"
              font_color="#28A745"
            />
            <PriorityBadge
              title="Super Urgent"
              bg_color="#FFEBEB"
              font_color="#D33030"
            />
            <PriorityBadge
              title="Urgent"
              bg_color="#FFF6EF"
              font_color="#FF8400"
            />
          </li>
        </ul>
      </div>
      <div className="flex w-1/2 flex-col my-3">
        <span className=" text-xl font-bold"> Delivery Status Badge</span>
        <ul className="flex flex-col  gap-3 mt-3">
          <li className=" flex gap-3">
            <DeliveryBadge
              bg_color="#E6FEF6"
              title="Delivered"
              font_color="#28A745"
            />
            <DeliveryBadge
              bg_color="#FFF6EF"
              title="On Delivery"
              font_color="#FF8400"
            />
            <DeliveryBadge
              bg_color="#E7F2FF"
              title="Open"
              font_color="#007BFF"
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RedesignPage;
