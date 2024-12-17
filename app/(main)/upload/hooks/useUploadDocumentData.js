"use client";
import api from "@/app/api/api";
import { useState } from "react";

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

  // function
  const getWoBtn = async () => {
    try {
      if (refForm != "") {
        const wo_data = await getWoByRefNum(refForm);

        if (wo_data) {
          const json_data = wo_data.map((item) => {
            const bgColor = [
              { id: 0, title: "Open", color: "#00C49A" },
              { id: 1, title: "Drafting", color: "#3F612D" },
              { id: 2, title: "Checking", color: "#8D80AD" },
              { id: 3, title: "Processing", color: "#192bc2" },
              { id: 4, title: "Finished", color: "#BFC9CA" },
              { id: 5, title: "Cancelled", color: "#B6244F" },
            ];
            return {
              id: item.id,
              refNum: item[2134],
              name: item[314],
              applicant: item[316],
              process: item[674],
              city: item[1809],
              status: bgColor.filter((x) => x.title === item[2138])[0],
            };
          });
          setWoData(json_data);
          // get required document
          const req_document = await getRequiredDocumentDataByRefNum(refForm);
          const req_document_child = await getRequiredDocumentDataChild(
            req_document[0].id
          );
          // parent bg_color
          const parent_bgColor = [
            { id: 0, name: "Open", bg_color: "#00C49A" },
            { id: 1, name: "Generated", bg_color: "#72A276" },
            { id: 2, name: "Completed", bg_color: "#007BFF" },
            { id: 3, name: "Request for Change", bg_color: "#FFEB3B" },
          ];
          setRequiredDocument({
            data: req_document_child,
            isLoading: false,
            parent: {
              name: req_document[0][2260],
              bg_color: parent_bgColor.filter(
                (item) => item.name == req_document[0][2260]
              )[0],
            },
          });
        }
      } else {
        console.log("RefForm is null");
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
      console.log(requiredDocument);
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
        console.log(delete_data);
        const data = await getWoBtn();
        console.log(data);
      }
    } catch (e) {
      console.error(e);
    }
  };
  return {
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
