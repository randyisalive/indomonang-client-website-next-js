"use client";
import { useAccountDataContext } from "@/app/admin/context/AccountDataContext";
import api from "@/app/api/api";
import { useEffect, useState } from "react";

const useTicketListData = () => {
  //api
  const { TicketsApi } = api();
  const { getTicketsByUserId, getTicketsAll } = TicketsApi();
  //api
  // dec key
  const { accounts, role } = useAccountDataContext();
  // dec key
  // get data
  const [tickets, setTickets] = useState([]);
  const getData = async () => {
    try {
      if (accounts.id && role) {
        if (role === "Admin") {
          const ticket_data = await getTicketsAll();
          setTickets(ticket_data);
          return;
        }
        const ticket_data = await getTicketsByUserId(accounts.id);
        setTickets(ticket_data);
      } else {
        throw new Error("No user Id");
      }
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    getData();
  }, [accounts.id, role]);
  // get data

  return { tickets };
};

export default useTicketListData;
