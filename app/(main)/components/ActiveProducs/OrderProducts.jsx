import StatusBadge from "@/app/components/ui/tableComponent/StatusBadge";
import { useActiveProductContext } from "@/app/Context/ActiveProductContext";
import { enquiry_data } from "@/app/function/static_data";
import React from "react";

const OrderProducts = () => {
  const { activeProduct, role } = useActiveProductContext();
  return (
    <>
      {activeProduct.map((item) => (
        <div key={item.id} className="w-full items-center flex p-2 border-b">
          <div className="w-1/3 flex flex-col">
            {item[2134]}
            <span className="text-xs text-gray-400 font-bold">
              Date Added: {item.date_added}
            </span>
            {role === "Admin" && (
              <span className="text-xs text-gray-400 font-bold">
                Created By: {item[309]}
              </span>
            )}
          </div>
          <div className="w-1/3">
            {enquiry_data
              .filter((x) => x.text === item[2138])
              .map((i) => {
                return (
                  <StatusBadge
                    key={i}
                    title={i.text}
                    bg_color={i.bg_color}
                    font_color="white"
                  />
                );
              })}
          </div>
          <div className="w-1/3"> {item[674]}</div>
        </div>
      ))}
    </>
  );
};

export default OrderProducts;
