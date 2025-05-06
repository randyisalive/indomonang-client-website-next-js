import React, { Suspense } from "react";
import FormChangePassword from "./components/FormChangePassword";
import Image from "next/image";
import jadicrm2 from "../../../../public/icon_jadicrm.png";
import LoadingScreen from "@/app/components/ui/LoadingScreen";

const ResetChildPage = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <div className="bg-white flex lg:justify-center h-screen items-center ">
        <div className="flex flex-col lg:w-[644px]  bg-white gap-[48px] p-[32px] rounded-[12px]">
          <div className="flex flex-col gap-[16px] justify-center items-center">
            <Image alt="jadicrm2.png" src={jadicrm2} width={100} height={100} />
            <div className="flex flex-col gap-[8px]">
              <span className="text-[32px]  font-bold w-full text-center">
                Reset Password
              </span>
              <span className=" text-[16px] text-gray-400 mb-3 text-center">
                Forgot your password? Enter your email and we’ll help to recover
                your account
              </span>
            </div>
          </div>
          <FormChangePassword />
        </div>
      </div>
    </Suspense>
  );
};

export default ResetChildPage;
