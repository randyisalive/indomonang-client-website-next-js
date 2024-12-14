import React, { useEffect, useState } from "react";
import api from "../api/api";

const useDecryptionKeyData = () => {
  //api
  const { DecryptionKeyApi } = api();
  const { getDecryptionKey } = DecryptionKeyApi();

  // get dec key
  const [decKey, setDecKey] = useState("");
  useEffect(() => {
    const getData = async () => {
      try {
        const datas = await getDecryptionKey();
        if (datas) {
          const dec_key = datas[0][2644];
          console.log("Dec Key", dec_key);
          setDecKey(dec_key);
        }
      } catch (e) {
        console.error(e);
      }
    };
    getData();
  }, []);

  return { decKey };
};

export default useDecryptionKeyData;
