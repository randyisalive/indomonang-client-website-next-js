"use client";
import api from "@/app/api/api";
import { getLocalStorage } from "@/app/function/getLocalStorage";
import useDecryptionKeyData from "@/app/hooks/useDecryptionKeyData";
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
  const { TicketsApi, TicketsChatsApi, CustomerAccountApi } = api();
  const { getTicketById, getAttachmentTicketsById, updateTicketStatus } =
    TicketsApi();
  const { getTicketsChatByTicketId, insertTicketsChat } = TicketsChatsApi();
  const { getProfilePictureById } = CustomerAccountApi();

  // decryption
  const { role, user_id } = useDecryptionKeyData();
  const [isLoading, setIsLoading] = useState(0);

  // get data
  const ticketStatus = [
    { id: 0, text: "Open", bg_color: "#00C49A", value: 0 },
    { id: 1, text: "On Progress", bg_color: "#007BFF", value: 1 },
    { id: 2, text: "Closed", bg_color: "#BFC9CA", value: 2 },
    { id: 3, text: "Canceled", bg_color: "#DC3545", value: 3 },
  ];
  const getData = async () => {
    setIsLoading(1);
    try {
      const ticket_data = await getTicketById(id);
      console.log(user_id);
      const account_image = await getProfilePictureById(user_id);
      if (account_image) {
        setUserImage(account_image);
        console.log(account_image);
      }
      console.log(ticket_data);

      setTicket((prev) => ({
        ...prev,
        ticket_data: ticket_data[0],
        ticket_status: ticketStatus.filter(
          (item) => item.text == ticket_data[0][2467]
        ),
      }));
      if (ticket_data) {
        const total_attachment = ticket_data[0][2745].split(",");
        const attachment_tickets = await getAttachmentTicketsById(
          ticket_data[0]["id"]
        );
        const chat_data = await getTicketsChatByTicketId(ticket_data[0]["id"]);
        const chats = await Promise.all(
          chat_data.map(async (item) => {
            const image = await getProfilePictureById(item[2767]);
            return {
              id: item.id,
              image: image,
              text: item[2653],
              role: item[2746],
            };
          })
        );

        setTicket((prev) => ({
          ...prev,
          chats_data: chats,
          attachments: attachment_tickets,
          attachments_total: {
            names: total_attachment,
            total: total_attachment.length,
          },
        }));
        setIsLoading(0);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // get ticket data
  const [ticket, setTicket] = useState({
    ticket_data: {},
    chats_data: [],
    attachments: {},
  });
  const [userImage, setUserImage] = useState(null);
  useEffect(() => {
    getData();
  }, [id, user_id]);

  // ticket chat

  const [form, setForm] = useState({ text: "", role: "client" });
  const handleForm = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const SubmitMessage = async () => {
    const uuid = v4();
    if (form.text === "") {
      throw new Error("Empty text");
    }

    try {
      const submit_message = await insertTicketsChat(
        uuid,
        ticket.ticket_data.id,
        form.text,
        role,
        user_id
      );

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

  // update ticket status
  const updateTicket = async (ticket_id, value) => {
    try {
      const update_ticket = await updateTicketStatus(ticket_id, value);
      console.log(update_ticket);
      if (update_ticket) {
        getData();
      } else {
        throw new Error("Error updating Tickets");
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

  // download attachment zip
  const handleDownload = (base64Content = "", title = "download.zip") => {
    const binaryString = atob(base64Content);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    const blob = new Blob([bytes], { type: "application/zip" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = title;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return {
    category,
    ref,
    date_added,
    ticket,
    SubmitMessage,
    handleForm,
    form,
    handleKeyDown,
    handleDownload,
    role,
    getData,
    userImage,
    isLoading,
    updateTicket,
    ticketStatus,
  };
};

export default useTicketDetailData;
