"use client";

import api from "@/app/api/api";
import useDecryptionKeyData from "@/app/hooks/useDecryptionKeyData";
import { useEffect, useState } from "react";

const CheckWOAuth = ({ children, woData = [] }) => {
  // decryptor
  const { user_id } = useDecryptionKeyData();

  // api
  const { CustomerAccountApi } = api();
  const { getAccountById } = CustomerAccountApi();

  const [load, setLoad] = useState(false);
  const getData = async (user_id) => {
    try {
      if (woData.length > 0) {
        const accounts = await getAccountById(user_id);
        console.log(accounts);
        if (accounts[0][2630] === woData[0].name) {
          setLoad(true);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    getData(user_id);
    console.log(woData);
  }, [user_id, woData]);

  if (load) {
    return children;
  }
};

export default CheckWOAuth;
