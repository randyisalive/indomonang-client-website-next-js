"use client";
import React from "react";
import Form from "./Form";
import WebButton from "../WebButton";
import useLoginData from "@/app/hooks/useLoginData";
import { Message } from "primereact/message";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { AnimatePresence, motion } from "framer-motion";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import jadicrm from "../../../../public/jadicrm2.png";

const FormControl = ({ children, title = "", className = {}, logo = "" }) => {
  // form api
  const sessionData = useSession();

  const { handleForm, form, handleLogin, isLoading, message, handleSubmit } =
    useLoginData();

  return (
    <div
      className={` h-fit ${className} p-[32px] w-[644px] gap-[48px] flex flex-col`}
    >
      <section className="w-full flex-col" style={{ width: "580px" }}>
        <header className="flex flex-col" style={{ gap: "16px" }}>
          <div className=" flex gap-5 mb-5 items-center">
            <Image src={jadicrm} alt="logo.png" width={100} height={100} />
            <span className=" font-bold text-3xl">JadiCRM</span>
          </div>
          <div style={{ width: "580px" }} className="flex flex-col">
            <span style={{ fontSize: "32px" }} className="font-bold">
              Welcome back!
            </span>
            <span style={{ color: "#919CA7" }}>
              Start managing your work faster and better
            </span>
          </div>
        </header>
      </section>
      <section className="flex flex-col gap-[16px]">
        <Form
          title="Email Address"
          name="email"
          placeholder="Enter email"
          type="email"
          onChange={handleForm}
          value={form.email}
        />
        <Form
          title="Password"
          placeholder="Password"
          type="password"
          subtitle="Forgot Password?"
          subLink="/reset"
          onChange={handleForm}
          name="password"
          value={form.password}
        />
        <AnimatePresence>
          {isLoading === 2 && message ? (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full p-2 text-center"
              >
                <span className="">
                  <Message text={message} severity="error" />
                </span>
              </motion.div>
            </>
          ) : null}
        </AnimatePresence>
      </section>
      <div className=" flex flex-col gap-[24px] w-full">
        <WebButton
          title={
            isLoading === 1 ? (
              <i className="pi pi-spin pi-spinner"></i>
            ) : (
              <label className=" font-[600] text-[20px] hover:cursor-pointer">
                Login
              </label>
            )
          }
          bg_color="#9B1D24"
          className={`p-[24px] rounded-[8px]  font-[600] text-[20px]  border-[#E9EAEB] border text-[#D5D7DA]`}
          def={true}
          disabled={isLoading === 1 ? true : false}
          onClickFunction={() => {
            //handleLogin();
            handleSubmit();
          }}
        />
      </div>
    </div>
  );
};

export default FormControl;
