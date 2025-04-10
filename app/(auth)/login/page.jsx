"use client";
import React, { useEffect } from "react";
import "./login.css";
import FormControl from "@/app/components/ui/form/FormControl";
import { signIn, signOut, useSession, SessionProvider } from "next-auth/react";
const LoginPage = () => {
  return (
    <SessionProvider>
      <div className="flex h-screen justify-center items-center">
        <div className="  justify-center items-center flex w-1/2  ">
          <FormControl
            title="Secure Client Login"
            logo="/Property 1=JadiCRM.png"
          />
        </div>
        <div
          className="w-1/2 h-full text-white text-3xl hidden lg:block"
          style={{ backgroundColor: "#D9D9D9" }}
        ></div>
      </div>
    </SessionProvider>
  );
};

export default LoginPage;
