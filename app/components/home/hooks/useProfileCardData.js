"use client";
import { useAccountDataContext } from "@/app/admin/context/AccountDataContext";
import api from "@/app/api/api";
import useDecryptionKeyData from "@/app/hooks/useDecryptionKeyData";
import React, { useEffect, useState } from "react";

const useProfileCardData = () => {
  // api
  const { CustomerDatabasApi, CustomerAccountApi } = api();
  const { getCustomerDataById } = CustomerDatabasApi();
  const { getProfilePictureById } = CustomerAccountApi();
  const [customer, setCustomer] = useState([]);
  const [picture_profile, setPicture] = useState("");
  const [isLoading, setIsLoading] = useState(0);

  // dec key
  const { accounts } = useAccountDataContext();
  // user data
  useEffect(() => {
    const getData = async () => {
      try {
        if (accounts.company_id) {
          const company_data = await getCustomerDataById(accounts.company_id);
          const picture = await getProfilePictureById(accounts.id);
          if (company_data.length === 1) {
            setCustomer(company_data[0]);
            setPicture(picture);
            setIsLoading(1);
          }
        }
      } catch (e) {
        console.error(e);
      }
    };
    getData();
  }, [accounts]);

  return { customer, isLoading, picture_profile };
};

export default useProfileCardData;
