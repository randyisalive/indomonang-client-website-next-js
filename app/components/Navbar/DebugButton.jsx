"use client";
import React, { useEffect, useState } from "react";
import WebButton from "../ui/WebButton";
import { useRouter } from "next/navigation";

const DebugButton = () => {
  const [debug, setDebug] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedDebug = localStorage.getItem("app-debug") === "true";
      setDebug(storedDebug);
    }
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
    <div>
      <WebButton
        title={`Debug: ${debug}`}
        styles={debug ? { color: "red" } : { color: "blue" }}
        onClickFunction={handleDebug}
      />
    </div>
  );
};

export default DebugButton;
