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
  const [dependent_notis, setDependentNotis] = useState([]);
  const getData = async () => {
    try {
      if (accounts.company_id) {
        const family_data = await getFamilyByParentId(accounts.company_id);
        const notif_data = family_data.map((item) => {
          const activeValues = Object.keys(item).reduce((result, key) => {
            if (
              ["Expired", "Near Expiry 2", "Near Expiry 1"].includes(item[key])
            ) {
              result[key] = item[key];
            }
            return result;
          }, {});
          return {
            name: item[1100],
            id: item.id,
            count: Object.keys(activeValues).length,
          };
        });
        setDependent(family_data);
        setDependentNotis(notif_data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getData();
  }, [accounts]);

  return { dependent, dependent_notis };
};

export default useDependentListData;
