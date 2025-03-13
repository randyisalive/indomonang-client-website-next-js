import { useActiveProductContext } from "@/app/Context/ActiveProductContext";
import PriorityBadge from "@/app/redesign/components/PriorityBadge";
import Status from "@/app/redesign/components/Status";
import React from "react";

const OrderProducts = () => {
  const { activeProduct } = useActiveProductContext();
  {
    console.log(activeProduct);
  }
  return (
    <>
      {activeProduct.map((item) => (
        <div
          className="flex flex-col text-sm w-full"
          style={{
            padding: "16px 12px",
            gap: "5px",
            border: "1px solid #EAEAEA",
          }}
        >
          <div className="flex justify-between">
            <span className="font-bold">{item.main_ids}</span>
            <div className=" flex gap-3" style={{ color: "#919CA7" }}>
              <Status
                title={`${item.status?.name}`}
                bg_color={`${item.status?.bg_color}`}
              />
              <PriorityBadge
                title={`${item.priority}`}
                bg_color="#E6FEF6"
                font_color="#28A745"
              />
            </div>
          </div>
          <div className="flex w-full" style={{ color: "#919CA7", gap: "8px" }}>
            <span style={{ width: "135px", height: "19px" }}>Service Name</span>
            <span style={{ width: "6px", height: "24px" }}>:</span>
            <span className="w-full font-bold text-black">
              APPROVAL DITJEN IMIGRASI (ALIH STATUS ITK - ITAS) (SPONSOR
              PERUSAHAAN)
            </span>
          </div>
          <div className="flex w-full" style={{ color: "#919CA7" }}>
            <span style={{ width: "135px", height: "19px" }}>
              4 February 2025
            </span>
            <span style={{ width: "6px", height: "24px" }}>14:33</span>
          </div>
        </div>
      ))}
    </>
  );
};

export default OrderProducts;
