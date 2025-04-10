"use client";
import { useEffect, useState } from "react";
import api from "../api/api";
import { useAccountDataContext } from "../admin/context/AccountDataContext";
import { enquiry_data, priority_data } from "../function/static_data";
import { useSearchParams } from "next/navigation";

const useWOData = () => {
  // api
  const { WOApi, CustomerAccountApi } = api();
  const { getCompanyById } = CustomerAccountApi();
  const { getWoByUserId, getWoAll, updateWORating } = WOApi();

  // filters params
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const query = params.get("s");
  const month = params.get("m");

  // session data
  const { accounts } = useAccountDataContext();

  // get wo
  const [wo, setWO] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        if (accounts.id) {
          const company_id = await getCompanyById(accounts.id);
          if (company_id.length > 0) {
            let wo_data;
            if (accounts.role === "Client") {
              wo_data = await getWoByUserId(company_id[0]["2630_db_value"]);
            } else if (accounts.role === "Admin") {
              wo_data = await getWoAll(query);
            }
            const datas = await Promise.all(
              wo_data.map(async (item) => {
                const status_name = enquiry_data.filter(
                  (x) => x.text === item[2138]
                );
                // Find the matching priority for the current item
                const priorities = priority_data.filter(
                  (x) => x.text === item[321]
                );

                return {
                  id: item.id,
                  ref_num: item[2134],
                  main_ids: item[2134],
                  status: status_name[0],
                  priority: priorities[0],
                  service: item[674],
                  status_name: status_name[0]?.text,
                  dialog_status: false,
                  dialog_status_rating: false,
                  company: item[314],
                  rating: item[2631],
                  date_added: item.date_added,
                  month: item.date_added.split(" ")[1],
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
  }, [accounts, query]);

  /* // filter in wo state
  useEffect(() => {
    if (month) {
      const wo_month_filtered = wo.filter((i) => i.month === month);
      setWO(wo_month_filtered);
    } else {
      params.set("q", "");
    }

    console.log("month filter: ", month);
  }, [month]); */

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
