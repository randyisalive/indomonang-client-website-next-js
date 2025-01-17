"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import WebButton from "@/app/components/ui/WebButton";
import EmojiPicker from "emoji-picker-react";
import api from "@/app/api/api";
import { getLocalStorage } from "@/app/function/getLocalStorage";
import useDecryptionKeyData from "@/app/hooks/useDecryptionKeyData";
import { useParams, useSearchParams } from "next/navigation";
import { v4 } from "uuid";
import { useAccountDataContext } from "@/app/admin/context/AccountDataContext";

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
  const { getTicketsChatByTicketId, insertTicketsChat, getAttachmentById } =
    TicketsChatsApi();
  const { getProfilePictureById, getAccountUsername } = CustomerAccountApi();

  // decryption
  const { role, accounts } = useAccountDataContext();
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
      const account_image = await getProfilePictureById(accounts.id);
      if (account_image) {
        setUserImage(account_image);
      }

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
            const username = await getAccountUsername(item[2767]);
            const attachment = await getAttachmentById(item.id);
            return {
              id: item.id,
              image: image,
              user_id: item[2772],
              text: item[2653],
              role: item[2746],
              company: username[0][2630],
              name: username[0][2614],
              attachment: attachment,
              date: item["date_added"],
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
  }, [id, accounts.id]);

  // ticket chat

  const [form, setForm] = useState({ text: "", role: "client" });
  const handleForm = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // submit message
  const [attachments, setAttachments] = useState({ upload: [], data: [] });
  const [errorMsg, setErrorMsg] = useState("");
  const handleAttachments = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Content = reader.result.split(",")[1]; // Base64 content
        setAttachments((prev) => ({
          ...prev,
          upload: [
            ...prev.upload,
            {
              name: file.name,
              content: base64Content,
            },
          ],
          data: [
            ...prev.data,
            {
              name: file.name,
              data: reader.result,
              base64: base64Content,
              delete: false,
              filetype: file.type,
            },
          ],
        }));
      };
      reader.onerror = (error) => {
        console.error("Error reading file:", error);
      };
      reader.readAsDataURL(file);
    }
  };

  const deleteAttachment = (index) => {
    setAttachments((prev) => ({
      ...prev,
      upload: prev.upload.filter((_, i) => i !== index),
      data: prev.data.filter((_, i) => i !== index),
    }));
  };

  const handleMouseEnter = (index) => {
    setAttachments((prev) => ({
      ...prev,
      data: prev.data.map((attachment, i) =>
        i === index ? { ...attachment, delete: true } : attachment
      ),
    }));
  };

  const handleMouseLeave = (index) => {
    setAttachments((prev) => ({
      ...prev,
      data: prev.data.map((attachment, i) =>
        i === index ? { ...attachment, delete: false } : attachment
      ),
    }));
  };

  const handleRemoveAttachment = () => {
    setAttachments({ upload: [], data: [] });
  };

  const SubmitMessage = async () => {
    const uuid = v4();
    if (form.text === "") {
      setErrorMsg("Empty text error");
      setTimeout(() => setErrorMsg(""), 2000);
      throw new Error("Empty text error");
    }

    try {
      const submit_message = await insertTicketsChat(
        uuid,
        ticket.ticket_data.id,
        form.text,
        role,
        accounts.id,
        attachments.upload
      );

      if (submit_message) {
        setForm((prev) => ({ ...prev, text: "" }));
        getData();
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
        window.location.reload();
      } else {
        throw new Error("Error while submitting message");
      }
    } catch (e) {
      console.error("An error occurred during message submission:", e);
    }
  };

  // update ticket status
  const updateTicket = async (ticket_id, value) => {
    try {
      const update_ticket = await updateTicketStatus(ticket_id, value);
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
      console.log(ticket, form, attachments);
    }
  }, [ticket, form, attachments]);

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
    handleAttachments,
    deleteAttachment,
    handleMouseEnter,
    handleMouseLeave,
    handleRemoveAttachment,
    attachments,
    errorMsg,
  };
};

export default useTicketDetailData;
