"use client";

import Link from "next/link";
import { PiCrownBold } from "react-icons/pi";
import logo from "../../Resources/Images/bloggilogo.png";
import Image from "next/image";
import Swal from "sweetalert2";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import Cookies from "js-cookie";
import axios from "axios";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const token = Cookies.get("authtoken");

  const dispatch = useDispatch();
  const user = useSelector((state) => state.userauth.user);
  const isAuthenticated = useSelector(
    (state) => state.userauth.isAuthenticated
  );
  const loading = useSelector((state) => state.userauth.loading);
  const error = useSelector((state) => state.userauth.error);

  useEffect(() => {
    dispatch({ type: "userauth/getUserInformation" });
  }, [dispatch]);

  const OpenNav = (state) => {
    setNav(!nav);
  };

  const DeleteAccount = async () => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/account`,
        {
          headers: {
            Authorization: `Bearer ${String(token)}`,
          },
        }
      );

      if (response.status !== 200) {
        console.log("opps something went wrong, try again");
      }

      Cookies.remove("authtoken");
      if (typeof window !== "undefined") {
        window.location.reload();
      }
    } catch (error) {}
  };

  const SignOutAccount = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "you will be logged out after this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, SignOut!",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          const response = axios.delete(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/account/signout`,
            {
              headers: {
                Authorization: `Bearer ${String(token)}`,
              },
            }
          );

          if (response.status !== 200) {
            console.log("opps something went wrong, try again");
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
              footer: '<a href="#">Why do I have this issue?</a>',
            });
          }

          Cookies.remove("authtoken");
          if (typeof window !== "undefined") {
            window.location.reload();
          }

          Swal.fire({
            title: "We hate to see you go!",
            text: "You've been Signed Out of Bloggi",
            icon: "success",
          });
        } catch (error) {}
      }
    });
  };

  return (
    <section className="relative sticky top-0 z-30 ">
      <header className="bg-white shadow-lg">
        <div className="px-4 ">
          <div className="flex items-center justify-between h-16">
            <div className=" md:flex md:items-center md:gap-12">
              <Link
                className="flex flex-row items-center gap-2 text-teal-600"
                href="/"
              >
                <Image
                  className="h-[55px] w-auto object-cover "
                  src={logo}
                  height={200}
                  width={200}
                  alt=""
                />
              </Link>
            </div>

            <div className="hidden md:block">
              <nav aria-label="Global">
                
                <ul className="flex items-center gap-6 text-sm">
                  <li>
                    <Link
                      href="/"
                      className="text-gray-500 transition hover:text-gray-500/75"
                    >
                      Careers
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/"
                      className="flex items-center gap-2 text-gray-500 transition hover:text-gray-500/75"
                    >
                      Premium
                      <PiCrownBold className="text-base text-yellow-400" />
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/"
                      className="text-gray-500 transition hover:text-gray-500/75"
                    >
                      Team
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/"
                      className="text-gray-500 transition hover:text-gray-500/75"
                    >
                      Projects
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/"
                      className="text-gray-500 transition hover:text-gray-500/75"
                    >
                      Community
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              {token && !user && !loading &&  (
                <div className="sm:flex sm:gap-4">
                  <Link
                    className="rounded-md bg-[#FF3131] px-5 py-2.5 text-sm font-medium text-white shadow"
                    href="/signin"
                  >
                    Login
                  </Link>

                  <div className="hidden sm:flex">
                    <Link
                      className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-[#FF3131]"
                      href="/signup"
                    >
                      Register
                    </Link>
                  </div>
                </div>
              )}

              {!token && loading && !user &&  <CircularProgress/>}

              {user && (
                <div className="flex flex-row items-center gap-5">
                  <div className="sm:flex sm:gap-4">
                    <Link
                      className="rounded-md bg-[#FF3131] px-5 py-2.5 text-sm font-medium text-white shadow"
                      href="/upload"
                    >
                      Upload
                    </Link>
                  </div>
                  <button
                    type="button"
                    className="flex items-center transition rounded-lg group shrink-0"
                  >
                    {user && (
                      <div className="flex flex-row items-center">
                     
                        <Link href={`/user/${user._id}`}>
                          <Image
                            alt="Man"
                            src={user.userdp}
                            className="h-[48px] w-[48px] rounded-full object-cover border border-1 border-gray-300 p-1"
                            height={200}
                            width={200}
                          />
                        </Link>

                        <Menu placement="bottom-end">
                          <MenuHandler>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="hidden w-5 h-5 text-gray-500 transition ms-2 group-hover:text-gray-700 sm:block"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clip-rule="evenodd"
                              />
                            </svg>
                          </MenuHandler>
                          <MenuList className="mt-5">
                            <Link
                              href={`/user/${user._id}`}
                              className="block px-4 py-3 text-sm text-gray-600 transition-colors duration-200 underline-none hover:bg-gray-100 dark:hover:bg-gray-100"
                            >
                              View profile
                            </Link>
                            <hr className="border-gray-200" />

                            <Link
                              href="#"
                              className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-100"
                            >
                              Settings
                            </Link>

                            <hr className="border-gray-200" />

                            <Link
                              href="#"
                              className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-100"
                            >
                              Help
                            </Link>

                            <hr className="border-gray-200" />

                            <p
                              onClick={SignOutAccount}
                              className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-100"
                            >
                              Sign Out
                            </p>

                            {/* <hr className='border-gray-200' />

                            <Button
                              className='block px-4 py-2 mx-2 mt-2 text-sm text-gray-600 capitalize transition-colors duration-200 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-100'
                              onClick={DeleteAccount}
                            >
                              Delete Account
                            </Button> */}
                          </MenuList>
                        </Menu>
                      </div>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      
    </section>
  );
};

export default Navbar;
