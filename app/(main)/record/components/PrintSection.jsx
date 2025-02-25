"use client";
import { useDependentListContext } from "@/app/admin/account/[profile]/[id]/context/DependentListContext";
import { useExpatriateListContext } from "@/app/admin/account/[profile]/[id]/context/ExpatriateListContext";
import { useVisitorsListContext } from "@/app/admin/account/[profile]/[id]/context/VisitorsListContext";
import { useAccountSettingContext } from "@/app/admin/context/AccountSettingContext";
import WebButton from "@/app/components/ui/WebButton";
import { useRouter } from "next/navigation";
import React from "react";

const PrintSection = () => {
  const nav = useRouter();

  return (
    <div className="w-full flex justify-center items-center">
      <WebButton
        onClickFunction={() => {
          nav.push("/record/export");
        }}
        title={
          <>
            <div className="flex items-center gap-3 text-base">
              <span>View Records</span>
            </div>
          </>
        }
      />
    </div>
  );
};

export default PrintSection;
