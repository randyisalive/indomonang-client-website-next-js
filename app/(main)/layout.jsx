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
import { DependentListProvider } from "../admin/account/[profile]/[id]/context/DependentListContext";
import { VisitorsListProvider } from "../admin/account/[profile]/[id]/context/VisitorsListContext";
import { DecryptionProvider } from "../Context/DecryptionContext";

const layout = ({ children }) => {
  return (
    <>
      <DecryptionProvider>
        <WithAuth>
          <WoProvider>
            <ProfileCardProvider>
              <HomeCardContainerProvider>
                <ActiveProductProvider>
                  <RecentNewsProvider>
                    <BillingProvider>
                      <InvoiceProvider>
                        <ExpatriateListProvider>
                          <DependentListProvider>
                            <VisitorsListProvider>
                              <section className="md:px-6 lg:p-0 ">
                                <Navbar />
                                <main className=" min-h-full ">{children}</main>
                              </section>
                            </VisitorsListProvider>
                          </DependentListProvider>
                        </ExpatriateListProvider>
                      </InvoiceProvider>
                    </BillingProvider>
                  </RecentNewsProvider>
                </ActiveProductProvider>
              </HomeCardContainerProvider>
            </ProfileCardProvider>
          </WoProvider>
        </WithAuth>
      </DecryptionProvider>
    </>
  );
};

export default layout;
