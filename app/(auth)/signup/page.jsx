"use client";
import React from "react";
import FormSignup from "./components/FormSignup";
import Image from "next/image";
import jadicrm2 from "../../../public/icon_jadicrm.png";

const SignupPage = () => {
  return (
    <div className=" flex lg:justify-center items-center h-screen">
      <div className="flex flex-col  lg:w-[644px] gap-[48px] py-[32px] px-[32px] bg- ">
        <div className="w-full flex flex-col gap-[16px]">
          <div className="flex gap-[16px] items-center">
            <Image
              src={jadicrm2}
              width={80}
              height={80}
              alt="jadicrm2.png"
              priority
              style={{ height: "auto", width: "auto", maxWidth: "auto" }}
            />
            <span className="text-[32px] font-semibold">JadiCRM</span>
          </div>
          <div className="flex flex-col gap-[8px]">
            <span className="text-[16px] text-[#919CA7]">
              New here? Let’s set up your new account
            </span>
          </div>
        </div>
        <FormSignup />
      </div>
    </div>
  );
};

export default SignupPage;
