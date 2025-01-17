import { useAccountDataContext } from "@/app/admin/context/AccountDataContext";
import api from "@/app/api/api";
import { useAccountContext } from "@/app/Context/AccountContext";
import React, { useEffect, useState } from "react";

const useVisitorsListData = () => {
  // api
  const { VisitorsApi } = api();
  const { getVisitorsByParentId } = VisitorsApi();

  //context
  const { accounts } = useAccountDataContext();

  // fetch data
  const [visitors, setVisitors] = useState([]);
  const [visitors_notis, setVisitorsNotis] = useState([]);
  const getData = async () => {
    try {
      if (accounts.company_id) {
        const visitors_data = await getVisitorsByParentId(accounts.company_id);
        const notif_data = visitors_data.map((item) => {
          const activeValues = Object.keys(item).reduce((result, key) => {
            if (
              ["Expired", "Near Expiry 2", "Near Expiry 1"].includes(item[key])
            ) {
              result[key] = item[key];
            }
            return result;
          }, {});
          return {
            name: item[1442],
            id: item.id,
            count: Object.keys(activeValues).length,
          };
        });
        setVisitors(visitors_data);
        setVisitorsNotis(notif_data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getData();
  }, [accounts]);

  return { visitors, visitors_notis };
};

export default useVisitorsListData;
