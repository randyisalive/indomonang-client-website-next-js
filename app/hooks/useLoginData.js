"use client";
import React, { useEffect, useState } from "react";

const useLoginData = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const handleForm = (e) => {
    const value = e.target.value;
    setForm((prev) => ({ ...prev, [e.target.name]: value }));
  };

  // debug
  useEffect(() => {
    if (localStorage.getItem("app-debug") === "true") {
      const data = { form: form };
      console.log(data);
    }
  }, [form]);

  return { handleForm, form };
};

export default useLoginData;
