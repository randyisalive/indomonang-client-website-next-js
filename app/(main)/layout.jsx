import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const layout = ({ children }) => {
  return (
    <>
      <section className="md:px-6 lg:p-0 ">
        <Navbar />
        <main className=" min-h-full overflow-x-hidden">{children}</main>
      </section>
    </>
  );
};

export default layout;
