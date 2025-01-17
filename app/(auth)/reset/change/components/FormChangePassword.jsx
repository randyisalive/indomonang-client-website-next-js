"use client";
import Form from "@/app/components/ui/form/Form";
import WebButton from "@/app/components/ui/WebButton";
import React, { useRef, useState } from "react";
import useFormChangePasswordData from "../hooks/useFormChangePasswordData";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { Message } from "primereact/message";

const FormChangePassword = () => {
  const {
    generatePassword,
    form,
    genPass,
    handleGenPass,
    handleForm,
    message,
    change_password,
  } = useFormChangePasswordData();
  const [visible, setVisible] = useState(false);
  const [copySuccess, setCopySuccess] = useState("");

  const toastRef = useRef(null);
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopySuccess("Copied!");
        toastRef.current.show({
          severity: "success",
          summary: "Success",
          detail: "Text copied to clipboard",
          life: 3000,
        });
      },
      () => {
        setCopySuccess("Failed to copy!");
        toastRef.current.show({
          severity: "error",
          summary: "Error",
          detail: "Failed to copy text",
          life: 3000,
        });
      }
    );
  };

  return (
    <div className=" text-xs p-2 flex flex-col gap-2">
      <Toast ref={toastRef} />
      <Form
        title="New Password"
        placeholder="Enter a Password"
        name="new"
        value={form.new}
        type="password"
        onChange={(e) => handleForm(e)}
      />
      <div>
        <WebButton
          title={
            <div className=" flex gap-2">
              <i className="pi pi-sync"></i>
              <span>Generate Password</span>
            </div>
          }
          onClickFunction={() => setVisible(!visible)}
        />
        <div className="mt-3">
          <Form
            title="Confirm New Password"
            type="password"
            name="confirm"
            value={form.confirm}
            placeholder=""
            onChange={(e) => handleForm(e)}
          />
          {message && (
            <div className="flex justify-center w-full mt-2">
              <Message text={message} severity="error" />
            </div>
          )}
        </div>
        <div className="mt-3 w-full">
          <WebButton
            title="Save Changes"
            className={"w-full"}
            onClickFunction={() => change_password()}
          />
        </div>
        <Dialog
          visible={visible}
          header="Generate Password"
          onHide={() => setVisible(false)}
          className="h-fit"
        >
          <div className=" flex gap-4  ">
            <div className=" flex flex-col gap-2  text-sm text-end">
              <div className="pt-2.5">
                <span>Password Length</span>
              </div>
              <div className="pt-4">
                <span>Generated Password</span>
              </div>
            </div>
            <div className="flex flex-col gap-2 h-full">
              <input
                type="number"
                value={genPass.length}
                name="length"
                onChange={(e) => handleGenPass(e)}
                className="border p-2 w-5"
                max={64}
              />
              <input
                type="text"
                name="gen"
                onChange={(e) => handleGenPass(e)}
                value={genPass.gen}
                className="border p-2 "
              />
              <WebButton
                className={`w-fit`}
                title={
                  <div className="flex gap-2">
                    <i className="pi pi-plus"></i>
                    <span>Generate Password</span>
                  </div>
                }
                onClickFunction={() => generatePassword(genPass.length)}
              />
              <WebButton
                className={`w-fit`}
                title={
                  <div className="flex gap-1">
                    <i className="pi pi-copy"></i>
                    <span>Copy</span>
                  </div>
                }
                onClickFunction={() => copyToClipboard(genPass.gen)}
              />
            </div>
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default FormChangePassword;
