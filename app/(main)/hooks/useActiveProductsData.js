import api from "@/app/api/api";
import useDecryptionKeyData from "@/app/hooks/useDecryptionKeyData";
import { useEffect, useState } from "react";
import { getLocalStorage } from "@/app/function/getLocalStorage";

const useActiveProductsData = () => {
  // api
  const { CustomerAccountApi, WOApi, InvoiceApi } = api();
  const { getAccountById } = CustomerAccountApi();
  const { getWoByUserId, getWoAll } = WOApi();

  // dec key
  const { user_id, role } = useDecryptionKeyData();

  // get data
  const [activeProduct, setActiveProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(0);

  const getData = async () => {
    try {
      if (user_id) {
        const account_data = await getAccountById(user_id);
        let wo_data;
        if (role == "Admin") {
          wo_data = await getWoAll();
        } else {
          wo_data = await getWoByUserId(account_data[0]["2630_db_value"]);
        }
        const wo_sort = wo_data.sort((a, b) => b[306] - a[306]);
        const wo_array = wo_data.map((item) => item.id);

        setActiveProducts(wo_sort.slice(0, 5));
        setIsLoading(1);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getData();
  }, [user_id, role]);

  useEffect(() => {
    if (getLocalStorage("app-debug") === "true") {
      console.log(activeProduct);
    }
  }, [activeProduct]);

  return { activeProduct, isLoading, role };
};

export default useActiveProductsData;
