import React from "react";
import CurrentYear from "./Footer/CurrentYear";

const Footer = () => {
  return (
    <footer className="flex text-gray-500 text-sm flex-col justify-end px-32 py-3">
      Copyright © <CurrentYear /> Indomonang Jadi. All Rights Reserved.
    </footer>
  );
};

export default Footer;
