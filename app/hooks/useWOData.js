"use client";
import { useEffect, useState } from "react";
import api from "../api/api";
import useDecryptionKeyData from "./useDecryptionKeyData";
import EnquityStatusData from "../function/EnquityStatusData";

const useWOData = () => {
  // api
  const { WOApi, CustomerAccountApi } = api();
  const { getCompanyById } = CustomerAccountApi();
  const { getWoByUserId } = WOApi();
  const { enquiry_data } = EnquityStatusData();
  // decrypt_key
  const { decKey, user_id } = useDecryptionKeyData();
  // user id
  // get wo
  const [wo, setWO] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        if (user_id) {
          const company_id = await getCompanyById(user_id);
          if (company_id.length > 0) {
            const wo_data = await getWoByUserId(company_id[0]["2630_db_value"]);
            const datas = await Promise.all(
              wo_data.map(async (item) => {
                const status_name = enquiry_data.filter(
                  (x) => x.name === item[2138]
                );
                return {
                  id: item.id,
                  ref_num: item[2134],
                  status: status_name[0],
                  service: item[674],
                  estimated_done: item[791],
                  status_name: status_name[0].name,
                  dialog_status: false,
                };
              })
            );
            setWO(datas);
            setIsLoading(false);
          }
        }
      } catch (e) {
        console.error(e);
      }
    };
    getData();
  }, [decKey, user_id]);

  const handleWODialog = (id = 0, dialogStatus = false) => {
    setWO((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, dialog_status: dialogStatus } : item
      )
    );
  };

  return { wo, isLoading, handleWODialog };
};

export default useWOData;
