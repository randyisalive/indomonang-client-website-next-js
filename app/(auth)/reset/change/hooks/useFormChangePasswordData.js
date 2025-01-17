import api from "@/app/api/api";
import { decryptMessage, handleHashPassword } from "@/app/function/decryptor";
import { getLocalStorage } from "@/app/function/getLocalStorage";
import useDecryptionKeyData from "@/app/hooks/useDecryptionKeyData";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const useFormChangePasswordData = () => {
  //api
  const { CustomerAccountApi } = api();
  const { changePassword } = CustomerAccountApi();

  // params
  const { decKey } = useDecryptionKeyData();
  const searchParams = useSearchParams();
  const [user_id, setUserId] = useState(0);

  useEffect(() => {
    const key = decodeURIComponent(searchParams.get("key")).replace(/ /g, "+");
    if (key) {
      const x = decryptMessage(key, decKey);
      if (x) {
        setUserId(x);
      }
    }
  }, [decKey]);

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
    try {
      if (form.confirm === form.new) {
        if (form.new.length < 8) {
          setMessage("Password at least 8 characters");
          return;
        }
        const hashed_password = handleHashPassword(form.confirm);
        const change = await changePassword(user_id, hashed_password);
        if (change) {
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
  };
};

export default useFormChangePasswordData;
