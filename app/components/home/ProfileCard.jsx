"use client";
import React from "react";
import WebButton from "../ui/WebButton";
import useProfileCardData from "./hooks/useProfileCardData";
import { ProgressSpinner } from "primereact/progressspinner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import DebugButton from "../Navbar/DebugButton";

const ProfileCard = () => {
  const { customer, isLoading } = useProfileCardData();

  const router = useRouter();
  const Logout = () => {
    localStorage.removeItem("authToken");
    router.push("/login");
  };

  if (isLoading === 0) {
    return (
      <div className="  flex h-1/2">
        <ProgressSpinner />
      </div>
    );
  }

  return (
    <div className="border rounded-lg p-3 px-2 flex gap-3 flex-col w-52">
      <span className="text-lg font-light">
        #{customer[461]} <br />
        {customer[228]}
      </span>
      <p className="text-sm text-gray-500">{customer[432]}</p>
      <div className="flex gap-3 w-full flex-wrap">
        <Link href={`/admin/account`}>
          <WebButton title="Edit" />
        </Link>
        <WebButton title="Keluar" onClickFunction={Logout} />
        <DebugButton />
      </div>
    </div>
  );
};

export default ProfileCard;
