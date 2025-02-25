import { Image } from "primereact/image";
import React from "react";
import HelpCard from "./components/HelpCard";
import SupportFooter from "./components/SupportFooter";
import { support_data } from "./data/support_data";

const SupportPage = () => {
  return (
    <div className="p-3  min-h-screen mx-20 ">
      <div className="h-96  flex flex-col justify-center mt-16">
        <Image
          loading="lazy"
          src="https://agenda.erpimj.com/hr/uploads/app_logo_1713428192.png"
          width="150"
        />
        <span className="text-5xl px-2 mt-3">Help center</span>
        <span className="mt-3 px-2 font-light">
          Learn how to use Indomonang Client Website and get your questions
          answered
        </span>
      </div>
      <div className="my-5">
        <span className="flex items-center border-b pb-1">
          <p className="text-lg">📄</p>
          <p className="">Docs</p>
        </span>
        <div className="flex  flex-wrap gap-3 p-3 justify-around w-full">
          {support_data.map((i) => {
            return <HelpCard item={i} />;
          })}
        </div>
      </div>
      <SupportFooter />
    </div>
  );
};

export default SupportPage;
