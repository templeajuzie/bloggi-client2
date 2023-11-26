"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import Auth from "../Components/Auth/ProtectedRoute2";
import Footer from "../Components/Footer/Footer";
import Navbar from "../Components/Navbar/Navbar";
import ReactiveButton from "reactive-button";

function Recovery() {
  const [state, setState] = useState("idle");
  const [email, setEmail] = useState();

  const PasswordRecovery = async (e) => {
    e.preventDefault();
  
    try {
      setState("loading");
  
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/recovery`,
        {
          email,
        }
      );
  
      if (response.status === 200) {
        // If the request is successful, set the state to "success"
        setState("success");
      } else {
        // If the request is not successful, set the state to "error"
        setState("error");
      }
    } catch (error) {
      // If an error occurs during the request, set the state to "error"
      setState("error");
    }
  };

  return (
    <div>
      <Navbar />
      <section className="mx-auto px-4 py-16 sm:px-6">
        <div className="flex flex-col items-center justify-center py-4 mx-auto md:h-fit lg:py-0">
          <div className="w-full bg-white rounded-lg md:mt-0 sm:max-w-md xl:p-0 shadow-lg dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <div className="a flex flex-row items-center gap-4 mb-[30px]">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-black">
                  Password Recovery
                </h1>
              </div>
              <form
                className="space-y-4 md:space-y-6"
                action="#"
                onSubmit={PasswordRecovery}
              >
                <div>
                  <label
                    for="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="w-full rounded-lg border border-gray-300 p-4 pe-12 text-sm shadow-sm"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    required={true}
                  />
                </div>

                <ReactiveButton
                  buttonState={state}
                  idleText="Reset Password"
                  loadingText="Loading"
                  successText="Email sent successfully"
                  errorText="Unable to send email"
                  color="red"
                  width="100%"
                  size="medium"
                  type="submit"
                  style={{
                    display: "block",
                    borderRadius: "0.5rem",
                    backgroundColor: "#FF3131",
                    padding: "0.75rem 1.25rem",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    color: "white",
                    background: "#FF3131",
                  }}
                />
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Dont have an account?{" "}
                  <Link
                    href="/signup"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Click here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Recovery;
