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
  // const { getTicketsByUserId, getTicketsAll } = TicketsApi();

  // parameters
  const { accounts, role } = useAccountDataContext();
  const { wo } = useWoContext();

  // get data
  const [cardData, setCardData] = useState([]);
  const [isLoading, setIsLoading] = useState(0);

  const getData = async () => {
    try {
      if (accounts.data.id && wo.data.length > 0) {
        const finished_order = wo.data.filter(
          (item) => item.status?.text === "Finished"
        ).length;

        const wo_array = wo.data.map((item) => {
          return item.id;
        });
        const onGoingOrder = wo.data.filter((item) =>
          ["Open", "Drafting", "Checking", "Processing"].includes(
            item.status?.text
          )
        ).length;
        let unpaid_invoices = 0;

        if (wo_array.length > 0) {
          const invoice_data = await getInvoiceByWo(wo_array.join(","));
          console.log("invoice home:", invoice_data);

          unpaid_invoices = invoice_data.data.filter((item) =>
            ["Arrived to Client"].includes(item[1905])
          ).length;
        } else {
          unpaid_invoices = 0;
        }

        /* let tickets_data;
        if (role === "Admin") {
          tickets_data = await getTicketsAll();
        } else {
          tickets_data = await getTicketsByUserId(accounts.id);
        }
        const tickets_filtered = tickets_data.map((item) =>
          ["Open", "On Progress"].includes(item[2467])
        ).length; */
        const card_data = [
          {
            id: 0,
            count: finished_order,
            sub: "Finish Orders",
            link: "/your-orders",
            font_color: "#008000",
            color: "#E3FFE3",
            icon: "/checkmark.png",
          },
          {
            id: 1,
            count: unpaid_invoices,
            sub: "Unpaid Invoices",
            font_color: "#BF0603",
            link: "/billing",
            color: "#FCF4F4",
            icon: "/unpaid_invoices.png",
          },
          {
            id: 2,
            count: onGoingOrder,
            sub: "On-going Orders",
            font_color: "#FEC53D",
            color: "#FFFAEF",
            link: "/your-orders",
            icon: "/orders.png",
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
      const card_data = [
        {
          id: 0,
          count: 0,
          sub: "Finish Orders",
          link: "/your-orders",
          font_color: "#008000",
          color: "#E3FFE3",
          icon: "/checkmark.png",
        },
        {
          id: 1,
          count: 0,
          sub: "Unpaid Invoices",
          font_color: "#BF0603",
          link: "/billing",
          color: "#FCF4F4",
          icon: "/unpaid_invoices.png",
        },
        {
          id: 2,
          count: 0,
          sub: "On-going Orders",
          font_color: "#FEC53D",
          color: "#FFFAEF",
          link: "/your-orders",
          icon: "/orders.png",
        },
      ];
      setCardData(card_data);
      setIsLoading(1);
      console.error(e);
    }
  };

  useEffect(() => {
    getData();
  }, [accounts, wo, role]);

  return { cardData, isLoading, role, accounts };
};

export default useHomeCardContainerData;
