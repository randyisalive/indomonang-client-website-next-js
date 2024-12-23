"use client";
import api from "@/app/api/api";
import useDecryptionKeyData from "@/app/hooks/useDecryptionKeyData";
import React, { useEffect, useState } from "react";

const useTicketListData = () => {
  //api
  const { TicketsApi } = api();
  const { getTicketsByUserId } = TicketsApi();
  //api
  // dec key
  const { user_id } = useDecryptionKeyData();
  // dec key
  // get data
  const [tickets, setTickets] = useState([]);
  const getData = async () => {
    try {
      if (user_id) {
        const ticket_data = await getTicketsByUserId(user_id);
        setTickets(ticket_data);
        console.log(ticket_data);
      } else {
        throw new Error("No user Id");
      }
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    getData();
  }, [user_id]);
  // get data

  return { tickets };
};

export default useTicketListData;
