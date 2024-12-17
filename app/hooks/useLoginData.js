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

  const handleForm = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const getData = async () => {
    try {
      setIsLoading(1);
      if (form.email) {
        console.log("Fetching data for email:", form.email);
        const user_data = await getUserByEmail(form.email);
        if (user_data && user_data.length > 0) {
          const id = user_data[0]["id"];
          const password = user_data[0][2615];
          const email = user_data[0][2616];
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
              const token = localStorage.getItem("authToken");
              if (token) {
                const all_token = await getAllLoginToken();
                const filtersAllToken = all_token.filter(
                  (item) => item[2734] === token
                );
                if (filtersAllToken.length > 0) {
                  nav.push("/");
                } else {
                  console.log("No matching token found");
                }
              } else {
                console.log("Token is empty");
              }
            }
          } else {
            setIsLoading(2);
          }
        } else {
          console.log("No User Found");
        }
      } else {
        console.error("Email field is empty");
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

  return { handleForm, form, handleLogin: getData, users, isLoading };
};

export default useLoginData;
