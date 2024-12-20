"use client";
import React from "react";
import SearchInput from "@/app/components/ui/form/SearchInput";
import WebButton from "@/app/components/ui/WebButton";
import Form from "@/app/components/ui/form/Form";
import useTicketNewData from "./hooks/useTicketNewData";
import { AnimatePresence, motion } from "framer-motion";
import { tickets_category_data } from "../list/data/TicketsCategoryData";
import { FileUpload } from "primereact/fileupload";

import "primereact/resources/themes/lara-light-cyan/theme.css";
import "./TicketsNew.css";

const TicketPageNew = () => {
  const { search, setSearch, woData, handleForm, form, getWoData, onUpload } =
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
              <select
                name="category"
                onChange={(e) => handleForm(e)}
                id=""
                className="border text-sm focus:outline-blue-600 w-full p-3"
              >
                {tickets_category_data.map((item) => {
                  return (
                    <option key={item.id} value={item.id}>
                      {item.category}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="relative flex w-full flex-col p-1 gap-2">
              <span className=" text-gray-500  text-sm">Problem Details</span>
              <textarea
                className="border resize-none text-sm w-full p-3 h-56 focus:outline-blue-600"
                name="details"
                id=""
                onChange={(e) => handleForm(e)}
                value={form.details}
              ></textarea>
              <span className=" text-xs absolute bottom-2 right-1 me-4 text-gray-500">
                {form.details.length} / 120
              </span>
            </div>
            <div className="w-full my-3 text-sm">
              <FileUpload
                multiple
                accept="image/*"
                maxFileSize={5000000}
                emptyTemplate={
                  <p className="m-0">Drag and drop files to here to upload.</p>
                }
                className=" border w-full text-sm"
                onSelect={onUpload}
              />
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