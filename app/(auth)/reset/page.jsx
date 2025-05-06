import Navbar from "@/app/components/Navbar";
import React, { Suspense } from "react";
import FormReset from "./components/FormReset";
import Link from "next/link";
import Image from "next/image";
import jadicrm2 from "../../../public/icon_jadicrm.png";
import LoadingScreen from "@/app/components/ui/LoadingScreen";

const ResetPasswordPage = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <div className=" flex justify-center items-center h-screen">
        <div className="flex flex-col p-[32px] w-[364px] text-[14px] bg-white  items-center rounded-[12px] gap-[48px]">
          <div className="flex flex-col gap-[16px] justify-center items-center">
            <Image src={jadicrm2} alt="jadicrm2.png" width={100} height={100} />
            <div className="flex flex-col gap-[8px]">
              <span className="text-[28px] font-[700] text-center">
                Reset Password
              </span>
              <span className=" text-[14px] font-[400] text-[#919CA7] text-center">
                Enter your email address below to begin the reset process.
              </span>
            </div>
          </div>

          <FormReset />
        </div>
      </div>
    </Suspense>
  );
};

export default ResetPasswordPage;
