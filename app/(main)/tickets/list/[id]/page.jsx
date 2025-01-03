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
    <div className="block text-sm gap-5  p-3 items-center">
      {ticket.ticket_data && (
        <div className=" lg:w-1/2 bg-white shadow-lg rounded-lg p-3">
          {ticket.ticket_status?.length > 0 ? (
            <span>
              <StatusBadge
                title={ticket.ticket_status[0].text}
                bg_color={ticket.ticket_status[0].bg_color}
                font_color="white"
              />
            </span>
          ) : null}

          <div className=" flex gap-2 mt-5 mb-1 border-b pb-5">
            <div className="flex flex-col gap-2 w-2/3">
              <span className=" text-black font-bold">{category}</span>
              <span className=" text-gray-500">{ref}</span>
            </div>
            <div className=" items-end flex flex-col w-1/3 gap-2">
              <span className=" text-black font-bold">Time Elapsed</span>
              <span className=" text-gray-500">
                Mr./Ms. {ticket.ticket_data[2464]}
              </span>
            </div>
          </div>
        </div>
      )}
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
