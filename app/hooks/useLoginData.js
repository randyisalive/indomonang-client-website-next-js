"use client";
import { useEffect, useState } from "react";
import api from "../api/api";
import { checkPassword, encryptMessage } from "../function/decryptor";
import { useRouter } from "next/navigation";
import { getLocalStorage } from "../function/getLocalStorage";

const useLoginData = () => {
  const { CustomerAccountApi, DecryptionKeyApi } = api();
  const {
    getUserByEmail,
    insertLoginToken,
    getLoginTokenByUser,
    getAllLoginToken,
    insertFailedLogin,
  } = CustomerAccountApi();
  const { getDecryptionKey } = DecryptionKeyApi();

  const nav = useRouter();
  useEffect(() => {
    const authToken = getLocalStorage("authToken");
    if (authToken) {
      nav.push("/");
    }
  }, [nav]);

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(0);
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleForm = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const getData = async () => {
    try {
      setIsLoading(1);
      if (form.email) {
        const user_data = await getUserByEmail(form.email);
        if (user_data.length == 0) {
          setMessage("No Account Found!");
          setIsLoading(2);
          setForm({});
          return;
        }
        if (user_data && user_data.length > 0) {
          const id = user_data[0]["id"];
          const password = user_data[0][2615];
          const role = user_data[0][2628];
          const login_status = await checkPassword(form.password, password);
          if (login_status) {
            const keyDecrypt = await getDecryptionKey();
            if (keyDecrypt[0][2644] !== "") {
              const insertToken = await insertLoginToken(
                id,
                encryptMessage(keyDecrypt[0][2644], keyDecrypt[0][2644])
              );
              const TokenUser = await getLoginTokenByUser(id);
              const random_number = Math.floor(
                Math.random() * TokenUser.length
              );
              localStorage.setItem("authToken", TokenUser[random_number][2734]);
              localStorage.setItem(
                "id",
                encryptMessage(id, keyDecrypt[0][2644])
              );
              localStorage.setItem(
                "r",
                encryptMessage(role, keyDecrypt[0][2644])
              );
              const token = localStorage.getItem("authToken");
              if (token) {
                const all_token = await getAllLoginToken();
                const filtersAllToken = all_token.filter(
                  (item) => item[2734] === token
                );
                const login_status_success = await insertFailedLogin(id, "627");
                console.log(login_status_success);
                if (filtersAllToken.length > 0) {
                  // nav.push("/");
                  window.location.href = "/";
                } else {
                  console.log("No matching token found");
                }
              } else {
                console.log("Token is empty");
              }
            }
          } else {
            setMessage("Wrong Credentials!");
            const login_status_failed = await insertFailedLogin(id, "628");
            console.log(login_status_failed);
            setIsLoading(2);
          }
        }
      } else {
        setMessage("Form not filled!");
        setIsLoading(2);
        setForm({});
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const handleKeyPress = async (event) => {
      if (event.key === "Enter") {
        event.preventDefault(); // Prevent default form submission
        await getData();
      }
    };

    document.addEventListener("keypress", handleKeyPress);
    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, [form]);

  useEffect(() => {
    if (getLocalStorage("app-debug") === "true") {
      console.log({ form, users });
    }
  }, [form, users]);

  return { handleForm, form, handleLogin: getData, users, isLoading, message };
};

export default useLoginData;
