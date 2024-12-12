import React from "react";
import HomeCard from "./components/home/HomeCard";
import WebButton from "./components/ui/WebButton";

const HomeTemplate = () => {
  return (
    <div className="flex flex-col w-full mx-auto pt-7  sm:px-6, lg:px-0 max-w-screen-xl">
      <header className="text-5xl font-bold">My Dashboard</header>
      <div className="mt-6 flex gap-3">
        <div className="w-1/4">
          <div className="border rounded-lg p-3 flex gap-3 flex-col">
            <span className="text-xl font-light">#17977 indomonangjadi</span>
            <p className="text-sm text-gray-500">
              Ike indomonang Jl. Mampang Prapt. No.55, RT.2/RW.2, Kel. Duren
              Tiga, Kec. Pancoran Jakarta Selatan, Jakarta, 12760 Indonesia
            </p>
            <div className="mt-3 flex gap-3 w-full">
              <WebButton title="Edit" />
              <WebButton title="Keluar" />
            </div>
          </div>
        </div>
        <div className="w-3/4 flex gap-3 flex-wrap justify-evenly ">
          <HomeCard />
        </div>
      </div>
    </div>
  );
};

export default HomeTemplate;
