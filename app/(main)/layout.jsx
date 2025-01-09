import React from "react";
import Navbar from "../components/Navbar";
import WithAuth from "./WithAuth";
import { ProfileCardProvider } from "../Context/ProfileCardContext";
import { HomeCardContainerProvider } from "../Context/HomeCardContainerContext";
import { ActiveProductProvider } from "../Context/ActiveProductContext";

const layout = ({ children }) => {
  return (
    <>
      <WithAuth>
        <ProfileCardProvider>
          <HomeCardContainerProvider>
            <ActiveProductProvider>
              <section className="md:px-6 lg:p-0 ">
                <Navbar />
                <main className=" min-h-full ">{children}</main>
              </section>
            </ActiveProductProvider>
          </HomeCardContainerProvider>
        </ProfileCardProvider>
      </WithAuth>
    </>
  );
};

export default layout;
