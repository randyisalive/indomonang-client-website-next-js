import Navbar from "@/app/components/Navbar";
import Link from "next/link";
import React, { Suspense } from "react";
import FormChangePassword from "./components/FormChangePassword";

const ResetChildPage = () => {
  return (
    <Suspense fallback="Loading...">
      <div className="bg-mainBlue flex lg:justify-center p-5 h-screen">
        <div className="flex flex-col p-5    lg:w-2/6  border bg-white rounded-md">
          <span className="text-4xl mt-3 font-bold w-full text-center">
            Lost Password Reset
          </span>
          <span className="mt-5 text-sm text-gray-400 mb-3 text-center">
            Please enter your desired new password below.
          </span>
          <FormChangePassword />
        </div>
      </div>
    </Suspense>
  );
};

export default ResetChildPage;
