"use client";

import { useAccountDataContext } from "@/app/admin/context/AccountDataContext";
import { Message } from "primereact/message";
import { useEffect, useState } from "react";

const CheckWOAuth = ({ children, woData = [] }) => {
  // decryptor
  const { accounts, role } = useAccountDataContext();

  const [load, setLoad] = useState(0);
  const getData = async () => {
    try {
      if (woData.length > 0) {
        if (role === "Admin") {
          setLoad(2);
        } else {
          if (accounts.company === woData[0].company) {
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
    getData();
  }, [accounts.id, woData, role]);

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
