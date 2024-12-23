"use client";
import StatusBadge from "@/app/components/ui/tableComponent/StatusBadge";
import React from "react";
import useTicketDetailData from "./hooks/useTicketDetailData";

import "primeicons/primeicons.css";

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
    <div className="flex text-sm flex-col  p-3 items-center">
      {ticket.ticket_data && (
        <div className="w-1/2 bg-white shadow-lg rounded-lg p-3">
          <span>
            <StatusBadge title="Open" bg_color="green" font_color="white" />
          </span>
          <div className=" flex gap-2 my-5 border-b pb-5">
            <div className="flex flex-col gap-2 w-2/3">
              <span className=" text-black font-bold">{category}</span>
              <span className=" text-gray-500">{ref}</span>
            </div>
            <div className=" items-end flex flex-col w-1/3 gap-2">
              <span className=" text-black font-bold">Time Elapsed</span>
              <span className=" text-gray-500">11h 40m</span>
              <span className="text-xs text-gray-500">{date_added}</span>
            </div>
          </div>
          <div className="flex gap-2 flex-col flex-wrap">
            <div className="w-full block lg:flex  lg:gap-5">
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
            </div>
          </div>
        </div>
      )}

      <div className="my-5 shadow-lg rounded-xl w-full">
        <div className="bg-gray-100 rounded-xl relative p-3">
          {ticket.chats_data?.map((item) => {
            return (
              <div key={item.id} className=" text-lg flex gap-3 p-2">
                <div className=" flex flex-col gap-3 justify-end">
                  {item[2746] === "Client" && (
                    <img
                      src="/f6f6f6d6e4f01e56a0163172.png"
                      className=" rounded-full"
                      width={45}
                      alt=""
                    />
                  )}
                  {item[2746] === "Admin" && (
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/9703/9703596.png"
                      className=" rounded-full"
                      width={45}
                      alt=""
                    />
                  )}
                </div>
                <div className="bg-white text-sm p-3 w-full rounded-xl">
                  {item[2653]}
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
            <i
              className="pi pi-send text-lg"
              onClick={() => SubmitMessage()}
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetail;
