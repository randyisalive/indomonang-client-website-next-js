import Navbar from "@/app/components/Navbar";
import Link from "next/link";
import React from "react";
import FormChangePassword from "./components/FormChangePassword";

const ResetChildPage = () => {
  return (
    <div>
      <Navbar />
      <div className="bg-mainBlue flex lg:justify-center p-5">
        <div className="flex flex-col p-5    lg:w-2/6  border bg-white rounded-md">
          <span className="text-4xl mt-3 font-bold w-full text-center">
            Lost Password Reset
          </span>
          <span className="mt-5 text-sm text-gray-400 mb-3 text-center">
            Please enter your desired new password below.
          </span>
          <FormChangePassword />
          <div className="mt-5 border-t p-3  text-center">
            <span className=" text-sm text-gray-700">
              Not a member yet?{" "}
              <Link href={`/signup`} className=" text-blue-500">
                Create a New Account
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetChildPage;
