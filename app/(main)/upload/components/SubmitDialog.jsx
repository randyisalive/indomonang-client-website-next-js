import api from "@/app/api/api";
import WebButton from "@/app/components/ui/WebButton";
import { AnimatePresence, color, motion } from "framer-motion";
import { Dialog } from "primereact/dialog";
import React, { useEffect, useState } from "react";
import parser from "html-react-parser";
import { useUploadDocumentContext } from "../context/UploadDocumentContext";
import { useAccountSettingContext } from "@/app/admin/context/AccountSettingContext";

const SubmitDialog = ({ ref_num = "" }) => {
  // api
  const { RequiredDocumentApi } = api();
  const { updateRequiredListStatus } = RequiredDocumentApi();
  const [visible, setVisible] = useState(false);
  const handleDialog = (status) => {
    setVisible(status);
  };

  //context
  const { UpdateClientData, requiredDocument } = useUploadDocumentContext();
  const { customer } = useAccountSettingContext();

  const [agree, setAgree] = useState(null);

  // submit documents
  const submitAttachment = async () => {
    try {
      const update_status = await updateRequiredListStatus(ref_num);

      setTimeout(() => {
        handleDialog(false);
        window.location.href = "/upload";
      }, 1000);
    } catch (e) {
      console.error(e);
    }
  };

  const html = `  
   <div class=" text-justify">
  <p class="agreement">
    <strong>Data Submission Agreement ("Agreement")</strong><br>
    This Agreement is made between the data submitting party ("User") and PT Indomonang Jadi ("Company"). By submitting data through the "Jadi CRM" system, the User agrees to the following terms and conditions:
  </p>
  <ol class="list-decimal px-5 my-3">
    <li class="agreement">
      <span class="section-title"><strong>Accuracy of Data:</strong></span> <br/> The User represents that all information provided is accurate, complete, and true to the best of their knowledge. The User understands that providing false, misleading, or incomplete information may result in rejection of the submission or other consequences determined by the Company.
    </li>
    <li class="agreement">
      <span class="section-title"><strong>Authorization to Submit Data:</strong></span> <br/>The User confirms that they have the legal authority to provide the submitted data and that no third-party rights, including but not limited to privacy rights and intellectual property rights, are infringed.
    </li>
    <li class="agreement">
      <span class="section-title"><strong>Use of Submitted Data:</strong></span> <br/>The User grants the Company the right to store, process, and use the submitted data for the intended purpose as described in the applicable terms, policies, or agreements. The Company will handle the submitted data in accordance with its Privacy Policy.
    </li>
    <li class="agreement">
      <span class="section-title"><strong>Confidentiality and Data Protection:</strong></span><br/> The Company is committed to protecting the confidentiality of the submitted data and will take reasonable security measures to prevent unauthorized access, disclosure, or misuse. However, the Company is not responsible for breaches beyond its reasonable control.
    </li>
    <li class="agreement">
      <span class="section-title"><strong>Liability and Indemnification:</strong></span><br/> The User agrees to indemnify and hold the Company harmless from any claims, damages, or liabilities arising from false, misleading, or unauthorized data submissions.
    </li>
    <li class="agreement">
      <span class="section-title"><strong>Compliance with Laws:</strong></span> <br/>The User agrees to comply with all applicable laws and regulations related to data submission, including but not limited to data protection and privacy laws.
    </li>
    <li class="agreement">
      <span class="section-title"><strong>Amendments to the Agreement:</strong></span> <br/>The Company reserves the right to amend or update this Agreement at any time. Any changes will take effect immediately upon being published on the website or notified to the User.
    </li>
    
     <li>
      <span class="section-title"><b>Consent Declaration:</b></span><br>
      By clicking the "Agree" or "Submit" button, I declare that I have read, understood, and agreed to all the terms above without any coercion from any party.
  </li>
   
  </ol> 
  </div>
 

`;
  return (
    <div className="flex w-full mb-10 justify-end">
      <WebButton onClickFunction={() => handleDialog(true)} />
      <Dialog
        style={{ height: "50rem", width: "50rem" }}
        header={<h1 className="text-3xl ">User Agreements!</h1>}
        visible={visible}
        className="w-10"
        onHide={() => handleDialog(false)}
      >
        <div
          onContextMenu={(e) => e.preventDefault()}
          className="d-flex"
          style={{ minHeight: "800px", cursor: "default", userSelect: "none" }}
        >
          <div className="container" style={{ lineHeight: 1.8 }}>
            {parser(html)}
          </div>
          <div className="my-3 items-center w-full flex gap-2 font-bold justify-start">
            <input
              type="checkbox"
              name="agree"
              onChange={(e) => setAgree(e.target.checked)}
            />
            <span className=" text-sm">
              I Agree with the Data Submission Agreement
            </span>
          </div>
          <div className="flex w-full justify-start my-1">
            <AnimatePresence>
              {agree ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full flex justify-center gap-3"
                >
                  <WebButton
                    disabled={!agree}
                    styles={
                      !agree
                        ? { cursor: "not-allowed", opacity: "0" }
                        : {
                            cursor: "pointer",
                            backgroundColor: "#1062FE",
                            color: "white",
                          }
                    }
                    bg_color="#009aff"
                    onClickFunction={submitAttachment}
                  />
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default SubmitDialog;
