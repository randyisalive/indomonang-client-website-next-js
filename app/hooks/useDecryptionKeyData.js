"use client";
import React, { useEffect, useState } from "react";
import api from "../api/api";
import { decryptMessage } from "../function/decryptor";
import { getLocalStorage } from "../function/getLocalStorage";

const useDecryptionKeyData = () => {
  //api
  const { DecryptionKeyApi } = api();
  const { getDecryptionKey } = DecryptionKeyApi();

  // get dec key
  const [decKey, setDecKey] = useState("");
  const [user_id, setUserId] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        if (typeof window !== "undefined") {
          const datas = await getDecryptionKey();
          if (datas) {
            const dec_key = datas[0][2644];
            const user_id = decryptMessage(
              getLocalStorage("id"),
              datas[0][2644]
            );
            const role_data = decryptMessage(
              getLocalStorage("r"),
              datas[0][2644]
            );
            setDecKey(dec_key);
            setUserId(user_id);
            setRole(role_data);
          }
        }
      } catch (e) {
        console.error(e);
      }
    };
    getData();
  }, []);

  // Retrieve the decryption key from localStorage (if exists)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedDecKey = localStorage.getItem("decKey");
      if (storedDecKey) {
        setDecKey(storedDecKey);
      }
    }
  }, []);

  return { decKey, user_id, role };
};

export default useDecryptionKeyData;
