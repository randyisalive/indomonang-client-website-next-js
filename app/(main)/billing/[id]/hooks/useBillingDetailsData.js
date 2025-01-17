import api from "@/app/api/api";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useBillingContext } from "../../context/BillingContext";

const useBillingDetailsData = () => {
  // api
  const { InvoiceApi, WOApi } = api();
  const { id } = useParams();
  const { getInvoiceById } = InvoiceApi();
  const { getWoById } = WOApi();

  // billing context
  const { bills } = useBillingContext();
  // get datas billing
  const [billing, setBilling] = useState([]);
  const [isLoading, setIsLoading] = useState(0);
  const getBillingData = async () => {
    try {
      //const payment_data = await getPaymentById(bills_array.join(","));
      const filtered_payment_data = bills.billing_data.filter(
        (item) => item.id === id
      );
      if (filtered_payment_data.length > 0) {
        setBilling(filtered_payment_data);
        setIsLoading(1);
        const invoice_data = await getInvoiceById(
          filtered_payment_data[0]?.invoices
        );
        setInvoice(invoice_data);
        setIsLoading(2);
        const invoice_array = invoice_data.map((item) => {
          return item["1916_db_value"];
        });
        const wo_data = await getWoById(invoice_array.join(","));
        setWo(wo_data);
        setIsLoading(3);
      } else {
        throw new Error("Payment Data Not Found");
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getBillingData();
  }, [id, bills]);
  // get datas billing

  const [wo, setWo] = useState([]);
  const [invoice, setInvoice] = useState([]);

  return { billing, wo, invoice, isLoading };
};

export default useBillingDetailsData;
