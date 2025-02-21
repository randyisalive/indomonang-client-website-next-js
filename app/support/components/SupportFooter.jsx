import React from "react";

const SupportFooter = () => {
  return (
    <div className="p-3 my-20 flex flex-col gap-5">
      <span className="text-4xl">Questions?</span>
      <div className="flex flex-col">
        <span className="text-xl">Email us</span>
        <span>
          ✉️
          <span className=" underline text-gray-500 font-light">
            support@indomonang.com
          </span>
        </span>
      </div>
      <div className="flex flex-col">
        <span className="text-xl">Join our community</span>
        <span>
          ✉️
          <span className=" underline text-gray-500 font-light">
            support@indomonang.com
          </span>
        </span>
      </div>
      <div className="flex flex-col">
        <span className="text-xl">Chat support</span>
        <span>
          ✉️
          <span className=" underline text-gray-500 font-light">
            support@indomonang.com
          </span>
        </span>
      </div>
      <div className="flex flex-col">
        <span className="text-xl">Share feedback</span>
        <span>
          ✉️
          <span className=" underline text-gray-500 font-light">
            support@indomonang.com
          </span>
        </span>
      </div>
    </div>
  );
};

export default SupportFooter;
