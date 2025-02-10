"use client";
import { useEffect, useState } from "react";
import api from "../api/api";
import useDecryptionKeyData from "./useDecryptionKeyData";
import EnquityStatusData from "../function/EnquityStatusData";
import { useRouter } from "next/navigation";
import { useAccountDataContext } from "../admin/context/AccountDataContext";

const useWOData = () => {
  // api
  const { WOApi, CustomerAccountApi } = api();
  const { getCompanyById } = CustomerAccountApi();
  const { getWoByUserId, getWoAll, updateWORating } = WOApi();
  const { enquiry_data } = EnquityStatusData();

  // decrypt_key
  const { accounts, role } = useAccountDataContext();
  // user id
  // get wo
  const [wo, setWO] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        if (accounts.id) {
          const company_id = await getCompanyById(accounts.id);
          if (company_id.length > 0) {
            let wo_data;
            if (role === "Client") {
              wo_data = await getWoByUserId(company_id[0]["2630_db_value"]);
            } else if (role === "Admin") {
              wo_data = await getWoAll();
            } else {
              return;
            }
            const datas = await Promise.all(
              wo_data.map(async (item) => {
                const status_name = enquiry_data.filter(
                  (x) => x.name === item[2138]
                );
                return {
                  id: item.id,
                  ref_num: item[2134],
                  main_ids: item[2134],
                  status: status_name[0],
                  priority: item[321],
                  service: item[674],
                  //estimated_done: item[791],
                  status_name: status_name[0]?.name,
                  dialog_status: false,
                  dialog_status_rating: false,
                  company: item[314],
                  rating: item[2631],
                  date_added: item.date_added,
                  applicant: item[316],
                  nationality: item[699],
                  job_title: item[700],
                  city: item[1809],
                  pic: item["created_by"],
                  other_expat_list: item[318],
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
  }, [accounts.id, role]);

  const handleWODialog = (id = 0, dialogStatus = false) => {
    setWO((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, dialog_status: dialogStatus } : item
      )
    );
  };

  const handleRating = async (id, rating) => {
    try {
      const rating_data = await updateWORating(id, rating);
      if (rating_data) {
        window.location.href = "/your-orders";
      }
    } catch (e) {
      console.error(e);
    }
  };

  return { wo, isLoading, handleWODialog, handleRating };
};

export default useWOData;
