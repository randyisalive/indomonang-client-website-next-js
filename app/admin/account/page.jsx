import WebButton from "@/app/components/ui/WebButton";
import Image from "next/image";
import React from "react";

const AccountPage = () => {
  return (
    <div className="w-full p-24 ps-0 bg-gray-500 pb-0">
      <div className="w-full text-3xl font-bold">Public Profile</div>
      <div className="w-fit text-3xl border mt-5 flex gap-7">
        <Image
          width={300}
          height={200}
          src="https://indomonangjadi.com/wp-content/uploads/2023/11/Logo-Default.png"
          alt="asd"
          className="rounded-full"
        />
        <div className="flex flex-col gap-3">
          <WebButton def={true} className={` text-lg`} />
          <WebButton def={true} className={`text-lg`} />
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
