"use client";
import { useEffect, useState } from "react";
import api from "../api/api";
import { checkPassword, encryptMessage } from "../function/decryptor";
import { useRouter } from "next/navigation";
import { getLocalStorage } from "../function/getLocalStorage";
import { signIn, signOut, useSession } from "next-auth/react";

const useLoginData = () => {
  // session data

  const { DecryptionKeyApi } = api();

  const nav = useRouter();
  useEffect(() => {
    const authToken = getLocalStorage("authToken");
    if (authToken) {
      nav.push("/");
    }
  }, [nav]);

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(0);
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleForm = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const handleKeyPress = async (event) => {
      if (event.key === "Enter") {
        event.preventDefault(); // Prevent default form submission
        await handleSubmit(event);
      }
    };

    document.addEventListener("keypress", handleKeyPress);
    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, [form]);

  useEffect(() => {
    if (getLocalStorage("app-debug") === "true") {
      console.log({ form, users });
    }
  }, [form, users]);

  const handleSubmit = async (e) => {
    setIsLoading(1);

    const result = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
    });
    if (result.status === 401) {
      setIsLoading(2);
      setMessage("Login Failed!");
      setTimeout(() => {
        setIsLoading(0);
      }, 3000);
    } else {
      window.location.href = "/"; // Redirect after successful login
    }
  };

  return {
    handleForm,
    form,
    handleSubmit,
    users,
    isLoading,
    message,
  };
};

export default useLoginData;
