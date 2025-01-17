import React from "react";
import Navbar from "../components/Navbar";
import WithAuth from "./WithAuth";
import { ProfileCardProvider } from "../Context/ProfileCardContext";
import { HomeCardContainerProvider } from "../Context/HomeCardContainerContext";
import { ActiveProductProvider } from "../Context/ActiveProductContext";
import { RecentNewsProvider } from "../Context/RecentNewsContext";
import { WoProvider } from "./your-orders/context/WoContext";
import { BillingProvider } from "./billing/context/BillingContext";
import { InvoiceProvider } from "./invoice/context/InvoiceContext";
import ExpatriateListContext, {
  ExpatriateListProvider,
} from "../admin/account/[profile]/[id]/context/ExpatriateListContext";

const layout = ({ children }) => {
  return (
    <>
      <WithAuth>
        <WoProvider>
          <ProfileCardProvider>
            <HomeCardContainerProvider>
              <ActiveProductProvider>
                <RecentNewsProvider>
                  <BillingProvider>
                    <InvoiceProvider>
                      <ExpatriateListProvider>
                        <section className="md:px-6 lg:p-0 ">
                          <Navbar />
                          <main className=" min-h-full ">{children}</main>
                        </section>
                      </ExpatriateListProvider>
                    </InvoiceProvider>
                  </BillingProvider>
                </RecentNewsProvider>
              </ActiveProductProvider>
            </HomeCardContainerProvider>
          </ProfileCardProvider>
        </WoProvider>
      </WithAuth>
    </>
  );
};

export default layout;
