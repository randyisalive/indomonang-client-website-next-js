"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import Form from "./Form";
import RadioButton from "./RadioButton";
import WebButton from "../WebButton";
import useLoginData from "@/app/hooks/useLoginData";
import { Message } from "primereact/message";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { AnimatePresence, motion } from "framer-motion";
import api from "@/app/api/api";

const FormControl = ({ children, title = "", className = {} }) => {
  // form api

  const {
    handleForm,
    form,
    handleLogin,
    users,
    isLoading,
    handleKeyPress,
    message,
  } = useLoginData();

  return (
    <div
      className={`border h-fit ${className}`}
      style={{ width: "644px", padding: "32px" }}
    >
      <section className="w-full flex-col" style={{ width: "580px" }}>
        <header className="flex flex-col" style={{ gap: "16px" }}>
          <img src="logo" alt="logo.png" width={"229"} height={40} />
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
      <section className="flex flex-col p-3 gap-3">
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
          subtitle="Forgot?"
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

        <WebButton
          styles={{ backgroundColor: "#1E56A0" }}
          title={
            isLoading === 1 ? (
              <i className="pi pi-spin pi-spinner"></i>
            ) : (
              `Login`
            )
          }
          className={`p-3 text-white font-bold rounded-sm`}
          def={true}
          disabled={isLoading === 1 ? true : false}
          onClickFunction={() => {
            handleLogin();
          }}
        />
      </section>
      {/*    <section id="footer" className="m-1  py-4  border-t text-sm text-center">
        <span className="text-gray-600">
          Not a member yet?
          <Link
            className="text-blue-500 px-1  hover:underline"
            href={`/signup`}
          >
            Create a New Account
          </Link>
        </span>
      </section> */}
    </div>
  );
};

export default FormControl;
