"use client";
import api from "@/app/api/api";
import { getLocalStorage } from "@/app/function/getLocalStorage";
import useDecryptionKeyData from "@/app/hooks/useDecryptionKeyData";
import { useEffect, useState } from "react";

const useTicketNewData = () => {
  // api
  const { WOApi, CustomerAccountApi } = api();
  const { getAccountById } = CustomerAccountApi();
  const { getWoByRefNum } = WOApi();

  // dec key
  const { user_id } = useDecryptionKeyData();
  const [userId, setUserId] = useState(0);
  useEffect(() => {
    setUserId(user_id);
  }, [user_id]);

  // check if wo avaliable by ref
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
        }));
      }
    } catch (e) {
      console.error(e);
    }
  };
  const [search, setSearch] = useState("");

  // tickets state
  const [form, setForm] = useState({
    email: "",
    name: "",
    category: "",
    details: "",
    attachments: [{ filename: "", content: "", base_64: "" }],
  });

  const handleForm = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    if (name === "details" && value.length > 120) {
      return;
    }
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // debug
  useEffect(() => {
    if (getLocalStorage("app-debug") === "true") {
      const data = { form: form, woData: woData, userId: userId };
      console.log(data);
    }
  }, [form, woData, userId]);

  return { handleForm, form, woData, search, setSearch, getWoData };
};

export default useTicketNewData;
