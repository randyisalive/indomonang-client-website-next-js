import api from "@/app/api/api";
import { useEffect, useState } from "react";

const useExpatriateListData = (company_id = "0") => {
  //api
  const { ExpatriateApi } = api();
  const { getExpatriateByParentId } = ExpatriateApi();

  // fetch data
  const getData = async () => {
    try {
      if (company_id != "0") {
        const expat_data = await getExpatriateByParentId(company_id);
        console.log(expat_data);
        setExpatriates(expat_data);
      }
    } catch (e) {
      console.error(e);
    }
  };
  const [expatriates, setExpatriates] = useState([]);
  useEffect(() => {
    getData();
  }, [company_id]);

  return { expatriates };
};

export default useExpatriateListData;
