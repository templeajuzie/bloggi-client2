"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import Auth from "../Components/Auth/ProtectedRoute2";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import ReactiveButton from "reactive-button";

function SignIn() {
  const [state, setState] = useState("idle");
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const isAuthenticated = useSelector(
    (state) => state.authslice.isAuthenticated
  );
  const authToken = useSelector((state) => state.authslice.authToken);

  const router = useRouter();

  const Userlogin = async (e) => {
    e.preventDefault();
    setState("loading");

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/signin`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200 && authToken) {
        
        const token = Cookies.get("authtoken"); // Note the lowercase 'authorization'
        if (token) {
          setState("success");
          router.push("/");
        } else {
          setState("error");
        }
      } else {
        setState("error");
      }
    } catch (error) {
      setState("error");
    }
  };

  return (
    <div>
      <Navbar />
      <section className="bg-gray-200 mx-auto px-2 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center lg:px-6 py-8 mx-auto md:h-fit lg:py-0">
          <div className="w-full bg-white rounded-lg md:mt-0 sm:max-w-md xl:p-0 shadow-lg dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <div className="a flex flex-row items-center gap-4 mb-[30px]">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-black">
                  Login
                </h1>
              </div>
              <form
                className="space-y-4 md:space-y-6"
                action="#"
                onSubmit={Userlogin}
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
                    placeholder="johndoe@example.com"
                    onChange={(e) => setEmail(e.target.value)}
                    required={true}
                  />
                </div>
                <div>
                  <label
                    for="password"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="w-full rounded-lg border border-gray-300 p-4 pe-12 text-sm shadow-sm"
                    onChange={(e) => setPassword(e.target.value)}
                    required={true}
                  />
                </div>

                <ReactiveButton
                  buttonState={state}
                  idleText="Log in"
                  loadingText="Loading"
                  successText="Log in Successfull"
                  errorText="Unable to Log in"
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

                <div className="flex flex-row items-center justify-between w-full">
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    <Link
                      href="/recovery"
                      className="font-medium text-primary-600 underline dark:text-primary-500"
                    >
                      Forgotten password?
                    </Link>
                  </p>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    New?{" "}
                    <Link
                      href="/signup"
                      className="font-medium text-primary-600 underline dark:text-primary-500"
                    >
                      Click Here?
                    </Link>
                  </p>
                </div>
              </form>
              <Toaster position="top-center" reverseOrder={false} />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Auth(SignIn);
