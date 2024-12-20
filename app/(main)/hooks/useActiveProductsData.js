import api from "@/app/api/api";
import useDecryptionKeyData from "@/app/hooks/useDecryptionKeyData";
import React, { useEffect, useState } from "react";

const useActiveProductsData = () => {
  // api
  const { CustomerAccountApi, WOApi } = api();
  const { getAccountById } = CustomerAccountApi();
  const { getWoByUserId } = WOApi();

  // dec key
  const { user_id } = useDecryptionKeyData();

  // get data
  const [activeProduct, setActiveProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(0);

  const getData = async () => {
    try {
      if (user_id) {
        const account_data = await getAccountById(user_id);
        const wo_data = await getWoByUserId(account_data[0]["2630_db_value"]);
        console.log(account_data, wo_data);
        setActiveProducts(wo_data.slice(0, 3));
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getData();
  }, [user_id]);

  return { activeProduct, isLoading };
};

export default useActiveProductsData;
