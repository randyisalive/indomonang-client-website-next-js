import { useAccountDataContext } from "@/app/admin/context/AccountDataContext";
import api from "@/app/api/api";
import { useEffect, useState } from "react";

const useExpatriateListData = () => {
  //api
  const { ExpatriateApi } = api();
  const { getExpatriateByParentId } = ExpatriateApi();

  //account context
  const { accounts, isLoading } = useAccountDataContext();

  // expatriate notifications
  const [expat_notis, setExpatNotis] = useState([]);

  // fetch data
  const getData = async () => {
    try {
      if (accounts.company_id) {
        const expat_data = await getExpatriateByParentId(accounts.company_id);
        const notif_data = expat_data.map((item) => {
          const activeValues = Object.keys(item).reduce((result, key) => {
            if (
              ["Expired", "Near Expiry 2", "Near Expiry 1"].includes(item[key])
            ) {
              result[key] = item[key];
            }
            return result;
          }, {});
          return {
            name: item[1082],
            id: item.id,
            count: Object.keys(activeValues).length,
          };
        });
        console.log(expat_data, notif_data);
        setExpatriates(expat_data);
        setExpatNotis(notif_data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const [expatriates, setExpatriates] = useState([]);

  useEffect(() => {
    getData();
  }, [accounts.company_id]);

  return { expatriates, expat_notis };
};

export default useExpatriateListData;
