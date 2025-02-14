"use client";
import api from "@/app/api/api";
import { useEffect, useState } from "react";

const useTermsOfService = () => {
  //api
  const { TermsOfServiceApi } = api();
  const { getTermsOfService } = TermsOfServiceApi();

  // data
  const [terms, setTerms] = useState([]);
  const getData = async () => {
    try {
      const terms_data = await getTermsOfService();
      if (terms_data) {
        setTerms(terms_data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return { terms };
};

export default useTermsOfService;
