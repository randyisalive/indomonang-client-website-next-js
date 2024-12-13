import React from "react";
import "./login.css";
import FormControl from "@/app/components/ui/form/FormControl";
import Image from "next/image";

const LoginPage = () => {
  return (
    <div className="flex h-screen">
      <div
        className="w-3/6 login-background text-white text-3xl p-3 hidden md:block"
        style={{ backgroundColor: "#1E56A0" }}
      >
        <Image
          src="https://indomonangjadi.com/wp-content/uploads/2023/11/Logo-Default.png"
          alt="Description of the image"
          width={300}
          height={200}
        />
      </div>
      <div className="w-full p-3 justify-center items-center flex  md:w-3/6">
        <FormControl title="Secure Client Login" className={`w-96 shadow-md`} />
      </div>
    </div>
  );
};

export default LoginPage;
