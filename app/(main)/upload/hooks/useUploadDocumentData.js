"use client";
import api from "@/app/api/api";
import { useState } from "react";
import { useWoContext } from "../../your-orders/context/WoContext";

const useUploadDocumentData = () => {
  // api
  const { WOApi, RequiredDocumentApi } = api();
  const { getWoByRefNum } = WOApi();
  const {
    getRequiredDocumentDataByRefNum,
    getRequiredDocumentDataChild,
    UploadeAttachments,
    deleteAttachments,
    updateAttachmentStatus,
  } = RequiredDocumentApi();

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
            { id: 1, name: "Generated", bg_color: "#72A276" },
            { id: 2, name: "Completed", bg_color: "#007BFF" },
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
          });
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
    if (id) {
      const base64Content = await readFileAsBase64(file);
      try {
        const upload_attachment = await UploadeAttachments(
          file.name,
          base64Content,
          id
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
      }
    } catch (e) {
      console.error(e);
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
  };
};

export default useUploadDocumentData;
