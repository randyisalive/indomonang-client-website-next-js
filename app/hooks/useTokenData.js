"use client";

import { useEffect, useState } from "react";
import api from "../api/api";

const useTokenData = () => {
  const { CustomerAccountApi } = api();
  const { getAllLoginToken } = CustomerAccountApi();

  // token state
  const [tokens, setToken] = useState([]);
  const [verify, setVerify] = useState(false);

  const verifyTokens = async () => {
    try {
      const authToken = localStorage.getItem("authToken");
      const tokens = await getAllLoginToken();
      const filteredTokens = tokens.filter((item) => item[2734] === authToken);
      if (filteredTokens.length > 0) {
        setVerify(true);
      } else {
        setVerify(false);
      }
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    verifyTokens();
  }, [tokens]);

  return { tokens, verifyTokens, verify };
};

export default useTokenData;
