import { useAccountDataContext } from "@/app/admin/context/AccountDataContext";
import api from "@/app/api/api";
import React, { useEffect, useState } from "react";

const useCompanyDocumentData = () => {
  // api
  const { CompanyDocumentApi } = api();
  const { getCompanyDocumentById } = CompanyDocumentApi();

  //context
  const { accounts } = useAccountDataContext();
  // fetch data
  const [documentData, setDocumentData] = useState([]);
  const getData = async () => {
    try {
      const document = await getCompanyDocumentById(accounts.company_id);
      if (document) {
        setDocumentData(document);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return { documentData };
};

export default useCompanyDocumentData;
