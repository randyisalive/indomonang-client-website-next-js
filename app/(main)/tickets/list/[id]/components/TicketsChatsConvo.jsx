"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";

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
  return (
    <div className={`my-5 px-10 lg:px-0 rounded-xl w-full relative `}>
      <div className="bg-gray-100 rounded-xl relative p-3">
        <div className="w-full flex items-center gap-5 justify-between p-3">
          <div className="w-full">
            <select
              name=""
              id=""
              className="p-2 rounded-full shadow-sm w-full border"
              onChange={(e) =>
                updateTicket(ticket.ticket_data.id, e.target.value)
              }
            >
              {ticketStatus.map((item) => {
                return (
                  <option
                    key={item.text}
                    value={item.text === ticket.ticket_data[2467]}
                  >
                    {item.text}
                  </option>
                );
              })}
            </select>
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
    </div>
  );
};

export default TicketsChatsConvo;
