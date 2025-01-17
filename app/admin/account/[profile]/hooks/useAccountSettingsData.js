"use client";
import { useAccountDataContext } from "@/app/admin/context/AccountDataContext";
import api from "@/app/api/api";
import useDecryptionKeyData from "@/app/hooks/useDecryptionKeyData";
import React, { useEffect, useState } from "react";

const useAccountSettingsData = () => {
  // api
  const { CustomerDatabasApi } = api();
  const { getCustomerDataById } = CustomerDatabasApi();

  // get data
  const { accounts } = useAccountDataContext();
  const [customer, setCustomer] = useState([]);
  const [isLoading, setIsLoading] = useState(0);

  const getData = async () => {
    try {
      if (accounts.id) {
        const company_data = await getCustomerDataById(accounts.company_id);
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
  }, [accounts.id]);

  return { customer, isLoading };
};

export default useAccountSettingsData;
