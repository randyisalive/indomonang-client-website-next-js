"use client";
import { useAccountDataContext } from "@/app/admin/context/AccountDataContext";
import api from "@/app/api/api";
import useDecryptionKeyData from "@/app/hooks/useDecryptionKeyData";
import React, { useEffect, useState } from "react";

const useProfileCardData = () => {
  // api
  const { CustomerDatabasApi, CustomerAccountApi } = api();
  const { getCustomerDataById } = CustomerDatabasApi();
  const { getCompanyById } = CustomerAccountApi();
  const [customer, setCustomer] = useState([]);
  const [isLoading, setIsLoading] = useState(0);

  // dec key
  const { accounts } = useAccountDataContext();
  // user data
  useEffect(() => {
    const getData = async () => {
      try {
        console.log(accounts);
        if (accounts.company_id) {
          const company_data = await getCustomerDataById(accounts.company_id);
          if (company_data.length === 1) {
            setCustomer(company_data[0]);
            setIsLoading(1);
          }
        }
      } catch (e) {
        console.error(e);
      }
    };
    getData();
  }, [accounts]);

  return { customer, isLoading };
};

export default useProfileCardData;
