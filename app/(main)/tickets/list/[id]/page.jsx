"use client";
import StatusBadge from "@/app/components/ui/tableComponent/StatusBadge";
import React from "react";
import useTicketDetailData from "./hooks/useTicketDetailData";

import "primeicons/primeicons.css";
import { AnimatePresence, motion } from "framer-motion";
import TicketsChatsConvo from "./components/TicketsChatsConvo";

const TicketDetail = () => {
  const {
    category,
    ref,
    date_added,
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
  } = useTicketDetailData();

  const chat_data = [
    {
      id: 0,
      role: "client",
      text: "Hey, Copilot! I've been thinking about taking a trip to Japan. Any travel tips?",
    },
    {
      id: 1,
      role: "admin",
      text: "Oh, Japan is fantastic! I'd recommend visiting during cherry blossom season if you can. The blossoms are breathtaking, and there's a festive atmosphere everywhere. Have you thought about which cities you want to visit?",
    },
    {
      id: 2,
      role: "client",
      text: "I'm planning to go to Tokyo, Kyoto, and Osaka. What are some must-see attractions in those cities?",
    },
    {
      id: 3,
      role: "admin",
      text: "Great choices! In Tokyo, you can't miss the Shibuya Crossing and the Asakusa Temple. Kyoto is famous for its historic temples like Kinkaku-ji (the Golden Pavilion) and the Fushimi Inari Shrine with its iconic torii gates. Osaka is a food lover's paradise, so be sure to try takoyaki and okonomiyaki. Are you a foodie?",
    },
  ];
  return (
    <div className="block lg:flex text-sm gap-5  p-3 items-center">
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

          <div className="gap-2 flex-col justify-center flex mt-3">
            {/*  <div className="w-full block lg:flex  lg:gap-5">
              <div className=" rounded-lg my-3 lg:my-0 bg-gray-100 p-3   lg:w-1/2">
                <span>Departure</span>
                <div className="flex gap-1 flex-col">
                  <span className=" text-lg font-bold">9:10 PM</span>
                  <span className="text-gray-800">14 June, 2023</span>
                </div>
              </div>
              <div className=" rounded-lg bg-gray-100 p-3 lg:w-1/2">
                <span>Departure</span>
                <div className="flex gap-1 flex-col">
                  <span className=" text-lg font-bold">9:10 PM</span>
                  <span className="text-gray-800">14 June, 2023</span>
                </div>
              </div>
            </div>
            <div className="w-full block lg:flex lg:gap-5">
              <div className=" rounded-lg my-3 lg:my-0 bg-gray-100 p-3   lg:w-1/3">
                <span>Departure</span>
                <div className="flex gap-1 flex-col">
                  <span className=" text-lg font-bold">9:10 PM</span>
                  <span className="text-gray-800">14 June, 2023</span>
                </div>
              </div>
              <div className=" rounded-lg my-3 lg:my-0 bg-gray-100 p-3   lg:w-1/3">
                <span>Departure</span>
                <div className="flex gap-1 flex-col">
                  <span className=" text-lg font-bold">9:10 PM</span>
                  <span className="text-gray-800">14 June, 2023</span>
                </div>
              </div>
              <div className=" rounded-lg my-3 lg:my-0 bg-gray-100 p-3   lg:w-1/3">
                <span>Departure</span>
                <div className="flex gap-1 flex-col">
                  <span className=" text-lg font-bold">9:10 PM</span>
                  <span className="text-gray-800">14 June, 2023</span>
                </div>
              </div>
            </div> */}
            <AnimatePresence>
              {ticket.attachments_total && (
                <motion.div
                  className=" flex justify-center  w-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <table className="rounded-lg text-sm">
                    <thead
                      className="text-white"
                      style={{ backgroundColor: "#9c1c23" }}
                    >
                      <tr>
                        <th className="py-3 px-4 text-center border">
                          Tickets Attachment
                        </th>
                        <th className="py-3 px-4 text-center border">
                          Download
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border px-4 py-2 text-center">
                          <ul className=" p-3 list-disc text-start flex flex-col gap-3">
                            {ticket.attachments_total?.names?.map((item) => {
                              return <li key={item}>{item}</li>;
                            })}
                          </ul>
                        </td>
                        <td className="border px-4 py-2 text-center">
                          <span
                            className=" hover:text-indomonangeRed cursor-pointer"
                            onClick={() => {
                              handleDownload(
                                ticket.attachments.content,
                                ticket.attachments.filename
                              );
                            }}
                          >
                            Download
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </motion.div>
              )}
            </AnimatePresence>
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
      />
    </div>
  );
};

export default TicketDetail;
