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
  const { role, accounts } = useAccountDataContext();
  const Logout = () => {
    localStorage.clear();
    //router.push("/login");
    window.location.href = "/login";
  };

  const { customer, isLoading, picture_profile } = useProfileCardContext();

  return (
    <div
      className={`border w-full  rounded-lg p-3 px-2 flex gap-3 flex-col h-full `}
    >
      <>
        {isLoading === 1 ? (
          <>
            <span className="text-lg font-light flex gap-2 justify-start">
              <div className="block">
                <img
                  src={`data:image/jpg;base64,${picture_profile?.content}`}
                  alt="asd.jpg"
                  className="  "
                  style={{ width: "100px", height: "100%" }}
                />
              </div>
              <div className="block">
                <span>#{customer[461]} </span>
                <div className="flex gap-3">
                  <p> {customer[228]}</p>
                </div>
              </div>
            </span>
          </>
        ) : (
          <>
            <div className="w-full h-full">
              <Skeleton className="h-full" />
            </div>
          </>
        )}

        <p className="text-sm text-gray-500">{customer[432]}</p>
      </>
    </div>
  );
};

export default ProfileCard;
