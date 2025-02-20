"use client";
import api from "@/app/api/api";
import React, { useState } from "react";

const useUploadDocumentHistory = () => {
  // api
  const { RequiredDocumentApi } = api();
  const { getRequiredDocumentHistory } = RequiredDocumentApi();

  // history state
  const [history, setHistory] = useState([]);

  const getData = async (ref_num) => {
    try {
      if (ref_num) {
        const history_data = await getRequiredDocumentHistory(ref_num);
        const sorted_history_data = history_data.sort((a, b) => b.id - a.id);
        setHistory(sorted_history_data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return { getData, history };
};

export default useUploadDocumentHistory;
