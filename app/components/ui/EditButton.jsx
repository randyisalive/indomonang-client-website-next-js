import React from "react";
import { motion } from "framer-motion";

const EditButton = ({ onClickFunction = () => {} }) => {
  return (
    <>
      <motion.i
        whileTap={{ scale: 0.889 }}
        onClick={onClickFunction}
        className="pi pi-pen-to-square hover:text-blue-500 cursor-pointer"
      ></motion.i>
    </>
  );
};

export default EditButton;
