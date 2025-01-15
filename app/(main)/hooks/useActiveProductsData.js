import api from "@/app/api/api";
import useDecryptionKeyData from "@/app/hooks/useDecryptionKeyData";
import { useEffect, useState } from "react";
import { getLocalStorage } from "@/app/function/getLocalStorage";
import { useAccountDataContext } from "@/app/admin/context/AccountDataContext";
import { useWoContext } from "../your-orders/context/WoContext";

const useActiveProductsData = () => {
  // api
  const { CustomerAccountApi, WOApi, InvoiceApi } = api();
  const { getAccountById } = CustomerAccountApi();
  const { getWoByUserId, getWoAll } = WOApi();

  // dec key
  const { accounts, role } = useAccountDataContext();
  const { wo } = useWoContext();

  // get data
  const [activeProduct, setActiveProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(0);

  const getData = async () => {
    try {
      if (accounts.id && wo.length > 0) {
        const wo_sort = wo.sort((a, b) => b[306] - a[306]);
        setActiveProducts(wo_sort.slice(0, 5));
        setIsLoading(1);
      } else {
        setIsLoading(1);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getData();
  }, [accounts.id, role, wo]);

  useEffect(() => {
    if (getLocalStorage("app-debug") === "true") {
      console.log(activeProduct);
    }
  }, [activeProduct]);

  return { activeProduct, isLoading, role };
};

export default useActiveProductsData;
