"use client";
import { useEffect, useState } from "react";
import api from "../api/api";
import { checkPassword, encryptMessage } from "../function/decryptor";
import { useRouter } from "next/navigation";

const useLoginData = () => {
  // api
  const { CustomerAccountApi, DecryptionKeyApi } = api();
  const {
    getUserByEmail,
    insertLoginToken,
    getLoginTokenByUser,
    getAllLoginToken,
  } = CustomerAccountApi();
  const { getDecryptionKey } = DecryptionKeyApi();

  // router
  const nav = useRouter();
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      nav.push("/");
    }
  }, []);

  // user state
  const [users, setUsers] = useState([]);
  const getData = async () => {
    try {
      if (form.email != "") {
        const user_data = await getUserByEmail(form.email);
        if (user_data) {
          const id = user_data[0]["id"];
          const password = user_data[0][2615];
          const email = user_data[0][2616];
          const login_status = await checkPassword(form.password, password);
          if (login_status) {
            const keyDecrypt = await getDecryptionKey();
            if (keyDecrypt[0][2644] != "") {
              // insert to user token
              const insertToken = await insertLoginToken(
                id,
                encryptMessage(keyDecrypt[0][2644], keyDecrypt[0][2644])
              );
              // insert to user token
              // veryfy token
              const TokenUser = await getLoginTokenByUser(id);
              const random_number = Math.floor(
                Math.random() * (TokenUser.length - 0) + 0
              );
              //login
              localStorage.setItem("authToken", TokenUser[random_number][2734]);
              localStorage.setItem(
                encryptMessage("id", keyDecrypt[0][2644]),
                encryptMessage(id, keyDecrypt[0][2644])
              );
              const token = localStorage.getItem("authToken");
              console.log(token);
              if (token != "") {
                const all_token = await getAllLoginToken();
                console.log(all_token);
                const filtersAllToken = all_token.filter(
                  (item) => item[2734] === token
                );
                if (filtersAllToken.length > 0) {
                  nav.push("/");
                } else {
                  console.log("NO TOKEN");
                }
              } else {
                console.log("Token empty");
              }
            }
          }
        } else {
          console.log("No User Found");
        }
      } else {
        console.error("No Email in form!");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const [form, setForm] = useState({ email: "", password: "" });
  const handleForm = (e) => {
    const value = e.target.value;
    setForm((prev) => ({ ...prev, [e.target.name]: value }));
  };

  const handleLogin = async () => {
    const data = await getData();
  };

  // debug
  useEffect(() => {
    if (localStorage.getItem("app-debug") === "true") {
      const data = { form: form, users: users };
      console.log(data);
    }
  }, [form, users]);

  return { handleForm, form, handleLogin, users };
};

export default useLoginData;
