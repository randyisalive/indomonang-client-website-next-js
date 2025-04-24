"use client";
import React from "react";
import Form from "./Form";
import WebButton from "../WebButton";
import useLoginData from "@/app/hooks/useLoginData";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import jadicrm from "../../../../public/jadicrm2.png";
import exclamation from "../../../../public/icon-exclamation.png";

const FormControl = ({ children, title = "", className = {}, logo = "" }) => {
  // form api

  const { handleForm, form, handleLogin, isLoading, message, handleSubmit } =
    useLoginData();

  return (
    <div
      className={` h-fit ${className} p-[32px] w-[364px] gap-[48px] flex flex-col`}
    >
      <section className="w-full flex-col ">
        <header className="flex flex-col gap-[16px]">
          <div className=" flex  items-center justify-center">
            <Image
              src={jadicrm}
              alt="logo.png"
              width={100}
              height={100}
              priority
              style={{ width: "auto", height: "auto" }}
            />
          </div>
          <div className="flex flex-col">
            <span
              style={{ fontSize: "28px" }}
              className="font-bold text-center"
            >
              JadiCRM
            </span>
            <span
              style={{ color: "#919CA7" }}
              className=" text-center text-[14px]"
            >
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
          {isLoading === 0 && message ? (
            <>
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
                  alt="exclamation.png"
                />{" "}
                <span className="text-[#9B1D24] text-[10px]">{message}</span>
              </motion.div>
            </>
          ) : null}
        </AnimatePresence>
      </section>
      <div className=" flex flex-col gap-[24px] ">
        <WebButton
          title={
            isLoading === 1 ? (
              <i className="pi pi-spin pi-spinner font-[600] text-[20px] hover:cursor-pointer text-white"></i>
            ) : (
              <label className=" font-[600] text-[14px]  hover:cursor-pointer">
                Login
              </label>
            )
          }
          bg_color="#9B1D24"
          className={
            isLoading === 1
              ? `py-[12px] px-[24px] bg-[#9B1D24!important] rounded-[8px] flex gap-[8px] justify-center items-center font-[600] text-[20px]  border-[#E9EAEB] border `
              : `py-[12px] px-[24px]  rounded-[8px] flex gap-[8px] justify-center items-center font-[600] text-[20px]  border-[#E9EAEB] border text-[#D5D7DA]`
          }
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
