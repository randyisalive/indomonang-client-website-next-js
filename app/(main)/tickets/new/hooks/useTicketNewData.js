"use client";
import api from "@/app/api/api";
import { getLocalStorage } from "@/app/function/getLocalStorage";
import useDecryptionKeyData from "@/app/hooks/useDecryptionKeyData";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const useTicketNewData = () => {
  // api
  const { WOApi, CustomerAccountApi, TicketsApi } = api();
  const { getAccountById } = CustomerAccountApi();
  const { getWoByRefNum } = WOApi();
  const { getTicketsByUserId, insertTickets, uploadAttachmentTickets } =
    TicketsApi();

  // router
  const router = useRouter();

  // dec key
  const { user_id } = useDecryptionKeyData();
  const [userId, setUserId] = useState(0);
  useEffect(() => {
    setUserId(user_id);
  }, [user_id]);

  // check if wo available by ref
  const [woData, setWoData] = useState([]);
  const getWoData = async () => {
    try {
      const account_data = await getAccountById(userId);
      const wo_data = await getWoByRefNum(search);
      const wo_company = wo_data[0][314];
      const account_company = account_data[0][2630];
      if (wo_company === account_company) {
        setWoData(wo_data);
        setForm((prev) => ({
          ...prev,
          email: account_data[0][2616],
          name: account_data[0][2614],
          officer_pic: account_data[0]["created_by"],
        }));
      }
    } catch (e) {
      console.error(e);
    }
  };
  const [search, setSearch] = useState("");
  // check if wo available by ref

  // tickets state
  const [form, setForm] = useState({
    email: "",
    name: "",
    category: "99",
    details: "",
    attachments: [],
    priority: "633",
    officer_pic: "",
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
    const {
      email,
      name,
      category,
      details,
      attachments,
      officer_pic,
      priority,
    } = form;
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
        officer_pic,
        priority
      );
      console.log(insert_ticket);
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

      window.location.reload();
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
