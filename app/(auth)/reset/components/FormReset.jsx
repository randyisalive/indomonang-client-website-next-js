"use client";
import Form from "@/app/components/ui/form/Form";
import WebButton from "@/app/components/ui/WebButton";
import React from "react";
import useResetData from "../hooks/useResetData";
import { Message } from "primereact/message";
import { ProgressSpinner } from "primereact/progressspinner";
import { AnimatePresence, motion } from "framer-motion";

const FormReset = () => {
  const { message, form, handleForm, ResetPassword, isLoading } =
    useResetData();
  return (
    <div className="w-full  ">
      {isLoading === 0 && (
        <>
          <Form
            placeholder="Enter email"
            title="Email Address*"
            type="email"
            name="email"
            value={form.email}
            onChange={(e) => handleForm(e)}
          />
          <div className="w-full my-[38px]">
            <WebButton
              bg_color="#9B1D24"
              className={`w-full rounded-[8px] py-[12px] px-[24px] text-[14px] flex flex-col justify-center items-center gap-[8px]`}
              title="Submit"
              onClickFunction={ResetPassword}
            />
          </div>
        </>
      )}
      <AnimatePresence mode="wait">
        {isLoading === 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className=" w-full  text-center justify-center items-center"
          >
            <i className="pi pi-spinner pi-spin text-[35px]"></i>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {message.message != "" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className=" w-full text-center"
          >
            <Message
              text={message.message}
              severity={message.severity}
              className="w-full "
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FormReset;
