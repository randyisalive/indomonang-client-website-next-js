import api from "@/app/api/api";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useBillingContext } from "../../context/BillingContext";
import { useInvoiceContext } from "@/app/(main)/invoice/context/InvoiceContext";

const useBillingDetailsData = () => {
  // api
  const { InvoiceApi, WOApi } = api();
  const { id } = useParams(); // invoice ids
  const { getWoById } = WOApi();

  // billing context
  const { bills } = useBillingContext();
  const { handleDownloadInvoice, invoice: inv } = useInvoiceContext();

  // get datas billing
  const [billing, setBilling] = useState([]);
  const [isLoading, setIsLoading] = useState(0);
  const getBillingData = async () => {
    try {
      //const payment_data = await getPaymentById(bills_array.join(","));
      console.log(bills);
      const filtered_payment_data = bills.billing_data.filter((item) => {
        const ids = item.invoices_id.split(",");
        if (ids.includes(id)) {
          return item.invoices_id;
        }
      });
      setBilling(filtered_payment_data);
      setIsLoading(1);
      /* const invoice_data = await getInvoiceById(
          filtered_payment_data[0]?.invoices
        ); */

      const invoice_data = inv.filter((item) => item.main_ids === id);
      console.log(invoice_data);
      setInvoice(invoice_data);
      setIsLoading(2);
      const invoice_array = invoice_data.map((item) => {
        return item.wo_ids_val;
      });

      const wo_data = await getWoById(invoice_array.join(","));
      setWo(wo_data);
      setIsLoading(3);
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

  return { billing, wo, invoice, isLoading, handleDownloadInvoice };
};

export default useBillingDetailsData;
