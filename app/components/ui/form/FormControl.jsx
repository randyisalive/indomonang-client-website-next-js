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

const FormControl = ({ children, title = "", className = {} }) => {
  // form api

  const { handleForm, form, handleLogin, users, isLoading, handleKeyPress } =
    useLoginData();
  return (
    <div className={`border h-fit ${className}`}>
      <section>
        <header className="text-5xl mt-5 text-center p-3  font-bold">
          {title}
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
          onChange={handleForm}
          name="password"
          value={form.password}
        />
        <AnimatePresence>
          {isLoading === 2 ? (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full p-2 text-center"
              >
                <span className="">
                  <Message text="Wrong Credentials" severity="error" />
                </span>
              </motion.div>
            </>
          ) : null}
        </AnimatePresence>

        <RadioButton
          title="Remember Me"
          inputType={"checkbox"}
          name="remember"
        />
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
      <section id="footer" className="m-1  py-4  border-t text-sm text-center">
        <span className="text-gray-600">
          Not a member yet?
          <Link className="text-blue-600 hover:text-blue-700" href={`/`}>
            &nbsp; Create a New Account
          </Link>
        </span>
      </section>
    </div>
  );
};

export default FormControl;
