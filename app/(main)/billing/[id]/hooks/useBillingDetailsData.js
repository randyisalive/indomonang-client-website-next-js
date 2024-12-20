import api from "@/app/api/api";
import { useParams } from "next/navigation";
import { use, useEffect, useState } from "react";

const useBillingDetailsData = () => {
  // api
  const { PaymentApi, InvoiceApi, WOApi } = api();
  const { id } = useParams();
  const { getPaymentByNoInvoice, getPaymentById } = PaymentApi();
  const { getInvoiceById } = InvoiceApi();
  const { getWoById } = WOApi();
  // get datas billing
  const [billing, setBilling] = useState([]);
  const [isLoading, setIsLoading] = useState(0);
  const getBillingData = async () => {
    try {
      const payment_data = await getPaymentById(id);
      setBilling(payment_data);
      setIsLoading(1);
      const invoice_data = await getInvoiceById(
        payment_data[0]["1960_db_value"]
      );
      console.log(invoice_data);
      setInvoice(invoice_data);
      setIsLoading(2);
      const invoice_array = invoice_data.map((item) => {
        return item["1916_db_value"];
      });
      const wo_data = await getWoById(invoice_array.join(","));
      console.log(payment_data, invoice_data, wo_data);
      setWo(wo_data);
      setIsLoading(3);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getBillingData();
  }, [id]);
  // get datas billing

  const [wo, setWo] = useState([]);
  const [invoice, setInvoice] = useState([]);

  return { billing, wo, invoice, isLoading };
};

export default useBillingDetailsData;
