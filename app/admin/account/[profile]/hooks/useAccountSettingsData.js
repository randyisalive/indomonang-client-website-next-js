"use client";
import api from "@/app/api/api";
import useDecryptionKeyData from "@/app/hooks/useDecryptionKeyData";
import React, { useEffect, useState } from "react";

const useAccountSettingsData = () => {
  // api
  const { CustomerDatabasApi, CustomerAccountApi } = api();
  const { getAccountById } = CustomerAccountApi();
  const { getCustomerDataById } = CustomerDatabasApi();

  // get data
  const { user_id } = useDecryptionKeyData();
  const [customer, setCustomer] = useState([]);
  const [isLoading, setIsLoading] = useState(0);

  const getData = async () => {
    try {
      if (user_id) {
        const account_data = await getAccountById(user_id);
        const company_id = account_data[0]["2630_db_value"];
        const company_data = await getCustomerDataById(company_id);
        setCustomer(company_data[0]);
        setIsLoading(1);
      } else {
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getData();
  }, [user_id]);

  return { customer, isLoading };
};

export default useAccountSettingsData;
