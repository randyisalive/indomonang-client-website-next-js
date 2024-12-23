"use client";
import api from "@/app/api/api";
import { getLocalStorage } from "@/app/function/getLocalStorage";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { v4 } from "uuid";

const useTicketDetailData = () => {
  const { id } = useParams();
  const params = useSearchParams();
  const date_added = params.get("date_added");
  const ref = params.get("ref");
  const category = params.get("category");

  // api
  const { TicketsApi, TicketsChatsApi } = api();
  const { getTicketById } = TicketsApi();
  const { getTicketsChatByTicketId, insertTicketsChat } = TicketsChatsApi();
  const getData = async () => {
    try {
      const ticket_data = await getTicketById(id);
      console.log(ticket_data);
      setTicket((prev) => ({ ...prev, ticket_data: ticket_data[0] }));
      if (ticket_data) {
        const chat_data = await getTicketsChatByTicketId(ticket_data[0]["id"]);
        console.log(chat_data);
        setTicket((prev) => ({ ...prev, chats_data: chat_data }));
      }
    } catch (e) {
      console.error(e);
    }
  };

  // get ticket data
  const [ticket, setTicket] = useState({ ticket_data: {}, chats_data: [] });
  useEffect(() => {
    getData();
  }, [id]);

  // ticket chat

  useEffect(() => {}, []);
  const [form, setForm] = useState({ text: "", role: "client" });
  const handleForm = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const SubmitMessage = async () => {
    const uuid = v4();
    const role = getLocalStorage("r") === "admin" ? 631 : 632;
    try {
      const submit_message = await insertTicketsChat(
        uuid,
        ticket.ticket_data.id,
        form.text,
        role
      );
      console.log(id, form.text, form.role);
      console.log(submit_message);
      if (submit_message) {
        setForm((prev) => ({ ...prev, text: "" }));
        getData();
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
      }
    } catch (e) {
      console.error(e);
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      SubmitMessage();
    }
  };

  // debug
  useEffect(() => {
    if (getLocalStorage("app-debug") === "true") {
      console.log(ticket, form);
    }
  }, [ticket, form]);

  return {
    category,
    ref,
    date_added,
    ticket,
    SubmitMessage,
    handleForm,
    form,
    handleKeyDown,
  };
};

export default useTicketDetailData;
