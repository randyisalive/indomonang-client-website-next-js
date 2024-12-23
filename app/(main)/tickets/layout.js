import React from "react";
import MainContainer from "../MainContainer";
import HeaderComponent from "@/app/components/ui/HeaderComponent";
import TicketNavigation from "./components/TicketNavigation";

const layout = ({ children }) => {
  const breadcrumbs_array = [
    { id: 0, text: "Public Home /", nav: "/" },
    { id: 1, text: "Tickets", nav: "/tickets/new" },
  ];

  return (
    <MainContainer>
      <HeaderComponent title="Tiket" breadcrumbs_array={breadcrumbs_array} />
      <TicketNavigation />

      {children}
    </MainContainer>
  );
};

export default layout;
