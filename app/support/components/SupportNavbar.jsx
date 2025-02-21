import { Image } from "primereact/image";
import React from "react";

const SupportNavbar = () => {
  return (
    <div className="p-3 text-sm flex gap-3 items-center sticky top-0 bg-white z-10">
      <Image
        alt="indomonang logo"
        src="https://indomonangjadi.com/wp-content/uploads/2023/11/Logo-Default.png"
        width="100"
        loading="lazy"
      />
      <p> Help Center</p>
    </div>
  );
};

export default SupportNavbar;
