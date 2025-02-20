import api from "@/app/api/api";
import WebButton from "@/app/components/ui/WebButton";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Dialog } from "primereact/dialog";
import React, { useEffect, useState } from "react";
import parser from "html-react-parser";

const SubmitDialog = ({ ref_num = "" }) => {
  // api
  const { RequiredDocumentApi } = api();
  const { updateRequiredListStatus } = RequiredDocumentApi();
  const [visible, setVisible] = useState(false);
  const handleDialog = (status) => {
    setVisible(status);
  };

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
    <h1>Data Submission Agreement</h1>
    <p><strong>Effective Date:</strong> [Insert Date]</p>

    <p>This Data Submission Agreement ("Agreement") is entered into by and between <strong>[Your Company/Organization Name]</strong> ("We," "Us," or "Our") and the individual or entity ("You" or "Your") submitting data through the online form provided on <strong>[Website URL]</strong> ("Online Form"). By submitting data through the Online Form, You agree to the following terms and conditions:</p>

    <h2>1. Purpose of Data Submission</h2>
    <p>You agree that the data You submit through the Online Form will be used for the purposes specified on the Online Form, including but not limited to <strong>[state the purpose, e.g., processing your request, providing services, contacting you, etc.]</strong>.</p>

    <h2>2. Accuracy of Data</h2>
    <p>You represent and warrant that all information submitted through the Online Form is accurate, complete, and up-to-date to the best of Your knowledge. You agree to promptly update any information that changes after submission.</p>

    <h2>3. Ownership of Data</h2>
    <p>By submitting data through the Online Form, You grant Us a non-exclusive, royalty-free, worldwide license to use, store, process, and reproduce the data for the purposes outlined in this Agreement.</p>

    <h2>4. Data Privacy and Security</h2>
    <p>We are committed to protecting Your privacy and will handle Your data in accordance with Our <a href="[link to Privacy Policy]">Privacy Policy</a>. We will implement reasonable security measures to protect Your data from unauthorized access, disclosure, or misuse.</p>

    <h2>5. Third-Party Sharing</h2>
    <p>We will not share, sell, or disclose Your data to third parties except as necessary to fulfill the purposes outlined in this Agreement or as required by law. If third-party sharing is necessary, We will ensure that such parties are bound by confidentiality obligations.</p>

    <h2>6. Data Retention</h2>
    <p>We will retain Your data only for as long as necessary to fulfill the purposes outlined in this Agreement or as required by applicable laws and regulations. You may request the deletion of Your data at any time by contacting Us at <strong>[contact email/phone number]</strong>.</p>

    <h2>7. User Rights</h2>
    <p>You have the right to:</p>
    <ul>
        <li>Access the data You have submitted;</li>
        <li>Request corrections to inaccurate or incomplete data;</li>
        <li>Request the deletion of Your data, subject to legal or contractual obligations; and</li>
        <li>Withdraw consent for the use of Your data, where applicable.</li>
    </ul>
    <p>To exercise these rights, please contact Us at <strong>[contact email/phone number]</strong>.</p>

    <h2>8. Limitation of Liability</h2>
    <p>To the fullest extent permitted by law, We shall not be liable for any indirect, incidental, consequential, or special damages arising out of or in connection with the submission, use, or storage of Your data.</p>

    <h2>9. Governing Law</h2>
    <p>This Agreement shall be governed by and construed in accordance with the laws of <strong>[State/Country]</strong>. Any disputes arising under this Agreement shall be resolved in the courts of <strong>[State/Country]</strong>.</p>

    <h2>10. Changes to This Agreement</h2>
    <p>We reserve the right to modify this Agreement at any time. Any changes will be effective immediately upon posting the updated Agreement on the Online Form or notifying You directly. Your continued use of the Online Form after such changes constitutes Your acceptance of the revised Agreement.</p>

    <h2>11. Acceptance of Terms</h2>
    <p>By submitting data through the Online Form, You acknowledge that You have read, understood, and agree to be bound by this Agreement. If You do not agree to these terms, do not submit any data through the Online Form.</p>

    <h2>Contact Information</h2>
    <p>If You have any questions or concerns about this Agreement or the handling of Your data, please contact Us at:</p>
    <p><strong>[Your Company/Organization Name]</strong><br>
    <strong>[Address]</strong><br>
    <strong>[Email Address]</strong><br>
    <strong>[Phone Number]</strong></p>`;
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
            <span className=" text-sm">I Agree with the Terms & Condition</span>
          </div>
          <div className="flex w-full justify-start my-1">
            <AnimatePresence>
              {agree ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <WebButton
                    disabled={!agree}
                    styles={
                      !agree
                        ? { cursor: "not-allowed", opacity: "0" }
                        : { cursor: "pointer" }
                    }
                    title="Final Submission"
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
