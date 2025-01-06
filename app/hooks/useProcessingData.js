import React, { useEffect, useState } from "react";
import api from "../api/api";
import { useSearchParams } from "next/navigation";

const useProcessingData = () => {
  // api
  const { ProcessingListApi, WOApi, InvoiceApi, CourierApi } = api();
  const {
    DownloadAttachments,
    getProcessingDataById,
    getProcessingListDataById,
  } = ProcessingListApi();
  const { getWoById } = WOApi();
  const { getInvoiceByWo } = InvoiceApi();
  const { getCourierByWO } = CourierApi();

  // params
  const searchParams = useSearchParams();
  let woId = searchParams.get("id");

  // get processing data
  const [processing, setProcessing] = useState([]);
  const [isLoading, setIsLoading] = useState(0);
  const getProcessing = async () => {
    try {
      if (woId) {
        const processing_data = await getProcessingDataById(woId);
        const processing_list_data = await getProcessingListDataById(
          processing_data[0]["id"]
        );
        setProcessing(processing_list_data);
        if (processing_list_data.length > 0) {
          setIsLoading(1);
        } else {
          throw new Error("No Data");
        }
      }
    } catch (e) {
      console.error(e);
      setIsLoading(2);
    }
  };

  useEffect(() => {
    getProcessing();
  }, [woId]);

  // get wo data
  const [wo, setWo] = useState([]);
  const getWO = async () => {
    try {
      if (woId) {
        const wo_data = await getWoById(woId);

        setWo(wo_data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getWO();
  }, [woId]);

  // fetch courier
  const [courier, setCourier] = useState([]);
  const getCourier = async () => {
    try {
      const courier_data = await getCourierByWO(woId);
      if (courier_data) {
        console.log(courier_data);
        setCourier(courier_data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getCourier();
  }, [woId]);

  // download status
  const [downloadStatus, setDownloadStatus] = useState([
    { id: 0, content: "temp" },
  ]);
  const download_attachments = async (id) => {
    try {
      const filteredProcessing = processing.filter((x) => x.id === id);
      console.log(filteredProcessing);
      const downloadData = await DownloadAttachments(id);
      setDownloadStatus(filteredProcessing);
      if (downloadData) {
        const linkSource = `data:application/pdf;base64, ${downloadData.content}`;
        const dowloadLink = document.createElement("a");
        document.body.appendChild(dowloadLink);
        dowloadLink.href = linkSource;
        dowloadLink.download = downloadData.filename;
        dowloadLink.click();
        console.log(downloadData);
        setTimeout(() => {
          setDownloadStatus([{ id: 0, content: "temp" }]);
        }, 3000);
      } else {
        setDownloadStatus([{ id: 0, content: "temp" }]);
      }
    } catch (e) {
      console.error(e);
      setDownloadStatus(2); // error
      setTimeout(() => {
        setDownloadStatus(0);
      }, 3000);
    }
  };
  return {
    processing,
    getProcessing,
    download_attachments,
    downloadStatus,
    woId,
    isLoading,
    wo,
    courier,
  };
};

export default useProcessingData;
