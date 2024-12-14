"use client";
import React, { useEffect, useState } from "react";
import { decryptMessage } from "../function/decryptor";
import api from "../api/api";
import useDecryptionKeyData from "./useDecryptionKeyData";
import EnquityStatusData from "../function/EnquityStatusData";

const useWOData = () => {
  // api
  const { WOApi, CustomerAccountApi, ExtraMethodsApi } = api();
  const { getCompanyById } = CustomerAccountApi();
  const { getWoByUserId } = WOApi();
  const { getGlobalListValueById } = ExtraMethodsApi();
  const { enquiry_data } = EnquityStatusData();
  // decrypt_key
  const { decKey } = useDecryptionKeyData();
  // user id
  const user_id = decryptMessage(localStorage.getItem("id"), decKey);
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
            console.log(wo_data);
            const datas = await Promise.all(
              wo_data.map(async (item) => {
                //const status_name = await getGlobalListValueById("16"); // enquiry status
                const status_name = enquiry_data.filter(
                  (x) => x.name === item[2138]
                );
                console.log("status Name", status_name);
                return {
                  id: item.id,
                  ref_num: item[2134],
                  status: status_name[0],
                  service: item[674],
                  estimated_done: item[791],
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
  }, [decKey]);

  return { wo, isLoading };
};

export default useWOData;
