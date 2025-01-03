"use client";

import api from "@/app/api/api";
import useDecryptionKeyData from "@/app/hooks/useDecryptionKeyData";
import { Message } from "primereact/message";
import { ProgressSpinner } from "primereact/progressspinner";
import { useEffect, useState } from "react";

const CheckWOAuth = ({ children, woData = [] }) => {
  // decryptor
  const { user_id, role } = useDecryptionKeyData();

  // api
  const { CustomerAccountApi } = api();
  const { getAccountById } = CustomerAccountApi();

  const [load, setLoad] = useState(0);
  const getData = async (user_id) => {
    try {
      if (woData.length > 0) {
        if (role === "Admin") {
          setLoad(2);
        } else {
          const accounts = await getAccountById(user_id);
          if (accounts[0][2630] === woData[0].name) {
            setLoad(2);
          } else {
            setLoad(1);
          }
        }
      }
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    getData(user_id);
    console.log(load);
  }, [user_id, woData, role]);

  if (load === 2) {
    return children;
  } else if (load === 1) {
    return (
      <div className="my-5 m-5 flex justify-center items-center">
        <Message severity="error" text="Data Restricted" />
      </div>
    );
  }
};

export default CheckWOAuth;
