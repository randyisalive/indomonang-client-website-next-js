"use client";
import Link from "next/link";
import React from "react";
import Form from "./Form";
import RadioButton from "./RadioButton";
import WebButton from "../WebButton";
import useLoginData from "@/app/hooks/useLoginData";

const FormControl = ({ children, title = "", className = {} }) => {
  // form api
  const { handleForm, form, handleLogin, users } = useLoginData();
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
        />
        <Form
          title="Password"
          placeholder="Password"
          type="password"
          subtitle="Forgot?"
          onChange={handleForm}
          name="password"
        />
        <RadioButton
          title="Remember Me"
          inputType={"checkbox"}
          name="remember"
        />
        <WebButton
          styles={{ backgroundColor: "#1E56A0" }}
          title="Login"
          className={`p-3 text-white font-bold rounded-sm`}
          def={true}
          onClickFunction={handleLogin}
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
