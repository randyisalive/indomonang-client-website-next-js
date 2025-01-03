import React from "react";

const ReplyTextarea = () => {
  return (
    <textarea
      name="text"
      onChange={(e) => handleForm(e)}
      className={`pl-2 resize-none text-xs py-2 border-2 h-40 focus:border-blue-500 focus:outline-none w-full `}
    />
  );
};

export default ReplyTextarea;
