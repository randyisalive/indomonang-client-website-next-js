"use client";
import Form from "@/app/components/ui/form/Form";
import React from "react";
import useAccountsData from "../hooks/useAccountData";
import StatusBadge from "@/app/components/ui/tableComponent/StatusBadge";
import WebButton from "@/app/components/ui/WebButton";

const AccountForm = () => {
  const { handleFormAccount, accounts, handleUploadPhoto, UpdateAccountBtn } =
    useAccountsData();
  return (
    <>
      <div className="w-fit flex-wrap text-3xl  mt-5 flex gap-7">
        <img
          style={{ height: "150px", width: "150px" }}
          src={`${accounts.profile_picture?.content}`}
          className="rounded-full border-2 shadow-md"
        />
        <div className="flex flex-col  justify-evenly">
          <div className="flex relative">
            <WebButton title="Change Picture" />
            <input
              type="file"
              className="absolute opacity-0 w-full h-full cursor-pointer"
              style={{ left: 0, top: 0 }}
              onChange={(e) => handleUploadPhoto(e)}
            />
          </div>
          <div>
            <WebButton title="Delete Picture" />
          </div>
        </div>
      </div>
      <form
        action=""
        onSubmit={(e) => e.preventDefault()}
        className="p-5 mt-5 flex flex-col gap-3"
      >
        <div className="block">
          <StatusBadge
            title={accounts.user_status?.text}
            bg_color={accounts.user_status?.color}
            font_color="white"
          />
        </div>
        <div className="block">
          <Form
            title="Username"
            name="username"
            placeholder="username"
            type="text"
            value={accounts.username}
            onChange={handleFormAccount}
          />
        </div>
        <div className="block">
          <Form
            title="Email"
            name="username"
            placeholder="email"
            type="email"
            value={accounts.email}
            onChange={handleFormAccount}
          />
        </div>
        <div className="block">
          <Form
            title="Company"
            name="company"
            placeholder="company"
            type="text"
            value={accounts.company}
            onChange={handleFormAccount}
            disabled={true}
          />
        </div>
        <div className="flex gap-3 my-3 justify-center">
          <WebButton title="Save Changes" onClickFunction={UpdateAccountBtn} />
        </div>
      </form>
    </>
  );
};

export default AccountForm;
