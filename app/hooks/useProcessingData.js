import React, { useEffect, useState } from "react";
import api from "../api/api";
import { useSearchParams } from "next/navigation";
import { useWoContext } from "../(main)/your-orders/context/WoContext";

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

  // wo context
  const { wo } = useWoContext();

  // get processing data
  const [processing, setProcessing] = useState([]);
  const [processingList, setProcessingList] = useState([]);
  const [isLoading, setIsLoading] = useState(0);
  const getProcessing = async () => {
    setProcessing([]);
    try {
      const wo_ids = wo.map((item) => {
        return item.id;
      });
      const processing_data = await getProcessingDataById(wo_ids.join(","));
      console.log(processing_data);

      const processing_array = processing_data.map((item) => {
        return item.id;
      });
      console.log(processing_array); // processing parent
      const processing_list_data = await getProcessingListDataById(
        processing_array.join(",")
      );

      setProcessing(processing_data);
      setProcessingList(processing_list_data);
      /* if (processing_list_data.length > 0) {
          setIsLoading(1);
        } else {
          throw new Error("No Data");
        } */
    } catch (e) {
      console.error(e);
      setIsLoading(2);
    }
  };

  useEffect(() => {
    getProcessing();
  }, [wo]);

  // filtered fetch processing data
  const [processedData, setProcessedData] = useState([]);
  useEffect(() => {
    setProcessedData([]);
    if (processing.length > 0) {
      const filtered_processing = processing
        .filter((item) => item.parent_item_id === woId)
        .map((i) => i.id);
      const filtered_documents = processingList.filter(
        (item) => item.parent_item_id === filtered_processing[0]
      );
      console.log(filtered_processing);
      console.log(filtered_documents);
      setProcessedData({
        parent: filtered_processing,
        document: filtered_documents,
      });
    }
  }, [woId]);

  // get wo data
  // const [wo, setWo] = useState({ wo: {}, invoice: {} });
  /* const getWO = async () => {
    try {
      if (woId) {
        const wo_data = await getWoById(woId);
        const invoice_data = await getInvoiceByWo(woId);
        setWo({ wo: wo_data, invoice: invoice_data });
      }
    } catch (e) {
      console.error(e);
    }
  }; */

  /*  useEffect(() => {
    getWO();
  }, [woId]); */

  // fetch courier
  const [courier, setCourier] = useState([]);
  const getCourier = async () => {
    try {
      const wo_ids = wo.map((item) => {
        return item.id;
      });
      const courier_data = await getCourierByWO(wo_ids.join(","));
      if (courier_data) {
        setCourier(courier_data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getCourier();
  }, []);

  // courier filtered data
  const [filteredCourier, setFilteredCourier] = useState([]);
  useEffect(() => {
    const filtered_courier = courier.filter((item) => {
      const values = item["1778_db_value"].split(",");
      return values.includes(woId);
    });
    console.log("Filtered Courier: ", filtered_courier);
    setFilteredCourier(filtered_courier);
  }, [woId]);

  // download status
  const [downloadStatus, setDownloadStatus] = useState([
    { id: 0, content: "temp" },
  ]);
  const download_attachments = async (id, title = "file") => {
    try {
      const filteredProcessing = processing.filter((x) => x.id === id);
      const downloadData = await DownloadAttachments(id);
      setDownloadStatus(filteredProcessing);
      if (downloadData) {
        const linkSource = `data:application/pdf;base64, ${downloadData.content}`;
        const dowloadLink = document.createElement("a");
        document.body.appendChild(dowloadLink);
        dowloadLink.href = linkSource;
        dowloadLink.download = title;
        dowloadLink.click();
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
    isLoading,
    processedData,
    filteredCourier,
  };
};

export default useProcessingData;
