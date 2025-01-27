"use client";
import React from "react";
import WebButton from "../ui/WebButton";
import useProfileCardData from "./hooks/useProfileCardData";
import { ProgressSpinner } from "primereact/progressspinner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import DebugButton from "../Navbar/DebugButton";
import { Skeleton } from "primereact/skeleton";
import { useProfileCardContext } from "@/app/Context/ProfileCardContext";
import { useAccountDataContext } from "@/app/admin/context/AccountDataContext";

const ProfileCard = () => {
  const { role } = useAccountDataContext();
  const Logout = () => {
    localStorage.clear();
    //router.push("/login");
    window.location.href = "/login";
  };

  const { customer, isLoading } = useProfileCardContext();

  return (
    <div
      className={`border w-full rounded-lg p-3 px-2 flex gap-3 flex-col w-52`}
    >
      <>
        {isLoading === 1 ? (
          <>
            <span className="text-lg font-light">
              #{customer[461]} <br />
              {customer[228]}
            </span>
          </>
        ) : (
          <>
            <div className="w-full">
              <Skeleton />
            </div>
          </>
        )}

        <p className="text-sm text-gray-500">{customer[432]}</p>
        <div className="flex gap-3 w-full flex-wrap">
          <Link href={`/admin/account`}>
            <WebButton title="Edit" />
          </Link>
          <WebButton title="Sign out" onClickFunction={Logout} />
          {role === "Admin" && <DebugButton />}
        </div>
      </>
    </div>
  );
};

export default ProfileCard;
