"use client";
import React, { useEffect } from "react";
import "./login.css";
import FormControl from "@/app/components/ui/form/FormControl";
import { SessionProvider } from "next-auth/react";

const LoginPage = () => {
  return (
    <SessionProvider>
      <div className="flex h-screen justify-center items-center">
        <div className="  justify-center items-center flex w-full  ">
          <FormControl title="Secure Client Login" logo="/jadicrm2.png" />
        </div>
      </div>
    </SessionProvider>
  );
};

export default LoginPage;
