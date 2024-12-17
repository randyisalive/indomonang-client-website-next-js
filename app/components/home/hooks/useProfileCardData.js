"use client";
import api from "@/app/api/api";
import useDecryptionKeyData from "@/app/hooks/useDecryptionKeyData";
import React, { useEffect, useState } from "react";

const useProfileCardData = () => {
  // api
  const { CustomerDatabasApi, CustomerAccountApi } = api();
  const { getCustomerDataById } = CustomerDatabasApi();
  const { getCompanyById } = CustomerAccountApi();
  const [customer, setCustomer] = useState([]);

  // dec key
  const { user_id } = useDecryptionKeyData();
  // user data
  useEffect(() => {
    const getData = async () => {
      try {
        const user_data = await getCompanyById(user_id);
        console.log(user_data[0]);
        if (user_data) {
          const company_data = await getCustomerDataById(146);
          console.log(company_data);
        } else {
          console.log("No Data");
        }
      } catch (e) {
        console.error(e);
      }
    };
    getData();
  }, [user_id]);

  return { customer };
};

export default useProfileCardData;
