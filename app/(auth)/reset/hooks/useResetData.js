import api from "@/app/api/api";
import { checkPassword, encryptMessage } from "@/app/function/decryptor";
import useDecryptionKeyData from "@/app/hooks/useDecryptionKeyData";
import { useState } from "react";

const useResetData = () => {
  // api
  const { CustomerAccountApi } = api();
  const { getUserByEmail, updateAccountEmail } = CustomerAccountApi();

  // user data
  const [user, setUser] = useState([]);
  const [form, setForm] = useState({ email: "" });
  const handleForm = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const [message, setMessage] = useState({ message: "", severity: "" });
  const [isLoading, setIsLoading] = useState(0);
  const ResetPassword = async () => {
    const api = process.env.NEXT_PUBLIC_API_URL;
    setIsLoading(1);
    try {
      // get user data
      // const user_data = await getUserByEmail(form.email);
      const reset_password = await fetch(`${api}/views/reset_password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: form.email }),
      });
      const reset_password_data = await reset_password.json();

      if (reset_password_data.status) {
        setMessage({
          message: `Reset password link sent to email`,
          severity: "success",
        });
        setIsLoading(2);
      } else {
        setTimeout(() => {
          setIsLoading(0);
          setMessage({
            message: `Account not found for that particular email!`,
            severity: "error",
          });
        }, 2000);
      }
    } catch (e) {
      console.error(e);
    }
  };
  return { message, form, user, handleForm, ResetPassword, isLoading };
};

export default useResetData;
