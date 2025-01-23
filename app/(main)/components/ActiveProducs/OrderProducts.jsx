import StatusBadge from "@/app/components/ui/tableComponent/StatusBadge";
import { useActiveProductContext } from "@/app/Context/ActiveProductContext";
import { enquiry_data, priority_data } from "@/app/function/static_data";
import React from "react";

const OrderProducts = () => {
  const { activeProduct } = useActiveProductContext();
  return (
    <>
      {activeProduct.map((item) => (
        <div key={item.id} className="w-full items-center flex p-2 border-b">
          <div className="w-1/3 flex flex-col">
            {item.ref_num}
            <span className="text-xs text-gray-400 font-bold">
              Date: {item.date_added}
            </span>
          </div>
          <div className="w-1/3 flex justify-center">
            <StatusBadge
              title={item.status?.name}
              bg_color={item.status?.bg_color}
              font_color="white"
            />
          </div>
          <div className="w-1/3  flex justify-center">
            {priority_data
              .filter((i) => i.text === item.priority)
              .map((x) => (
                <StatusBadge title={x.text} bg_color={x.bg_color} />
              ))}
          </div>
          <div className="w-1/3 "> {item.service}</div>
        </div>
      ))}
    </>
  );
};

export default OrderProducts;
