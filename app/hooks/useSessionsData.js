"use client";
import React, { useEffect, useState } from "react";
import { decryptMessage } from "../function/decryptor";
import useDecryptionKeyData from "./useDecryptionKeyData";
import { getLocalStorage } from "../function/getLocalStorage";

const useSessionsData = () => {
  // decryption key
  const { decKey } = useDecryptionKeyData();
  const [data, setData] = useState(null);
  useEffect(() => {
    const checkAuth = async () => {
      const authToken = getLocalStorage("authToken");
      if (authToken != null && decKey != null) {
        const authTokenDec = decryptMessage(authToken, decKey);

        if (authTokenDec === decKey) {
          setData(true);
        }
      } else {
        setData(false);
      }
    };
    checkAuth();
  }, [decKey]);

  return { data };
};

export default useSessionsData;
