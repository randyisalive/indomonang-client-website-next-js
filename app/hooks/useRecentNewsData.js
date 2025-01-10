import React, { useEffect, useState } from "react";
import api from "../api/api";

const useRecentNewsData = () => {
  // api

  const { RecentNewsApi } = api();
  const { getRecentNewsAll } = RecentNewsApi();

  // fetch data
  const [news, setNews] = useState([]);
  const limit = 5;
  const getData = async () => {
    try {
      const news_data = await getRecentNewsAll(limit);
      setNews(news_data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return { getData, news };
};

export default useRecentNewsData;
