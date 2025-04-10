import { useActiveProductContext } from "@/app/Context/ActiveProductContext";
import PriorityBadge from "@/app/redesign/components/PriorityBadge";
import Status from "@/app/redesign/components/Status";
import React from "react";

const OrderProducts = () => {
  const { activeProduct } = useActiveProductContext();

  return (
    <>
      {activeProduct.map((item) => (
        <div
          className="flex flex-col text-[16px] w-full gap-[10px]"
          style={{
            padding: "16px 12px",
            border: "1px solid #EAEAEA",
          }}
        >
          <div className="flex justify-between ">
            <span className="font-[600] ">{item.main_ids}</span>
            <div className=" flex gap-3" style={{ color: "#919CA7" }}>
              <Status
                title={`${item.status?.text}`}
                bg_color={`${item.status?.bg_color}`}
              />
              <PriorityBadge
                title={`${item.priority?.text}`}
                bg_color={`${item.priority?.bg_color}`}
                font_color={`${item.priority?.font_color}`}
              />
            </div>
          </div>
          <div className="flex w-full" style={{ color: "#919CA7", gap: "8px" }}>
            <span style={{ width: "135px", height: "19px" }}>Service Name</span>
            <span style={{ width: "6px", height: "24px" }}>:</span>
            <span className="w-full font-bold text-black">{item.service}</span>
          </div>
          <div className="flex w-full" style={{ color: "#919CA7" }}>
            <span style={{ width: "135px", height: "19px" }}>
              {item.date_added.split(" ").slice(0, 3).join(" ")}
            </span>
            <span style={{ width: "6px", height: "24px" }}>
              {item.date_added.split(" ").slice(3, 4).join(" ")}
            </span>
          </div>
        </div>
      ))}
    </>
  );
};

export default OrderProducts;
