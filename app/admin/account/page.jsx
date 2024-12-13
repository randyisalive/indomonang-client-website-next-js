import Image from "next/image";
import React from "react";

const AccountPage = () => {
  return (
    <div className="w-full p-24 ps-0 bg-gray-500 pb-0">
      <div className="w-full text-3xl font-bold">Public Profile</div>
      <div className="w-fit text-3xl border mt-5">
        <Image
          width={300}
          height={200}
          src="https://indomonangjadi.com/wp-content/uploads/2023/11/Logo-Default.png"
          alt="asd"
          className="rounded-full"
        />
      </div>
    </div>
  );
};

export default AccountPage;
