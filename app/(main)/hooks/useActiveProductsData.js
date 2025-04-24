import { useEffect, useState } from "react";
import { useAccountDataContext } from "@/app/admin/context/AccountDataContext";
import { useWoContext } from "../your-orders/context/WoContext";

const useActiveProductsData = () => {
  // api

  const { accounts, role } = useAccountDataContext();
  const { wo } = useWoContext();

  // get data
  const [activeProduct, setActiveProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(0);

  const getData = async () => {
    try {
      if (accounts?.data?.id && wo?.data?.length > 0) {
        const wo_sort = wo.data.sort((a, b) => b[306] - a[306]);
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
    console.log(accounts);
  }, [accounts, role, wo]);

  return { activeProduct, isLoading, role };
};

export default useActiveProductsData;
