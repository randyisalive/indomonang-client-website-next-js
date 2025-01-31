"use client";
import Form from "@/app/components/ui/form/Form";
import React from "react";
import SelectForm from "@/app/components/ui/form/SelectForm";
import WebButton from "@/app/components/ui/WebButton";
import Link from "next/link";
import SignupDialog from "./SignupDialog";
import { Message } from "primereact/message";
import { AnimatePresence, motion } from "framer-motion";
import useSignupData from "../hooks/useSignupData";

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
      <div className="flex mt-5 flex-col gap-3">
        <h3 className=" text-xl">Personal Information</h3>
        <div className="block lg:flex gap-3">
          <Form
            className={`w-full lg:w-1/2`}
            type="text"
            name="username"
            title="Username *"
            placeholder=""
            value={form.username}
            onChange={(e) => handleForm(e)}
          />
          <Form
            className={`w-full lg:w-1/2`}
            placeholder=""
            type="password"
            title="Password *"
            name="password"
            onChange={(e) => handleForm(e)}
            value={form.password}
          />
        </div>
        <div className="block lg:flex gap-3">
          <Form
            type="email"
            name="email"
            className={`w-full lg:w-1/2`}
            title="Email *"
            value={form.email}
            placeholder="newmail@email.com"
            onChange={(e) => handleForm(e)}
          />
          <SelectForm
            title="Company *"
            className={`w-full lg:w-1/2`}
            name="company"
            onChange={(e) => handleForm(e)}
          >
            <option value="" selected></option>
            {company.map((item) => {
              return (
                <option key={item[228]} value={item.id}>
                  {item[228]}
                </option>
              );
            })}
          </SelectForm>
        </div>
      </div>
      <div className="flex mt-5 flex-col gap-3">
        <h3 className=" text-xl">Account Role</h3>
        <div className="flex gap-3">
          <SelectForm
            title="Role *"
            className={`w-full`}
            name="role"
            onChange={(e) => handleForm(e)}
          >
            <option value="" selected></option>
            <option value="618">Admin</option>
            <option value="619">Client</option>
          </SelectForm>
        </div>
        <div className="w-full text-center flex-col flex gap-3">
          <AnimatePresence>
            {signupLoading === 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                whileTap={{ scale: 0.889 }}
                className="w-full select-none"
              >
                <Message className="w-full" severity="error" text={message} />
              </motion.div>
            )}
          </AnimatePresence>

          <WebButton
            title={
              signupLoading === 1 ? (
                <i className="pi pi-spin pi-spinner"></i>
              ) : (
                "Create Account"
              )
            }
            onClickFunction={() => SignupButton()}
          />
        </div>
        <footer className="mt-3 border-t text-center text-sm text-gray-700 p-3">
          Already registered with us?
          <Link
            className=" text-tertiaryBlue hover:underline cursor-pointer mx-1"
            href={`/login`}
          >
            Sign In
          </Link>
          Or
          <Link
            href={`/reset`}
            className=" text-tertiaryBlue hover:underline mx-1"
          >
            Reset Password
          </Link>
        </footer>
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
