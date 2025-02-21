"use client";
import api from "@/app/api/api";
import { useRef, useState } from "react";
import { useWoContext } from "../../your-orders/context/WoContext";
import useUploadDocumentHistory from "./useUploadDocumentHistory";
import { useAccountSettingContext } from "@/app/admin/context/AccountSettingContext";

const useUploadDocumentData = () => {
  // api
  const { WOApi, RequiredDocumentApi } = api();
  const {
    getRequiredDocumentDataByRefNum,
    getRequiredDocumentDataChild,
    UploadeAttachments,
    deleteAttachments,
    updateAttachmentStatus,
    DownloadRequiredListDocuments,
    UpdateClientData,
  } = RequiredDocumentApi();

  // hooks history
  const { getData: getHistoryData, history } = useUploadDocumentHistory();

  // state data
  const [woData, setWoData] = useState([]);
  const [refForm, setRefForm] = useState("");

  const handleForm = (e) => {
    const value = e.target.value.toUpperCase();
    setRefForm(value);
  };

  // required document
  const [requiredDocument, setRequiredDocument] = useState([]);

  //context
  const { wo } = useWoContext();
  const { customer } = useAccountSettingContext();

  // toast
  const toastRef = useRef(null);
  const show = (severity, summary, detail) => {
    toastRef.current.show({
      severity: severity,
      summary: summary,
      detail: detail,
    });
  };

  // function
  const getWoBtn = async () => {
    try {
      if (refForm != "") {
        if (wo.length > 0) {
          const wo_filtered = wo.filter((item) => item.ref_num === refForm);
          setWoData(wo_filtered);
          // get required document
          const req_document = await getRequiredDocumentDataByRefNum(refForm);
          const req_document_child =
            (await getRequiredDocumentDataChild(req_document[0]?.id)) ?? 0;
          if (req_document.length == 0) {
            setRequiredDocument([]);
            return;
          }
          // parent bg_color
          const parent_bgColor = [
            { id: 0, name: "Open", bg_color: "#00C49A" },
            { id: 1, name: "Waiting", bg_color: "#FFEB3B" },
            { id: 2, name: "Submitted", bg_color: "#007BFF" },
            { id: 3, name: "Request for Change", bg_color: "#FFEB3B" },
          ];
          setRequiredDocument({
            data: req_document_child ?? [],
            isLoading: false,
            parent: {
              name: req_document[0]?.[2260] ?? 0,
              bg_color: parent_bgColor.filter(
                (item) => item.name == req_document[0]?.[2260] ?? 0
              )[0],
            },
            parent_id: req_document[0].id,
          });
          // update history data
          getHistoryData(req_document[0].id);

          // update client data
          if (req_document[0].id) {
            const update_client = await UpdateClientData(
              req_document[0].id,
              customer[466],
              customer[229]
            );
            console.log(update_client);
          } else {
            throw new Error("Client data error in Upload Document");
          }
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  // file upload handler
  const readFileAsBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result.split(",")[1]);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };
  const FilesUploadHandle = async (e, id) => {
    const file = e.target.files[0];
    const date = new Date();
    const day = date.getDate();
    const dateString = date.toLocaleDateString();
    const timeString = date.toLocaleTimeString();
    const timestamp = Math.floor(Date.now() / 1000);
    const dateTimeString = `${dateString} ${timeString}`;

    if (id) {
      const base64Content = await readFileAsBase64(file);
      try {
        const upload_attachment = await UploadeAttachments(
          file.name,
          base64Content,
          id,
          dateTimeString
        );
        setRequiredDocument((prev) => ({ ...prev, isLoading: true }));
        if (upload_attachment) {
          const document_data = await getWoBtn();
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  const deleteAttachmentBtn = async (id) => {
    try {
      const delete_data = await deleteAttachments(id, 2266);
      if (delete_data) {
        const status = await updateAttachmentStatus(0, id);
        const data = await getWoBtn();
        console.log(status);
        if (status) {
          show("error", "Info", `File Deteled: ${status.data.id}`);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDownloadUploadedDocuments = async (id) => {
    const download_docs = await DownloadRequiredListDocuments(id);

    if (download_docs) {
      const binaryString = atob(download_docs.content);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const blob = new Blob([bytes], { type: "application/zip" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = download_docs.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  return {
    wo,
    woData,
    getWoBtn,
    refForm,
    setRefForm,
    handleForm,
    requiredDocument,
    FilesUploadHandle,
    deleteAttachmentBtn,
    handleDownloadUploadedDocuments,
    toastRef,
    HistoryHooks: { history, getHistoryData },
    UpdateClientData,
  };
};

export default useUploadDocumentData;
