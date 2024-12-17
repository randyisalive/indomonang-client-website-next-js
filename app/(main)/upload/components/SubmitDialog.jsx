import WebButton from "@/app/components/ui/WebButton";
import { Dialog } from "primereact/dialog";
import React, { useState } from "react";

const SubmitDialog = () => {
  const [visible, setVisible] = useState(false);
  const handleDialog = (status) => {
    setVisible(status);
  };
  return (
    <div className="flex w-full mb-10 justify-end">
      <WebButton onClickFunction={() => handleDialog(true)} />
      <Dialog
        style={{ height: "50rem", width: "50rem" }}
        header={<h1 className="text-3xl ">User Agreements!</h1>}
        visible={visible}
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
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using the Services, you agree to be bound by this
              Agreement. If you do not agree to all the terms and conditions of
              this Agreement, you must not access or use the Services.
            </p>{" "}
            <br />
            <h2>2. Modifications to this Agreement</h2>
            <p>
              We reserve the right to modify this Agreement at any time. If we
              make changes to this Agreement, we will provide notice of such
              changes, such as by sending you an email, providing a notice
              through the Services, or updating the "Last Updated" date at the
              top of this Agreement.
            </p>
            <br />
            <h2>3. User Responsibilities</h2>
            <p>
              You agree to use the Services only for lawful purposes and in
              accordance with this Agreement. You agree not to use the Services:
            </p>
            <ul>
              <li>
                In any way that violates any applicable federal, state, local,
                or international law or regulation.
              </li>
              <li>
                To engage in any conduct that restricts or inhibits anyone's use
                or enjoyment of the Services, or which, as determined by us, may
                harm us or users of the Services, or expose them to liability.
              </li>
            </ul>
            <h2>4. Privacy Policy</h2>
            <p>
              Your use of the Services is also governed by our Privacy Policy,
              which is incorporated into this Agreement by this reference.
            </p>{" "}
            <br />
            <h2>5. Termination</h2>
            <p>
              We may terminate or suspend your access to all or part of the
              Services, without notice, for any conduct that we, in our sole
              discretion, believe is in violation of this Agreement or any
              applicable law or is harmful to the interests of another user, a
              third party, or us.
            </p>{" "}
            <br />
            <h2>6. Contact Us</h2>
            <p>
              If you have any questions about this Agreement, please contact us
              at [Your Contact Information].
            </p>
          </div>
          <div className="my-3 items-center w-full flex gap-2 font-bold justify-end">
            <input type="checkbox" />
            <span className=" text-sm">I Agree</span>
          </div>
          <div className="flex w-full justify-end my-1">
            <WebButton />
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default SubmitDialog;
