"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import useDecryptionKeyData from "@/app/hooks/useDecryptionKeyData";
import WebButton from "@/app/components/ui/WebButton";
import { truncateString } from "@/app/function/TruncateString";
import TextAreaTicket from "./TextAreaTicket";
import ReplyComponents from "./ReplyComponents";
import StatusBadge from "@/app/components/ui/tableComponent/StatusBadge";
import { useAccountDataContext } from "@/app/admin/context/AccountDataContext";

const TicketsChatsConvo = ({
  ticket = [],
  form = {},
  handleKeyDown = () => {},
  handleForm = () => {},
  SubmitMessage = () => {},
  refreshBtn = () => {},
  handleDownload = () => {},
  updateTicket = (ticket_id, value) => {},
  ticketStatus = [],
  attachments = [],
  handleAttachments = () => {},
  deleteAttachment = () => {},
  handleMouseEnter = () => {},
  handleMouseLeave = () => {},
  handleRemoveAttachment = () => {},
  errorMsg = "",
}) => {
  const { role } = useAccountDataContext();

  return (
    <div className={`mb-5 rounded-xl flex flex-col gap-10 w-full relative `}>
      <div className="w-full">
        {role === "Client" && (
          <select
            name=""
            id=""
            className="p-2 rounded-full shadow-sm w-full border"
            onChange={(e) =>
              updateTicket(ticket.ticket_data.id, e.target.value)
            }
          >
            <option value="0">Open</option>

            <option value="2">Closed</option>
            <option value="3">Canceled</option>
          </select>
        )}
      </div>
      <div className="bg-white  border rounded-xl flex flex-col justify-between  p-3 h-fit gap-5 shadow-lg">
        <div className="flex flex-col h-100 justify-between">
          <div className=" flex flex-col">
            <div className=" flex gap-2 items-center mb-2">
              <span className=" text-base font-bold text-gray-500 uppercase">
                {ticket.ticket_data[2470]}
              </span>{" "}
              {ticket.ticket_status?.length > 0 ? (
                <span>
                  <StatusBadge
                    title={ticket.ticket_status[0].text}
                    bg_color={ticket.ticket_status[0].bg_color}
                    font_color="white"
                  />
                </span>
              ) : null}
            </div>
            <p className="mt-2 text-lg font-bold">{ticket.ticket_data[2465]}</p>{" "}
          </div>
          <div>
            <span className=" text-xs text-gray-400">
              {ticket.ticket_data["date_added"]} - {ticket.ticket_data[2464]}
            </span>
          </div>
        </div>
        <div className="gap-2 flex-col justify-center flex mt-3">
          <AnimatePresence>
            {ticket.attachments && (
              <motion.div
                className=" flex justify-center gap-3 flex-col w-fit"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
              >
                <ul className="text-start flex flex-col gap-3">
                  {ticket.attachments_total?.names?.map((item) => {
                    return (
                      <li key={item} className="flex gap-2 text-xs">
                        <i className="pi pi-file"></i>
                        <p> {truncateString(item, 45)}</p>
                      </li>
                    );
                  })}
                </ul>
                <WebButton
                  title="Download Attachments"
                  onClickFunction={() => {
                    handleDownload(
                      ticket.attachments.content,
                      ticket.attachments.filename
                    );
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <TextAreaTicket
        SubmitMessage={SubmitMessage}
        handleForm={handleForm}
        handleAttachments={handleAttachments}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
        deleteAttachment={deleteAttachment}
        attachments={attachments}
        handleRemoveAttachment={handleRemoveAttachment}
        errorMsg={errorMsg}
      />
      <ReplyComponents
        ticket={ticket}
        handleDownload={handleDownload}
        role={role}
      />
    </div>
  );
};

export default TicketsChatsConvo;
