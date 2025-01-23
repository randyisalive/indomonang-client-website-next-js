"use client";
import { useWoContext } from "@/app/(main)/your-orders/context/WoContext";
import { useAccountDataContext } from "@/app/admin/context/AccountDataContext";
import api from "@/app/api/api";
import { getLocalStorage } from "@/app/function/getLocalStorage";
import useDecryptionKeyData from "@/app/hooks/useDecryptionKeyData";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const useTicketNewData = () => {
  // api
  const { TicketsApi } = api();
  const { insertTickets, uploadAttachmentTickets } = TicketsApi();

  // dec key
  const { accounts } = useAccountDataContext();
  const { wo } = useWoContext();
  const [userId, setUserId] = useState(0);
  useEffect(() => {
    setUserId(accounts.id);
  }, [accounts.id, wo]);

  // check if wo available by ref
  const [woData, setWoData] = useState([]);
  const getWoData = async () => {
    try {
      const filtered_wo = wo.filter((item) => item.ref_num === search);
      const wo_company = filtered_wo[0].company;
      const account_company = accounts.company;
      if (wo_company === account_company) {
        setWoData(filtered_wo);
        setForm((prev) => ({
          ...prev,
          email: accounts.email,
          name: accounts.username,
        }));
      }
    } catch (e) {
      console.error(e);
    }
  };
  const [search, setSearch] = useState("");
  // check if wo available by ref
  // input pic if search changes
  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      pic: wo.filter((item) => item.ref_num === search)[0]?.pic,
    }));
  }, [search]);

  // tickets state
  const [form, setForm] = useState({
    email: "",
    name: "",
    category: "99",
    details: "",
    attachments: [],
    priority: "633",
    pic: wo.filter((item) => item.ref_num === search),
  });
  const ticket_priority = [
    { id: 0, text: "Urgent", bg_color: "#ff0000", value: "633" },
    { id: 3, text: "High", bg_color: "#FFEB3B", value: "634" },
    { id: 1, text: "Medium", bg_color: "#FF9800", value: "635" },
    { id: 2, text: "Low", bg_color: "#007BFF", value: "636" },
  ];

  const handleForm = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    if (name === "details" && value.length > 120) {
      return;
    }
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const readFileAsBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result.split(",")[1]);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const onUpload = (e) => {
    const files = e.files;
    const processFile = async (file) => {
      const base64 = await readFileAsBase64(file);
      return { filename: file.name, content: "", base_64: base64 };
    };

    Promise.all(files.map(processFile)).then((attachments) => {
      setForm((prev) => ({
        ...prev,
        attachments: [...attachments],
      }));
    });
  };

  const SubmitTicket = async () => {
    const { email, name, category, details, attachments, pic, priority } = form;
    const uuid = uuidv4();

    try {
      const insert_ticket = await insertTickets(
        uuid,
        search,
        name,
        email,
        category,
        details,
        userId,
        pic,
        priority
      );
      if (insert_ticket && form.attachments.length > 0) {
        const id = insert_ticket.id;
        const attachments = form.attachments.map((item) => {
          return {
            name: item.filename,
            content: item.base_64,
          };
        });
        const update_attachments = await uploadAttachmentTickets(
          attachments,
          id
        );
      }

      window.location.href = "/tickets/list";
    } catch (e) {
      console.error(e);
    }
  };

  // debug
  useEffect(() => {
    if (getLocalStorage("app-debug") === "true") {
      const data = { form: form, woData: woData, userId: userId };
      console.log(data);
    }
  }, [form, woData, userId]);

  return {
    handleForm,
    form,
    woData,
    search,
    setSearch,
    getWoData,
    onUpload,
    SubmitTicket,
    ticket_priority,
  };
};

export default useTicketNewData;
