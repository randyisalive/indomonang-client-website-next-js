"use client";
import api from "@/app/api/api";
import { handleHashPassword } from "@/app/function/decryptor";
import { getLocalStorage } from "@/app/function/getLocalStorage";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const useFormChangePasswordData = () => {
  //api
  const { CustomerAccountApi } = api();
  const { changePassword } = CustomerAccountApi();

  // params
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const token = params.get("key");
  const [expiredMsg, setExpiredMsg] = useState(false);

  const [user_id, setUserId] = useState(0);

  // validation expiration
  useEffect(() => {
    const validate = async () => {
      const fetch_data = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL
        }/views/reset_password/validate_link?token=${token}&validation=${true}`
      );
      const data = await fetch_data.json();

      if (!data.status) {
        setExpiredMsg(true);
        // window.location.href = "/reset";
      }
    };
    if (token) {
      validate();
    }
  }, [token]);

  // form
  const [form, setForm] = useState({ new: "", confirm: "" });
  const handleForm = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // generate password
  const [genPass, setGenPass] = useState({ length: 12, gen: "" });
  function generatePassword(length) {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
    let password = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
      password += charset.charAt(Math.floor(Math.random() * n));
    }
    setGenPass({ length: 12, gen: password });
    return password;
  }

  const handleGenPass = (e) => {
    setGenPass((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // change password
  const [message, setMessage] = useState("");
  const change_password = async () => {
    const api = process.env.NEXT_PUBLIC_API_URL;
    try {
      if (form.confirm === form.new) {
        if (form.new.length < 8) {
          setMessage("Password at least 8 characters");
          return;
        }
        //const hashed_password = handleHashPassword(form.confirm);
        const fetch_data = await fetch(`${api}/views/reset_password/change`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password: form.confirm }),
        });
        const data = await fetch_data.json();
        if (data.status) {
          window.location.href = "/login";
        } else {
          throw new Error("Error, something gone wrong🤦‍♂️");
        }
      } else {
        setMessage("The passwords entered do not match");
        throw new Error("The passwords entered do not match");
      }
    } catch (e) {
      console.error(e);
    }
  };

  // debug
  useEffect(() => {
    if (getLocalStorage("app-debug") === "true") {
      console.log(genPass, form);
    }
  }, [genPass, form]);

  return {
    generatePassword,
    form,
    genPass,
    handleGenPass,
    handleForm,
    message,
    change_password,
    expiredMsg,
  };
};

export default useFormChangePasswordData;
