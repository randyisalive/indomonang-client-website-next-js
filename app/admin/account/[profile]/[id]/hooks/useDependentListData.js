import { useAccountDataContext } from "@/app/admin/context/AccountDataContext";
import api from "@/app/api/api";
import React, { useEffect, useState } from "react";

const useDependentListData = () => {
  //api
  const { FamilyApi } = api();
  const { getFamilyByParentId } = FamilyApi();

  // account context
  const { accounts } = useAccountDataContext();

  // fetch data
  const [dependent, setDependent] = useState([]);
  const getData = async () => {
    try {
      if (accounts.company_id) {
        const family_data = await getFamilyByParentId(accounts.company_id);
        setDependent(family_data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getData();
  }, [accounts]);

  return { dependent };
};

export default useDependentListData;
