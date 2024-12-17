import React from "react";
import WebButton from "../ui/WebButton";

const ProfileCard = () => {
  return (
    <div className="border rounded-lg p-3 flex gap-3 flex-col w-52">
      <span className="text-xl font-light">#17977 indomonangjadi</span>
      <p className="text-sm text-gray-500">
        Ike indomonang Jl. Mampang Prapt. No.55, RT.2/RW.2, Kel. Duren Tiga,
        Kec. Pancoran Jakarta Selatan, Jakarta, 12760 Indonesia
      </p>
      <div className="mt-3 flex gap-3 w-full">
        <WebButton title="Edit" />
        <WebButton title="Keluar" />
      </div>
    </div>
  );
};

export default ProfileCard;
