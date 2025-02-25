"use client";
import { Dialog } from "primereact/dialog";
import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import { Editor } from "primereact/editor";
import { AnimatePresence, motion } from "framer-motion";
import { useQuotationContext } from "../../context/QuotationsContext";
import { useParams } from "next/navigation";
import WebButton from "@/app/components/ui/WebButton";
import { useDecryptionContext } from "@/app/Context/DecryptionContext";
import { decryptMessage } from "@/app/function/decryptor";

const RejectionQuotationDialog = ({
  visible = false,
  handleVisible = () => {},
}) => {
  const { id } = useParams();
  const slice_id = id.slice(20, -20);
  const { reject_quotation } = useQuotationContext();

  // message warning
  const [msg, setMsg] = useState("");

  // checkbox
  const [checkbox, setCheckbox] = useState(false);

  // form
  const [form, setForm] = useState("");

  useEffect(() => {
    setForm("");
  }, [visible]);

  //  header
  const renderHeader = () => {
    return (
      <span className="ql-formats">
        <select className="ql-size" defaultValue={""}>
          <option value="small"></option>
          <option value="large"></option>
          <option value="huge"></option>
        </select>
        <button className="ql-bold" aria-label="Bold"></button>
        <button className="ql-italic" aria-label="Italic"></button>
        <button className="ql-underline" aria-label="Underline"></button>
        <div className="flex ">
          <button className="ql-list" value="ordered"></button>
          <button className="ql-list" value="bullet"></button>
        </div>
        <select className="ql-align hidden">
          <option></option>
          <option value="center"></option>
          <option value="right"></option>
          <option value="justify"></option>
        </select>
      </span>
    );
  };

  const header = renderHeader();

  return (
    <Dialog
      visible={visible}
      header=" Quotation Rejection Notice"
      onHide={() => handleVisible("rejectDialog", false)}
      style={{ minWidth: "50rem", maxWidth: "50rem" }}
    >
      <div className="flex flex-col gap-3">
        <Editor
          value={form}
          onTextChange={(e) => setForm(e.htmlValue)}
          style={{ height: "320px" }}
          headerTemplate={header}
        />
        <AnimatePresence>
          {form && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <WebButton
                title="Reject Quotation 😓"
                bg_color="#FF0000"
                onClickFunction={async () => {
                  const confirmWindow = window.confirm(
                    "Are you sure about this? (this action cannot be undone)"
                  );
                  if (confirmWindow) {
                    await reject_quotation(slice_id, form);
                  } else {
                    return;
                  }
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Dialog>
  );
};

export default RejectionQuotationDialog;
