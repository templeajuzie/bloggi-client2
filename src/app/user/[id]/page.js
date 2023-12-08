"use client";

import Footer from "@/app/Components/Footer/Footer";
import Navbar from "@/app/Components/Navbar/Navbar";
import EditProfile from "@/app/Components/Modal/EditProfile";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { AiOutlineUserAdd } from "react-icons/ai";
import { FaCamera } from "react-icons/fa";
import { Button } from "@material-tailwind/react";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import Link from "next/link";
import { HiOutlineDotsVertical } from "react-icons/hi";
import io from "socket.io-client";
import { setUser } from "@/app/redux/slice/userauthSlice";
import { FaHandsClapping } from "react-icons/fa6";

const UserProfile = () => {
  const user = useSelector((state) => state.userauth.user);
  const isAuthenticated = useSelector(
    (state) => state.userauth.isAuthenticated
  );

  const [blognav, setBlogNav] = useState(false);
  const [userdata, setUserData] = useState(null);
  const [userpost, setUserPost] = useState(null);
  const [follower, setFollower] = useState(null);
  const [following, setFollowing] = useState(null);

  const socket = io.connect(`${process.env.NEXT_PUBLIC_SERVER_URL}`);

  const loading = useSelector((state) => state.userauth.loading);
  const error = useSelector((state) => state.userauth.error);

  const params = useParams();
  const dispatch = useDispatch();
  const socketRef = useRef(null);

  const [size, setSize] = useState(null);

  const handleOpen = (value) => setSize(value);

  useEffect(() => {
    socket.on("profileconnect", ({ userData, profileData }) => {
      setUserData(profileData);
      dispatch();
      console.log("new data: ", data);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  useEffect(() => {
    dispatch({ type: "userauth/getUserInformation" });

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/user/${params.id}`
        );

        if (response.status === 200) {
          const userdetails = response.data.olduser;

          const postdata = response.data.userblog;

          setUserData(userdetails);
          setUserPost(postdata);

          console.log("this is", postdata);
        }
      } catch (error) {}
    };

    fetchData();
  }, []);

  const PostNav = () => {
    setBlogNav(!blognav);
  };

  const userConnect = () => {
    let profileid = params.id;

    let userid = String(user._id);

    let connectData = {
      profileid,
      userid,
    };

    socket.emit("userconnect", connectData);
  };

  return (
    <>
      <Navbar />
      <div className="h-auto bg-gray-200">
        <div className="flex items-start pt-[65px] justify-left">
          {userdata === null ? (
            <div className=" w-full lg:w-[70%] flex flex-col gap-5 items-center justify-start px-20 md:flex-col lg:flex-row">
              <div className="object-center">
                <div className="w-40 h-40 bg-gray-300 rounded-full animate-pulse"></div>
              </div>

              <div className="flex-grow w-full p-6 content">
                <div className="flex items-center justify-between w-full mb-5 text-gray-300">
                  <span className="text-sm"></span>
                </div>

                <div className="flex items-center w-full my-1 space-x-4">
                  <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                  <span className="w-20 h-5 font-medium bg-gray-300"></span>
                </div>

                <div className="w-full h-8 mb-2 text-2xl font-bold tracking-tight text-gray-300 bg-gray-300 rounded"></div>
                <div className="w-full h-4 mb-5 font-light text-gray-300 bg-gray-300 rounded"></div>
                <div className="flex items-center justify-between w-full">
                  <div className="inline-flex items-center font-medium text-gray-300 hover:underline">
                    <div className="w-4 h-4 ml-2 bg-gray-300 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col w-screen gap-5 md:px-[50px]">
              <div className="flex flex-col items-center justify-center w-full gap-5 md:justify-start md:flex-row lg:flex-row">
                {/* <div className="relative object-center h-full bg-transparent w-fit">
                  <Image
                    alt="Profile Picture"
                    src={userdata.userdp}
                    className="h-[160px] w-[160px] object-cover rounded-full border-4 border-white dark:border-gray-800"
                    width={500}
                    height={500}
                  />

                  <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-white rounded-full border-3"></div>
                </div> */}

                <div className="relative">
                  <Image
                    className="h-[160px] w-[160px] object-cover rounded-full border-4 border-white"
                    src={userdata.userdp}
                    width={500}
                    height={500}
                    alt=""
                  />
                  <span className="absolute w-4 h-4 bg-green-400 border-2 border-white rounded-full bottom-2 right-7 dark:border-gray-800"></span>
                </div>

                <div className="flex flex-col items-center justify-center col-span-4 gap-4 md:justify-start lg:ml-10 md:items-start w-[70%]">
                  <div className="flex flex-col items-center gap-5 text-gray-800 md:flex-row md:items-end">
                    <div className="flex flex-col items-center gap-2 a md:items-start">
                      <div className="font-medium">@{userdata.username}</div>

                      <div className="text-2xl">{userdata.fullname}</div>
                    </div>

                    {user && (
                      <div className="lg:ml-10">
                        {user._id !== userdata._id ? (
                          <div className="">
                            <button
                              className="px-6 py-2 text-gray-100 bg-[#FF3131] flex w-fit items-center justify-center rounded"
                              onClick={userConnect}
                            >
                              {userdata.followers.includes(String(user._id))
                                ? "Following"
                                : "Follow"}
                              <AiOutlineUserAdd className="ml-2 bx bx-user-plus" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex flex-row items-center gap-4 b ">
                            <Button
                              onClick={() => handleOpen("xs")}
                              variant="gradient"
                            >
                              Edit Profile
                            </Button>

                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-6 h-6"
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

                  <div className="flex flex-row items-center gap-10 text-gray-800">
                    <div className="flex flex-row gap-2">
                      <span className="font-semibold">
                        {" "}
                        {userdata.mypost.length}{" "}
                      </span>{" "}
                      Posts
                    </div>

                    <div className="flex flex-row gap-2">
                      <span className="font-semibold">
                        {" "}
                        {userdata.followers.length}{" "}
                      </span>{" "}
                      Followers
                    </div>

                    <div className="flex flex-row gap-2">
                      <span className="font-semibold">
                        {" "}
                        {userdata.following.length}{" "}
                      </span>{" "}
                      Following
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center text-gray-800 md:justify-start w-full md:items-start md:w-[95%] lg:w-[80%]">
                    <p className="flex flex-wrap w-full text-center md:text-start">
                      {userdata.userbio}
                    </p>
                  </div>
                </div>
              </div>

              <hr className="border-gray-300" />
            </div>
          )}
        </div>

        <div>
          <section className="lg:px-10">
            <div className="container px-2 py-10 pt-2 mx-auto md:px-2">
              {userpost === null ? (
                <div className="grid grid-cols-1 gap-8 mt-8 animate-pulse xl:mt-12 xl:gap-8 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 lg:grid-cols-3">
                  <div className="w-full ">
                    <div className="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600"></div>

                    <h1 className="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
                    <p className="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                  </div>

                  <div className="hidden w-full sm:block">
                    <div className="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600"></div>

                    <h1 className="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
                    <p className="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                  </div>

                  <div className="hidden w-full lg:block">
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
                        className="relative flex w-full py-6 transition-all duration-150 md:w-full lg:w-full"
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
                              <div className="flex flex-row items-center mr-2 text-xs font-medium text-gray-500">
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
                                <span>{post.view}</span>
                              </div>

                              <div className="flex flex-row items-center mr-2 text-xs font-medium text-gray-500">
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

                              <div className="flex flex-row items-center text-xs font-medium text-gray-500 cursor-pointer">
                                <FaHandsClapping />
                                <span>{post.like.length}</span>
                              </div>
                            </div>
                          </div>
                          <hr className="border-gray-300" />
                          <div className="flex flex-wrap items-center flex-1 w-full px-4 py-1 text-start">
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
                              <div className="absolute right-0 flex flex-col bg-white shadow-lg rounded-base w-fit">
                                {post.authorid === user._id ? (
                                  <>
                                    <p className="flex flex-row items-center gap-2 px-6 py-2 text-sm rounded hover:cursor-pointer hover:bg-gray-100">
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
                                <p className="flex flex-row items-center gap-2 px-6 py-2 text-sm rounded hover:cursor-pointer hover:bg-gray-100">
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
                                <p className="flex flex-row items-center gap-2 px-6 py-2 text-sm rounded hover:cursor-pointer hover:bg-gray-100">
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
                                    <p className="flex flex-row items-center gap-2 px-6 py-2 text-sm rounded hover:cursor-pointer hover:bg-gray-100">
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
                  <div className="container flex flex-col items-center justify-center px-5 text-gray-700 md:flex-row">
                    <div className="max-w-md">
                      <div className="text-3xl font-bold font-dark">
                        No Post Found
                      </div>
                      <div className="flex flex-row items-center gap-3">
                        <p className="text-2xl font-light leading-normal md:text-2xl">
                          Sorry we couldnt find any post.
                        </p>
                        <DynamicFeedIcon className="text-[50px]" />
                      </div>

                      <p className="mb-8">
                        Click the button below to get started.
                      </p>

                      <Link href="/upload">
                        <Button variant="gradient">Create Post</Button>
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
