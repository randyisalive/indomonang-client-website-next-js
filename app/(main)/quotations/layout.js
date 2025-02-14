import React from "react";
import { QuotationProvider } from "./context/QuotationsContext";

const QuotationLayout = ({ children }) => {
  return (
    <div>
      <QuotationProvider>{children}</QuotationProvider>
    </div>
  );
};

export default QuotationLayout;
