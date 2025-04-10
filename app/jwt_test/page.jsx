"use client";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import WebButton from "../components/ui/WebButton";

const JwtPage = () => {
  const sessionData = useSession();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result.error) {
      alert("Login failed: " + result.error);
    } else {
      //window.location.href = "/dashboard"; // Redirect after successful login
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border text-lg">
      <h1>Login</h1>
      <label>Email</label>
      <input type="email" name="email" className="border p-2" required />
      <label>Password</label>
      <input type="password" name="password" required />
      <button type="submit">Login</button>
      {JSON.stringify(sessionData)}
      <WebButton
        title="Sign Out"
        onClickFunction={() => {
          signOut({ callbackUrl: "/jwt_test" });
        }}
      />
    </form>
  );
};

export default JwtPage;
