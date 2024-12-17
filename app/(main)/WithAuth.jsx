"use client";
import React, { useEffect } from "react";
import useSessionsData from "../hooks/useSessionsData";
import { useRouter } from "next/navigation";

const WithAuth = ({ children }) => {
  const { data } = useSessionsData();
  const router = useRouter();

  useEffect(() => {
    if (data == false) {
      router.push("/login");
    }
  }, [data]);
  return <>{children}</>;
};

export default WithAuth;
