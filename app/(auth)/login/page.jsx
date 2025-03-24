import React from "react";
import "./login.css";
import FormControl from "@/app/components/ui/form/FormControl";

const LoginPage = () => {
  return (
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
  );
};

export default LoginPage;
