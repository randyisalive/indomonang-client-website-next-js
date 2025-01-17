"use client";
import Form from "@/app/components/ui/form/Form";
import WebButton from "@/app/components/ui/WebButton";
import React from "react";
import useResetData from "../hooks/useResetData";
import { Message } from "primereact/message";

const FormReset = () => {
  const { message, form, handleForm, ResetPassword, isLoading } =
    useResetData();
  return (
    <div className="mt-3 ">
      {isLoading === 0 && (
        <>
          <Form
            placeholder="Enter email"
            title="Email"
            type="email"
            name="email"
            value={form.email}
            onChange={(e) => handleForm(e)}
          />
          <div className="w-full p-1">
            <WebButton
              className={`w-full`}
              title="Submit"
              onClickFunction={ResetPassword}
            />
          </div>
        </>
      )}
      {message.message != "" && (
        <div className=" w-full  p-3 text-center">
          <Message
            text={message.message}
            severity={message.severity}
            className="w-full "
          />
        </div>
      )}
    </div>
  );
};

export default FormReset;
