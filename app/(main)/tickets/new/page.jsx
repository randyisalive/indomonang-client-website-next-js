"use client";
import React from "react";
import SearchInput from "@/app/components/ui/form/SearchInput";
import WebButton from "@/app/components/ui/WebButton";
import Form from "@/app/components/ui/form/Form";
import useTicketNewData from "./hooks/useTicketNewData";
import { AnimatePresence, motion } from "framer-motion";

const TicketPageNew = () => {
  const { search, setSearch, woData, handleForm, form, getWoData } =
    useTicketNewData();
  return (
    <div>
      <div className="flex gap-3 mx-5 lg:mx-0">
        <SearchInput
          name="ref_num"
          search={search}
          setSearch={setSearch}
          className={"w-full"}
          placeholder="Reference Number"
        />
        <WebButton
          title="Search"
          className={`w-fit`}
          onClickFunction={getWoData}
        />
      </div>
      <AnimatePresence>
        {woData.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="my-5 mx-5 lg:mx-0"
          >
            <Form
              title="Recepeint Email"
              type="email"
              name="email"
              placeholder="Email"
              onChange={(e) => handleForm(e)}
              value={form.email}
            />
            <Form
              title="Name"
              name="name"
              type="text"
              placeholder="Your Name"
              onChange={(e) => handleForm(e)}
              value={form.name}
            />
            <div className=" w-full my-3 flex flex-col  p-1 gap-2">
              <span className=" text-gray-500 text-sm">Category</span>
              <select name="" id="" className="border w-full p-3">
                <option value=""></option>
              </select>
            </div>
            <div className=" w-full my-3 flex flex-col relative  p-1 gap-2">
              <span className=" text-gray-500  text-sm">Problem Details</span>
              <textarea
                className="border resize-none text-sm w-1/2 p-3 h-56 focus:outline-blue-400"
                name="details"
                id=""
                onChange={(e) => handleForm(e)}
                value={form.details}
              ></textarea>
              <span className=" text-xs absolute bottom-2 right-1/2 me-4 text-gray-500">
                {" "}
                {form.details.length} / 120
              </span>
            </div>
            <div className="my-3 flex justify-center">
              <WebButton title="Submit Ticket" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TicketPageNew;
