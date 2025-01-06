"use client";
import StatusBadge from "@/app/components/ui/tableComponent/StatusBadge";
import React from "react";
import useTicketDetailData from "./hooks/useTicketDetailData";

import "primeicons/primeicons.css";
import TicketsChatsConvo from "./components/TicketsChatsConvo";

const TicketDetail = () => {
  const {
    category,
    ref,
    ticket,
    SubmitMessage,
    handleForm,
    form,
    handleKeyDown,
    handleDownload,
    role,
    userImage,
    getData,
    isLoading,
    updateTicket,
    ticketStatus,
    handleAttachments,
    deleteAttachment,
    handleMouseEnter,
    handleMouseLeave,
    attachments,
    errorMsg,
    handleRemoveAttachment,
  } = useTicketDetailData();

  return (
    <div className="block text-sm gap-5 items-center">
      <TicketsChatsConvo
        ticket={ticket}
        form={form}
        handleKeyDown={handleKeyDown}
        handleForm={handleForm}
        role={role}
        userImage={userImage}
        SubmitMessage={SubmitMessage}
        refreshBtn={getData}
        isLoading={isLoading}
        updateTicket={updateTicket}
        ticketStatus={ticketStatus}
        handleDownload={handleDownload}
        handleAttachments={handleAttachments}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
        deleteAttachment={deleteAttachment}
        handleRemoveAttachment={handleRemoveAttachment}
        attachments={attachments}
        errorMsg={errorMsg}
      />
    </div>
  );
};

export default TicketDetail;
