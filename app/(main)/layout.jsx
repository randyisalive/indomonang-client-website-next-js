import React from "react";
import Navbar from "../components/Navbar";
import WithAuth from "./WithAuth";

const layout = ({ children }) => {
  return (
    <>
      <WithAuth>
        <section className="md:px-6 lg:p-0 ">
          <Navbar />
          <main className=" min-h-full overflow-x-hidden">{children}</main>
        </section>
      </WithAuth>
    </>
  );
};

export default layout;
