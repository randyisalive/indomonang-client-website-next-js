import api from "@/app/api/api";
import WebButton from "@/app/components/ui/WebButton";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Dialog } from "primereact/dialog";
import React, { useEffect, useState } from "react";

const SubmitDialog = ({ ref_num = "" }) => {
  // api
  const { RequiredDocumentApi } = api();
  const { updateRequiredListStatus } = RequiredDocumentApi();
  const [visible, setVisible] = useState(false);
  const handleDialog = (status) => {
    setVisible(status);
  };
  const dialog_data = [
    {
      id: 0,
      head: "1. Acceptance of Terms",
      paragraph: ` Welcome to [Your Company]! This User Agreement ("Agreement")
              governs your use of our website and services ("Services"). By
              using our Services, you agree to be bound by this Agreement.`,
    },
    {
      id: 1,
      head: "2. Modifications to this Agreement",
      paragraph: `  We reserve the right to modify this Agreement at any time. If we
              make changes to this Agreement, we will provide notice of such
              changes, such as by sending you an email, providing a notice
              through the Services, or updating the "Last Updated" date at the
              top of this Agreement.`,
    },
    {
      id: 2,
      head: "3. User Responsibilities",
      paragraph: ` You agree to use the Services only for lawful purposes and in
              accordance with this Agreement. You agree not to use the Services:`,
      list: [
        {
          id: 0,
          text: `In any way that violates any applicable federal, state,
                      local, or international law or regulation.`,
        },
        {
          id: 1,
          text: `To engage in any conduct that restricts or inhibits
                      anyone's use or enjoyment of the Services, or which, as
                      determined by us, may harm us or users of the Services, or
                      expose them to liability.`,
        },
      ],
    },
    {
      id: 3,
      head: "4. Privacy Policy",
      paragraph: ` Your use of the Services is also governed by our Privacy Policy,
              which is incorporated into this Agreement by this reference.`,
    },
    {
      id: 4,
      head: "5. Termination",
      paragraph: ` We may terminate or suspend your access to all or part of the
              Services, without notice, for any conduct that we, in our sole
              discretion, believe is in violation of this Agreement or any
              applicable law or is harmful to the interests of another user, a
              third party, or us.`,
    },
    {
      id: 5,
      head: "6. Contact Us",
      paragraph: ` If you have any questions about this Agreement, please contact us
              at [Your Contact Information].`,
    },
  ];

  const [agree, setAgree] = useState(null);
  useEffect(() => {
    console.log(agree);
  }, [agree]);

  const router = useRouter();

  // submit documents
  const submitAttachment = async () => {
    try {
      const update_status = await updateRequiredListStatus(ref_num);
      console.log(update_status);
      setTimeout(() => {
        handleDialog(false);
        window.location.href = "/upload";
      }, 1000);
    } catch (e) {
      console.error(e);
    }
  };
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
            <p>
              Welcome to [Your Company]! This User Agreement ("Agreement")
              governs your use of our website and services ("Services"). By
              using our Services, you agree to be bound by this Agreement.
            </p>
            <br />
            {dialog_data.map((item) => {
              return (
                <React.Fragment key={item.id}>
                  <h2 className="font-bold">{item.head}</h2>
                  <p>{item.paragraph}</p>
                  {item.list && (
                    <ul className=" list-disc pl-5">
                      {item.list.map((i) => {
                        return <li key={i.id}>{i.text}</li>;
                      })}
                    </ul>
                  )}

                  <br />
                </React.Fragment>
              );
            })}
          </div>
          <div className="my-3 items-center w-full flex gap-2 font-bold justify-end">
            <input
              type="checkbox"
              name="agree"
              onChange={(e) => setAgree(e.target.checked)}
            />
            <span className=" text-sm">I Agree</span>
          </div>
          <div className="flex w-full justify-end my-1">
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
