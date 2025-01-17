import api from "@/app/api/api";
import { checkPassword, encryptMessage } from "@/app/function/decryptor";
import useDecryptionKeyData from "@/app/hooks/useDecryptionKeyData";
import { useState } from "react";

const useResetData = () => {
  // api
  const { CustomerAccountApi } = api();
  const { getUserByEmail, updateRecovery, updateAccountEmail } =
    CustomerAccountApi();

  const { decKey } = useDecryptionKeyData();

  // user data
  const [user, setUser] = useState([]);
  const [form, setForm] = useState({ email: "" });
  const handleForm = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const [message, setMessage] = useState({ message: "", severity: "" });
  const [isLoading, setIsLoading] = useState(0);
  const ResetPassword = async () => {
    setIsLoading(0);
    try {
      const user_data = await getUserByEmail(form.email);
      console.log(user_data);
      const update_recovery = await updateAccountEmail(
        user_data[0]?.id,
        user_data[0]?.[2634] === "No" ? "true" : "false",
        encryptMessage(user_data[0]?.id, decKey)
      );
      console.log(update_recovery, form);
      if (user_data.length === 1 || form.email != "") {
        setMessage({
          message: `Reset password link sent to ${user_data[0][2616]} email`,
          severity: "success",
        });
        setIsLoading(2);
      } else {
        setMessage({ message: "Form is not filled!", severity: "error" });
        setTimeout(() => {
          setIsLoading(0);
          //setMessage({ message: "", severity: "" });
        }, 2000);
      }
    } catch (e) {
      console.error(e);
    }
  };
  return { message, form, user, handleForm, ResetPassword, isLoading };
};

export default useResetData;
