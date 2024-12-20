"use client";
import api from "@/app/api/api";
import useDecryptionKeyData from "@/app/hooks/useDecryptionKeyData";
import React, { useEffect, useState } from "react";

const useHomeCardContainerData = () => {
  // api
  const { WOApi, InvoiceApi, CustomerAccountApi } = api();
  const { getWoByUserId } = WOApi();
  const { getInvoiceByWo } = InvoiceApi();
  const { getAccountById } = CustomerAccountApi();

  // decryption
  const { user_id } = useDecryptionKeyData();

  // get data
  const [cardData, setCardData] = useState([]);
  const [isLoading, setIsLoading] = useState(0);
  const getData = async () => {
    try {
      if (user_id) {
        const account_data = await getAccountById(user_id);
        const wo_data = await getWoByUserId(account_data[0]["2630_db_value"]);
        const finished_order = wo_data.filter(
          (item) => item[2138] === "Finished"
        ).length;
        const wo_array = wo_data.map((item) => {
          return item.id;
        });
        const onGoingOrder = wo_data.filter((item) =>
          ["Open", "Drafting", "Checking", "Processing"].includes(item[2138])
        ).length;

        const invoice_data = await getInvoiceByWo(wo_array.join(","));
        const unpaid_invoices = invoice_data.filter(
          (item) => item[1905] === "Open"
        ).length;
        const card_data = [
          {
            id: 0,
            count: finished_order,
            sub: "Finish Orders",
            link: "/your-orders",
          },
          {
            id: 1,
            count: unpaid_invoices,
            sub: "Unpaid Invoices",
            link: "/your-orders",
          },
          {
            id: 2,
            count: onGoingOrder,
            sub: "On-going Orders",
            link: "/your-orders",
          },
          {
            id: 3,
            count: 0,
            sub: "View Tickets",
            link: "/tickets",
          },
        ];
        setCardData(card_data);
        setIsLoading(1);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getData();
  }, [user_id]);

  return { cardData, isLoading };
};

export default useHomeCardContainerData;
