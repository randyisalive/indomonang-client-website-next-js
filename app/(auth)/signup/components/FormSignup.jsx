"use client";
import Form from "@/app/components/ui/form/Form";
import React from "react";
import WebButton from "@/app/components/ui/WebButton";
import SignupDialog from "./SignupDialog";
import { Message } from "primereact/message";
import { AnimatePresence, motion } from "framer-motion";
import useSignupData from "../hooks/useSignupData";
import exclamation from "../../../../public/icon-exclamation.png";
import Image from "next/image";

const FormSignup = () => {
  const {
    handleForm,
    form,
    company,
    visible,
    handleVisible,
    dialogLoading,
    SignupButton,
    signupLoading,
    message,
    handleDialogForm,
    submitVerification,
  } = useSignupData();
  return (
    <>
      <div className="flex  flex-col gap-[16px]">
        <div className="block lg:flex gap-[16px] ">
          <Form
            className={`w-full `}
            type="text"
            name="username"
            title="Username *"
            placeholder="Input your email here"
            value={form.username}
            onChange={(e) => handleForm(e)}
          />
          <Form
            type="email"
            name="email"
            className={`w-full `}
            title="Email Address*"
            value={form.email}
            placeholder="Input your email here"
            onChange={(e) => handleForm(e)}
          />
        </div>
        <div className="lg:w-1/2 flex flex-col gap-2 w-full">
          <span className="text-[14px] font-medium text-[#919CA7]">
            Company Name*
          </span>
          <select
            name="company"
            onChange={(e) => handleForm(e)}
            className="border w-full p-[14px] rounded-[8px] shadow text-black text-sm"
          >
            <option value=""></option>
            {company.map((i) => {
              return (
                <option key={i.id} value={i.id}>
                  {i["228"]}
                </option>
              );
            })}
          </select>
          <Form
            className={`w-full `}
            placeholder="Input your password here"
            type="password"
            title="Password *"
            name="password"
            onChange={(e) => handleForm(e)}
            value={form.password}
          />
        </div>
        <AnimatePresence>
          {signupLoading === 2 && message && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-fit gap-[6px] flex font-[500] text-[12px]"
            >
              <Image
                src={exclamation}
                width={18}
                height={20}
                alt="exclamation"
              />
              <span className="text-[#9B1D24] text-[12px]">{message}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex flex-col">
        <div className="w-full text-center flex-col flex ">
          <WebButton
            title={
              signupLoading === 1 ? (
                <i className="pi pi-spin pi-spinner"></i>
              ) : (
                "Create Account"
              )
            }
            bg_color="#9B1D24"
            onClickFunction={() => SignupButton()}
          />
        </div>

        <SignupDialog
          visible={visible}
          handleVisible={handleVisible}
          dialogLoading={dialogLoading}
          getVerification={submitVerification}
          handleDialogForm={handleDialogForm}
        />
      </div>
    </>
  );
};

export default FormSignup;
