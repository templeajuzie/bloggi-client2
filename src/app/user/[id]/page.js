"use client";

import Footer from "@/app/Components/Footer/Footer";
import Navbar from "@/app/Components/Navbar/Navbar";
import EditProfile from "@/app/Components/Modal/EditProfile";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineUserAdd } from "react-icons/ai";
import { FaCamera } from "react-icons/fa";
import { Button } from "@material-tailwind/react";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import Link from "next/link";
import { HiOutlineDotsVertical } from "react-icons/hi";

const UserProfile = () => {
  const user = useSelector((state) => state.userauth.user);
  const isAuthenticated = useSelector(
    (state) => state.userauth.isAuthenticated
  );

  const [blognav, setBlogNav] = useState(false);
  const [userdata, setUserData] = useState(null);
  const [userpost, setUserPost] = useState(null);

  const loading = useSelector((state) => state.userauth.loading);
  const error = useSelector((state) => state.userauth.error);

  const params = useParams();
  const dispatch = useDispatch();

  const [size, setSize] = useState(null);

  const handleOpen = (value) => setSize(value);

  useEffect(() => {
    dispatch({ type: "userauth/getUserInformation" });

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/auth/user/${params.id}`
        );

        if (response.status === 200) {
          const userdetails = response.data.olduser;

          const postdata = response.data.userblog;

          setUserData(userdetails);
          setUserPost(postdata);

          console.log("this is", userdetails, postdata);
        }
      } catch (error) {}
    };

    fetchData();
  }, []);

  const PostNav = () => {
    setBlogNav(!blognav);
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-200 h-auto">
        <div className="flex items-start pt-[65px] justify-left">
          {userdata === null ? (
            <div className=" w-full lg:w-[70%] flex flex-col gap-5 items-center justify-start px-20 md:flex-col lg:flex-row">
              <div className="object-center">
                <div className="rounded-full w-40 h-40 animate-pulse bg-gray-300"></div>
              </div>

              <div className="content w-full flex-grow p-6">
                <div className="flex justify-between items-center mb-5 text-gray-300 w-full">
                  <span className="text-sm"></span>
                </div>

                <div className="flex items-center space-x-4 my-1 w-full">
                  <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                  <span className="font-medium bg-gray-300 h-5 w-20"></span>
                </div>

                <div className="mb-2 text-2xl w-full font-bold tracking-tight text-gray-300 bg-gray-300 h-8 rounded"></div>
                <div className="mb-5 font-light w-full text-gray-300 bg-gray-300 h-4 rounded"></div>
                <div className="flex justify-between w-full items-center">
                  <div className="inline-flex items-center font-medium text-gray-300 hover:underline">
                    <div className="ml-2 w-4 h-4 bg-gray-300 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-5 items-center justify-center md:flex-col lg:flex-row ">
                <div className="object-center lg:ml-20 bg-transparent p-1 rounded-full bg-white">
                  <Image
                    alt="Profile Picture"
                    src={userdata.userdp}
                    className="rounded-full w-36 h-36 object-cover"
                    width={500}
                    height={500}
                  />
                </div>

                <div className="col-span-4 flex flex-col gap-4 justify-center items-center lg:justify-start lg:items-start">
                  <div className="text-gray-800 flex flex-col items-end md:flex-row md:items-end gap-5 lg:item-center lg:items-end">
                    <div className="a flex flex-col gap-2 items-center lg:items-start">
                      <div className="font-medium">{userdata.username}</div>

                      <div className="text-2xl">{userdata.fullname}</div>
                    </div>

                    {user && (
                      <div className="lg:ml-10">
                        {user._id !== userdata._id ? (
                          <div className="">
                            <button className="px-6 py-2 text-gray-100 bg-[#FF3131] flex w-fit items-center justify-center rounded">
                              Follow
                              <AiOutlineUserAdd className="bx bx-user-plus ml-2" />
                            </button>
                          </div>
                        ) : (
                          <div className="b flex flex-row gap-4 items-center ">
                            <Button
                              onClick={() => handleOpen("xs")}
                              variant="gradient"
                            >
                              Edit Profile
                            </Button>

                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                              />
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>

                            <EditProfile size={size} handleOpen={handleOpen} />
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="text-gray-800 flex flex-row gap-10 items-center">
                    <div>
                      <span className="font-semibold">
                        {" "}
                        {userdata.mypost.length}{" "}
                      </span>{" "}
                      Posts
                    </div>

                    <div>
                      <span className="font-semibold">
                        {" "}
                        {userdata.followers.length}{" "}
                      </span>{" "}
                      Followers
                    </div>

                    <div>
                      <span className="font-semibold">
                        {" "}
                        {userdata.following.length}{" "}
                      </span>{" "}
                      Following
                    </div>
                  </div>

                  <div className="text-gray-800 flex flex-col justify-center items-center lg:justify-start lg:items-start">
                    <p className="w-[80%] md:w-[70%] text-center lg:text-start">
                      {userdata.userbio}
                    </p>
                  </div>
                </div>
              </div>

              <hr className="border-gray-800" />
            </>
          )}
        </div>

        <div>
          <section className="lg:px-10">
            <div className="container px-2 md:px-2 py-10 pt-2 mx-auto">
              {userpost === null ? (
                <div className="animate-pulse grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-8 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 lg:grid-cols-3">
                  <div className="w-full ">
                    <div className="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600"></div>

                    <h1 className="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
                    <p className="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                  </div>

                  <div className="w-full hidden sm:block">
                    <div className="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600"></div>

                    <h1 className="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
                    <p className="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                  </div>

                  <div className="w-full hidden lg:block">
                    <div className="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600"></div>

                    <h1 className="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
                    <p className="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="grid grid-cols-1 gap-4 mt-8 xl:mt-12 xl:gap-12 sm:grid-cols-2 xl:grid-cols-3 lg:grid-cols-3">
                    {userpost.map((post) => (
                      <div
                        className="transition-all relative duration-150 flex w-full py-6 md:w-full lg:w-full"
                        key={post.id}
                      >
                        <div className="flex flex-col items-stretch min-h-full pb-4 mb-6 transition-all duration-150 bg-white rounded-lg shadow-lg hover:shadow-2xl">
                          <Link href={`/${post._id}`}>
                            <div className="md:flex-shrink-0 ">
                              <Image
                                src={post.blogimage}
                                alt="Blog Cover"
                                className="object-cover w-full rounded-lg rounded-b-none md:h-56"
                                width={200}
                                height={200}
                              />
                            </div>
                          </Link>
                          <div className="flex items-center justify-between px-4 py-2 overflow-hidden">
                            <span className="text-xs font-medium text-blue-600 uppercase">
                              {post.category}
                            </span>
                            <div className="flex flex-row items-center">
                              <div className="text-xs font-medium text-gray-500 flex flex-row items-center mr-2">
                                <svg
                                  className="w-4 h-4 mr-1"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                  ></path>
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                  ></path>
                                </svg>
                                <span>{post.view.length}</span>
                              </div>

                              <div className="text-xs font-medium text-gray-500 flex flex-row items-center mr-2">
                                <svg
                                  className="w-4 h-4 mr-1"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                                  ></path>
                                </svg>
                                <span>{post.comment.length}</span>
                              </div>

                              <div className="text-xs font-medium text-gray-500 flex flex-row items-center">
                                <svg
                                  className="w-4 h-4 mr-1"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                                  ></path>
                                </svg>
                                <span>{post.like.length}</span>
                              </div>
                            </div>
                          </div>
                          <hr className="border-gray-300" />
                          <div className="flex flex-wrap items-center flex-1 px-4 py-1 text-start w-full">
                            <Link href={`/${post._id}`}>
                              <h2 className="text-lg font-bold tracking-normal text-gray-800">
                                {post.title}
                              </h2>
                            </Link>
                          </div>
                          <hr className="border-gray-300" />
                          <Link href={`/${post._id}`}>
                            <p className="flex flex-row flex-wrap w-full px-4 py-2 overflow-hidden text-sm text-justify text-gray-700">
                              {post.shortdescription}
                            </p>
                          </Link>
                        </div>
                        <div className="absolute top-[35px] right-2 text-[23px] text-gray-700 w-fit">
                          <div placement="relative">
                            <div>
                              <HiOutlineDotsVertical
                                className="text-white cursor-pointer"
                                onClick={PostNav}
                              />
                            </div>

                            {blognav && (
                              <div className="absolute flex flex-col rounded-base w-fit right-0 bg-white shadow-lg">
                                {post.authorid === user._id ? (
                                  <>
                                    <p className="text-sm flex flex-row hover:cursor-pointer gap-2 py-2 px-6 items-center hover:bg-gray-100 rounded">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.2"
                                        stroke="currentColor"
                                        className="w-5 h-5"
                                      >
                                        <path
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                        />
                                      </svg>
                                      Edit
                                    </p>
                                  </>
                                ) : (
                                  <div className="hidden"></div>
                                )}

                                <hr />
                                <p className="text-sm flex flex-row gap-2 hover:cursor-pointer py-2 px-6 items-center hover:bg-gray-100 rounded">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.2"
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5"
                                    />
                                  </svg>
                                  Report
                                </p>
                                <hr />
                                <p className="text-sm flex flex-row gap-2 hover:cursor-pointer py-2 px-6 items-center hover:bg-gray-100 rounded">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.2"
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
                                    />
                                  </svg>
                                  Share
                                </p>
                                <hr />

                                {post.authorid === user._id ? (
                                  <>
                                    <p className="text-sm flex flex-row gap-2 hover:cursor-pointer py-2 px-6 items-center hover:bg-gray-100 rounded">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.2"
                                        stroke="currentColor"
                                        className="w-5 h-5"
                                      >
                                        <path
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                        />
                                      </svg>
                                      Delete
                                    </p>
                                  </>
                                ) : (
                                  <div className="hidden"></div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {userpost && userpost.length <= 0 ? (
                <div className="h-[70vh] w-full bg-gray-100 flex items-center rounded-lg">
                  <div className="container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700">
                    <div className="max-w-md">
                      <div className="text-3xl font-dark font-bold">
                        No Post Found
                      </div>
                      <div className="flex flex-row gap-3 items-center">
                        <p className="text-2xl md:text-2xl font-light leading-normal">
                          Sorry we couldnt find any post.
                        </p>
                        <DynamicFeedIcon className="text-[50px]" />
                      </div>

                      <p className="mb-8">
                        Click the button below to get started.
                      </p>

                      <Link href="/upload">
                        <Button
                          variant="gradient"
                        >
                          Create Post
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserProfile;
