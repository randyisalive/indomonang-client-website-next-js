import React from "react";
import AccountForm from "./components/AccountForm";

const AccountPage = () => {
  return (
    <div className="w-full p-10 px-0">
      <div className="w-full text-2xl font-bold">Public Profile</div>

      <AccountForm />
    </div>
  );
};

export default AccountPage;
