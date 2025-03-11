import React from "react";
import "./login.css";
import FormControl from "@/app/components/ui/form/FormControl";

const LoginPage = () => {
  return (
    <div className="flex h-screen">
      <div className="w-1/2 p-3 justify-center items-center flex  md:w-3/6">
        <FormControl title="Secure Client Login" className={`w-96 shadow-md`} />
      </div>
      <div
        className="w-1/2 text-white text-3xl hidden md:block"
        style={{ backgroundColor: "#D9D9D9" }}
      ></div>
    </div>
  );
};

export default LoginPage;
