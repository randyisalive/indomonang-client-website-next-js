import React from "react";
import CurrentYear from "./Footer/CurrentYear";

const Footer = () => {
  return (
    <footer className="flex text-gray-500 text-sm flex-col justify-end  mt-14 py-3  pl-[64px] pr-[64px]">
      Copyright © <CurrentYear /> Indomonang Jadi. All Rights Reserved.
    </footer>
  );
};

export default Footer;
