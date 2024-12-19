"use client";
import { ATOB } from "@/app/function/decryptor";
import { useParams } from "next/navigation";
import React from "react";

const AccountSettings = () => {
  const { profile } = useParams();

  const decrypt = ATOB(profile);
  if (decrypt === "account") {
    return <div>PT Baroid Indonesia</div>;
  }
};

export default AccountSettings;
