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

  const handleDebug = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("app-debug", !debug ? "true" : "false");
      setDebug(!debug);
      router.push(window.location.pathname);
    }
  };

  useEffect(() => {
    console.log("debug: ", debug);
  }, [debug]);

  return (
    <div className=" hidden sm:block">
      <WebButton
        title={`Debug: ${debug}`}
        styles={debug ? { color: "red" } : { color: "blue" }}
        onClickFunction={handleDebug}
      />
    </div>
  );
};

export default DebugButton;
