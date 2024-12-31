"use client";

import api from "@/app/api/api";
import useDecryptionKeyData from "@/app/hooks/useDecryptionKeyData";
import { ProgressSpinner } from "primereact/progressspinner";
import { useEffect, useState } from "react";

const CheckWOAuth = ({ children, woData = [] }) => {
  // decryptor
  const { user_id } = useDecryptionKeyData();

  // api
  const { CustomerAccountApi } = api();
  const { getAccountById } = CustomerAccountApi();

  const [load, setLoad] = useState(0);
  const getData = async (user_id) => {
    try {
      if (woData.length > 0) {
        const accounts = await getAccountById(user_id);
        if (accounts[0][2630] === woData[0].name) {
          setLoad(2);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    getData(user_id);
    console.log(load);
  }, [user_id, woData]);

  if (load === 2) {
    return children;
  } else if (load === 1) {
    return <ProgressSpinner />;
  }
};

export default CheckWOAuth;
