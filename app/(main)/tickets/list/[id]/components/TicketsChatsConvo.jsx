"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import useDecryptionKeyData from "@/app/hooks/useDecryptionKeyData";

const TicketsChatsConvo = ({
  ticket = [],
  form = {},
  handleKeyDown = () => {},
  handleForm = () => {},
  SubmitMessage = () => {},
  refreshBtn = () => {},
  updateTicket = (ticket_id, value) => {},
  ticketStatus = [],
}) => {
  const { role } = useDecryptionKeyData();
  return (
    <div className={`my-5 px-10 lg:px-0 rounded-xl w-full relative `}>
      <div className="bg-gray-100 rounded-xl relative p-3 h-96 overflow-y-auto">
        <div className="w-full flex items-center gap-5 justify-between p-3">
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
          <div>
            <motion.i
              whileTap={{ scale: 0.889 }}
              className="pi pi-refresh text-xl"
              onClick={() => refreshBtn()}
            ></motion.i>
          </div>
        </div>
        {ticket.chats_data?.map((item) => {
          return (
            <div key={item.id} className=" text-lg flex gap-3 p-2">
              <div className=" flex flex-col gap-3 justify-end">
                <img
                  src={`data:image/jpg;base64,${item.image?.content}`}
                  className=" rounded-full"
                  width={45}
                  alt=""
                />
              </div>
              <div className="bg-white text-sm p-3 w-full rounded-xl">
                {item.text}
              </div>
            </div>
          );
        })}
      </div>
      <div className=" bg-white text-lg flex p-2 px-3  mt-5 mb-0 items-center rounded-full shadow-lg">
        <input
          type="text"
          name="text"
          value={form.text}
          placeholder="Type a message..."
          onChange={(e) => handleForm(e)}
          onKeyDown={handleKeyDown}
          className=" w-full rounded-full p-2 focus:outline-none"
        />
        <i className="pi pi-send text-lg" onClick={() => SubmitMessage()}></i>
      </div>
    </div>
  );
};

export default TicketsChatsConvo;
