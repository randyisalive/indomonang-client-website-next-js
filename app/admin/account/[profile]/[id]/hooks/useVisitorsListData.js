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
  const getData = async () => {
    try {
      if (accounts.company_id) {
        const visitors_data = await getVisitorsByParentId(accounts.company_id);
        console.log(accounts);
        setVisitors(visitors_data);
        console.log(visitors_data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getData();
  }, [accounts]);

  return { visitors };
};

export default useVisitorsListData;
