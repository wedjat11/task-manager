"use client";
import React, { useState } from "react";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";

const HeaderForm = () => {
  const [activeTab, setActiveTab] = useState("signup");

  return (
    <div className="flex flex-col gap-5 items-center justify-center">
      <section>
        <h1 className="text-center font-semibold text-2xl">Welcome Back</h1>
        <p className="text-sm text-center font-light text-gray-400">
          Please enter your details
        </p>
      </section>
      <section className="flex items-center justify-between gap-3 bg-gray-200 rounded-xl p-1 w-full">
        <button
          onClick={() => setActiveTab("signup")}
          className={`px-3 w-1/2 py-1 rounded-lg cursor-pointer transition-all duration-200 ${
            activeTab === "signup" ? "bg-gray-100 font-bold" : "bg-gray-200"
          }`}
        >
          Sign Up
        </button>

        <button
          onClick={() => setActiveTab("login")}
          className={`px-3 py-1 w-1/2 rounded-lg cursor-pointer transition-all duration-200 ${
            activeTab === "login" ? "bg-gray-100 font-bold" : "bg-gray-200"
          }`}
        >
          Login
        </button>
      </section>
      <section className="mt-5">
        {activeTab === "signup" ? <SignupForm /> : <LoginForm />}
      </section>
    </div>
  );
};

export default HeaderForm;
