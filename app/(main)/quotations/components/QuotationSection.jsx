import NumberFlow from "@number-flow/react";
import React from "react";
import { useQuotationContext } from "../context/QuotationsContext";

const QuotationSection = ({ data = [] }) => {
  const { quotations } = useQuotationContext();
  let grand_total = 0;
  if (quotations?.length > 0) {
    grand_total = quotations?.reduce((acc, item) => {
      const total = acc + parseInt(item[3199]);
      return total;
    }, 0);
  }

  return (
    <div className="p-5 flex justify-center">
      <div className="flex gap-2 flex-col ">
        <NumberFlow
          value={grand_total}
          className=" text-4xl"
          prefix="Rp. "
          suffix=" ,-"
        />
        <span className="text-center">Grand Total</span>
      </div>
    </div>
  );
};

export default QuotationSection;
