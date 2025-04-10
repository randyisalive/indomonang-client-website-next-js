"use client";
import React, { useEffect, useState } from "react";
import WebButton from "../ui/WebButton";
import { useRouter } from "next/navigation";
import { getLocalStorage } from "@/app/function/getLocalStorage";

const DebugButton = () => {
  const [debug, setDebug] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storeDebug = getLocalStorage("app-debug");
    setDebug(storeDebug);
  }, []);

  useEffect(() => {
    console.log("debug: ", debug);
  }, [debug]);

  return (
    <div className=" hidden sm:block">
      <WebButton
        title={`Debug: ${debug}`}
        styles={debug ? { color: "red" } : { color: "blue" }}
      />
    </div>
  );
};

export default DebugButton;
