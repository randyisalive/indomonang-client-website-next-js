import Navbar from "@/app/components/Navbar";
import React from "react";
import FormSignup from "./components/FormSignup";

const SignupPage = () => {
  return (
    <div>
      <div className="bg-mainBlue flex lg:justify-center p-5">
        <div className="flex flex-col  lg:w-1/2 p-3 border bg-white rounded-md">
          <span className="text-4xl mt-3 font-bold w-full text-center">
            Register
          </span>
          <FormSignup />
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
