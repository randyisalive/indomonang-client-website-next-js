"use client";
import { useAccountDataContext } from "@/app/admin/context/AccountDataContext";
import api from "@/app/api/api";
import React, { useEffect, useState } from "react";
import { useWoContext } from "../your-orders/context/WoContext";

const useHomeCardContainerData = () => {
  // api
  const { WOApi, InvoiceApi, CustomerAccountApi, TicketsApi } = api();
  const { getWoByUserId, getWoAll } = WOApi();
  const { getInvoiceByWo } = InvoiceApi();
  const { getAccountById } = CustomerAccountApi();
  const { getTicketsByUserId, getTicketsAll } = TicketsApi();

  // decryption
  const { accounts, role } = useAccountDataContext();
  const { wo } = useWoContext();

  // get data
  const [cardData, setCardData] = useState([]);
  const [isLoading, setIsLoading] = useState(0);
  const getData = async () => {
    try {
      if (accounts.id) {
        const finished_order = wo.filter(
          (item) => item.status?.name === "Finished"
        ).length;

        const wo_array = wo.map((item) => {
          return item.id;
        });
        const onGoingOrder = wo.filter((item) =>
          ["Open", "Drafting", "Checking", "Processing"].includes(
            item.status?.name
          )
        ).length;

        const invoice_data = await getInvoiceByWo(wo_array.join(","));
        const unpaid_invoices = invoice_data.filter((item) =>
          ["Approved", "Delivered", "Arrived to Client"].includes(item[1905])
        ).length;
        let tickets_data;
        if (role === "Admin") {
          tickets_data = await getTicketsAll();
        } else {
          tickets_data = await getTicketsByUserId(accounts.id);
        }
        const tickets_filtered = tickets_data.map((item) =>
          ["Open", "On Progress"].includes(item[2467])
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
            link: "/billing",
          },
          {
            id: 2,
            count: onGoingOrder,
            sub: "On-going Orders",
            link: "/your-orders",
          },
          {
            id: 3,
            count: tickets_filtered,
            sub: "View Tickets",
            link: "/tickets/list",
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
  }, [accounts.id, wo, role]);

  return { cardData, isLoading, role, accounts };
};

export default useHomeCardContainerData;
