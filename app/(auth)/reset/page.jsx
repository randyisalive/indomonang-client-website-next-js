import Navbar from "@/app/components/Navbar";
import React, { Suspense } from "react";
import FormReset from "./components/FormReset";
import Link from "next/link";

const ResetPasswordPage = () => {
  return (
    <Suspense fallback="Loading...">
      <div>
        <div className="bg-mainBlue flex lg:justify-center p-5 h-screen">
          <div className="flex flex-col p-5    lg:w-1/3  border bg-white rounded-md">
            <span className="text-4xl mt-3 font-bold w-full text-center">
              Lost Password Reset
            </span>
            <span className="mt-5 text-sm text-gray-400 text-center">
              Forgotten your password? Enter your email address below to begin
              the reset process.
            </span>
            <FormReset />
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default ResetPasswordPage;
