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
        let unpaid_invoices = 0;
        if (wo_array.length > 0) {
          const invoice_data = await getInvoiceByWo(wo_array.join(","));

          unpaid_invoices = invoice_data.filter((item) =>
            ["Arrived to Client"].includes(item[1905])
          ).length;
          console.log(
            invoice_data.filter((item) =>
              ["Arrived to Client"].includes(item[1905])
            )
          );
        }

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
            font_color: "#008000",
            color: "#E3FFE3",
            icon: "pi pi-check",
          },
          {
            id: 1,
            count: unpaid_invoices,
            sub: "Unpaid Invoices",
            font_color: "#BF0603",
            link: "/billing",
            color: "#FCF4F4",
            icon: "pi pi-receipt",
          },
          {
            id: 2,
            count: onGoingOrder,
            sub: "On-going Orders",
            font_color: "#FEC53D",
            color: "#FFFAEF",
            link: "/your-orders",
            icon: "pi pi-shopping-cart ",
          },
          /* {
            id: 3,
            count: tickets_filtered,
            sub: "View Tickets",
            link: "/tickets/list",
          }, */
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
