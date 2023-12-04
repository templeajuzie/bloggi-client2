"use client"; // This is a client component 👈🏽
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Cookies from "js-cookie";
import axios from "axios";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import parse from "html-react-parser";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Swal from "sweetalert2";
import Tooltip from "@mui/material/Tooltip";

import { TbEdit } from "react-icons/tb";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";

import Link from "next/link";
import { Diversity1Sharp } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import io from "socket.io-client";
import { FaHandsClapping } from "react-icons/fa6";
import PostChat from "../Components/Modal/PostChat";

const BlogPost = () => {
  const params = useParams();
  const router = useRouter();
  const token = Cookies.get("authtoken");
  const socketRef = useRef(null);

  const socket = io.connect(`${process.env.NEXT_PUBLIC_SERVER_URL}`);

  const [blog, setBlog] = useState(null);
  const [usercomment, setUserComment] = useState("");
  const [allComments, setAllComments] = useState(null);
  const [allclap, setallClap] = useState(null);
  const [blognav, setBlogNav] = useState(false);
  const isInitialRender = useRef(true);

  const user = useSelector((state) => state.userauth.user);

  const [size, setSize] = useState(null);
  const handleOpen = (value) => setSize(value);

  const postlike = "w-4 h-4 mr-1 text-blue-500";
  const postunlike = "w-4 h-4 mr-1";

  const PostNav = () => {
    setBlogNav(!blognav);
  };

  const PostComment = async (e) => {
    // e.preventDefault();

    if (user) {
      let userid = String(user._id);

      const blogid = params.id;

      let commentData = {
        usercomment,
        blogid,
        userid,
      };

      socket.emit("newcomment", commentData);
    } else {
      Swal.fire({
        title: "You need to Sign In",
        text: "Before you can comment on a post",
        icon: "warning",
      });
      router.push("/signin");
    }
  };

  useEffect(() => {
    socket.on("allcomment", (data) => {
      setAllComments(data);
      setUserComment("");
      console.log(data);
    });

    socket.on("alllike", (data) => {
      setallClap(data);
      console.log(data);
    });

    // Clean up socket on component unmount
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  useEffect(() => {
    const FetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/blog/${params.id}`
        );

        if (response.status === 200) {
          setBlog(response.data.blogdata);

          setAllComments(response.data.blogdata.comment);
          setallClap(response.data.blogdata.like);
          console.log(response.data.blogdata.comment);

          // speak.text("Hellow how are you")
        }

        console.log(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    FetchData();
  }, []);

  const deletePost = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("click me to delete", params.id);
        try {
          const response = axios.delete(
            `http://localhost:8000/api/v1/blog/delete/${params.id}`,
            {
              headers: {
                Authorization: `Bearer ${String(token)}`,
              },
            }
          );

          if (response.status !== 200) {
            console.log("opps something went wrong, try again");
          }

          Swal.fire({
            title: "Deleted!",
            text: "Your post has been deleted.",
            icon: "success",
          });

          router.push("/");
        } catch (error) {}
      }
    });
  };

  const viewProfile = (id) => {
    router.push(`/user/${id}`);
  };

  const PostReaction = (id) => {
    let userid = String(user._id);

    const blogid = id;

    console.log("like " + blogid, userid);

    let likeData = {
      blogid,
      userid,
    };

    socket.emit("postreact", likeData);
  };

  return (
    <div className="relative">
      <Navbar />
      {blog === null ? (
        <div className="flex flex-col md:mx-10 my-10 lg:flex-row lg:mx-[12%] gap-10 justify-start items-start">
          <div class="w-full  md:w-[80%] lg:w-[70%]">
            <main className="p-5 shadow-md md:p-5 lg:p-10 animate-pulse">
              <div className="relative w-full mx-auto mb-4 md:mb-0">
                <div className="flex flex-col gap-4 px-4 mb-3 lg:px-0">
                  <div className="rounded-mdfont-semibold bg-gray-200 leading-tight animate-pulse h-5 w-[70%]"></div>
                  <div className="rounded-mdfont-semibold bg-gray-200 leading-tight animate-pulse h-5 w-[40%]"></div>
                </div>

                <div className="flex flex-col show">
                  <div className="w-full bg-gray-200 rounded h-72"></div>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row">
                <div className="w-full mt-12 text-lg leading-relaxed text-gray-700 lg:px-0 lg:w-full">
                  <p className="pb-6"></p>
                </div>
              </div>
            </main>
          </div>
        </div>
      ) : (
        <div className="flex flex-col  md:mx-2 my-10 md:flex-col lg:flex-row lg:px-[2%] md:gap-2 lg:gap-10">
          <div className="items-center justify-center w-full md:w-[80%] lg:w-[70%] lg:px-10">
            <main className="relative flex flex-col gap-4 p-5 shadow-md md:p-5 lg:p-10">
              <div className="flex flex-col w-full gap-4 mx-auto ab md:mb-0">
                <div className="flex flex-col items-start justify-between md:items-center md:flex-row">
                  <div className="flex py-2 ">
                    <Image
                      src={blog.author.userdp}
                      className="object-cover w-10 h-10 mr-2 rounded-full cursor-pointer"
                      height={40}
                      width={40}
                      alt="user"
                      onClick={() => {
                        let id = blog.author._id;
                        viewProfile(id);
                      }}
                    />
                    <div>
                      <p
                        className="text-sm font-semibold text-black cursor-pointer"
                        onClick={() => {
                          let id = blog.author._id;
                          viewProfile(id);
                        }}
                      >
                        {blog.author.fullname}
                      </p>
                      <p
                        className="text-xs text-black cursor-pointer"
                        onClick={() => {
                          let id = blog.author._id;
                          viewProfile(id);
                        }}
                      >
                        @{blog.author.username}
                      </p>
                    </div>
                  </div>

                  <div className="inline-flex items-center justify-center">
                    
                    <span className="text-sm text-gray-800">
                      Post Category:
                    </span>
                    <Link
                      href={`/category/${blog.category}`}
                      className="px-1 my-2 mb-2 text-sm font-bold text-gray-800"
                    >
                      {blog.category}
                    </Link>
                  </div>
                </div>
                {/* <div className="bg-red-500">
                  <Speech
                    text="I have all properties set to their default"
                    pitch="1"
                    rate="1"
                    volume="50"
                    lang="en-GB"
                    voice="Google UK English Male"
                    stop={true}
                    pause={true}
                    resume={true}
                  />
                </div> */}

                <div className="md:px-4 lg:px-0">
                  <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {blog.title}
                  </h2>
                </div>

                <div className="relative flex flex-col w-full h-full show">
                  <Image
                    src={blog.blogimage}
                    className="object-cover w-full h-full lg:rounded"
                    width={1000}
                    height={500}
                    alt="blog"
                  />
                </div>

                <div className="hidden md:block">
                  <div className="flex flex-row items-center w-full gap-5 ">
                    <div
                      className="flex flex-row items-center w-full gap-5 px-2 py-1 bg-gray-200 rounded-full cursor-pointer"
                      onClick={() => {
                        handleOpen("sm");
                      }}
                    >
                      <div className="p-1 bg-white rounded-full h-fit w-fit">
                        <Image
                          src={blog.author.userdp}
                          className="object-cover w-8 h-8 rounded-full cursor-pointer"
                          height={30}
                          width={30}
                          alt="user"
                          onClick={() => {
                            let id = blog.author._id;
                            viewProfile(id);
                          }}
                        />
                      </div>
                      <div>
                        <p>Write Comment...</p>
                      </div>
                    </div>

                    <div className="flex flex-row items-center">
                      <Tooltip
                        title={`${blog.view} Views`}
                        placement="top"
                        arrow
                      >
                        <div className="flex flex-row items-center mr-2 text-xs font-medium text-gray-500">
                          <svg
                            className="w-4 h-4 mr-1 cursor-pointer"
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

                          <span className="cursor-pointer">{blog.view}</span>
                        </div>
                      </Tooltip>

                      <Tooltip
                        title={`${blog.comment.length} Comments`}
                        placement="top"
                        arrow
                      >
                        <div
                          className="flex flex-row items-center mr-2 text-xs font-medium text-gray-500 cursor-pointer"
                          onClick={() => {
                            handleOpen("sm");
                          }}
                        >
                          <svg
                            className="w-4 h-4 mr-1 cursor-pointer"
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

                          <span className="cursor-pointer">
                            {blog.comment.length}
                          </span>
                        </div>
                      </Tooltip>

                      <Tooltip
                        title={`${allclap.length} Claps`}
                        placement="top"
                        arrow
                      >
                        <div className="flex flex-row items-center text-xs font-medium text-gray-500 cursor-pointer">
                          <FaHandsClapping
                            className={
                              user && allclap.includes(String(user._id))
                                ? postlike
                                : postunlike
                            }
                            onClick={() => {
                              let id = blog._id;
                              if (user) {
                                PostReaction(id);
                              } else {
                                Swal.fire({
                                  title: "You need to Sign In",
                                  text: "Before you can like a post",
                                  icon: "warning",
                                });
                                router.push("/signin");
                              }
                            }}
                          />

                          <span>{allclap.length}</span>
                        </div>
                      </Tooltip>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row items-center w-full gap-5 md:hidden">
                  <div
                    className="flex flex-row items-center w-full gap-5 px-2 py-1 bg-gray-200 rounded-full cursor-pointer"
                    onClick={() => {
                      handleOpen("xxl");
                    }}
                  >
                    <div className="p-1 bg-white rounded-full h-fit w-fit">
                      <Image
                        src={blog.author.userdp}
                        className="object-cover w-8 h-8 rounded-full cursor-pointer"
                        height={30}
                        width={30}
                        alt="user"
                        onClick={() => {
                          let id = blog.author._id;
                          viewProfile(id);
                        }}
                      />
                    </div>
                    <div>
                      <p>Write Comment...</p>
                    </div>
                  </div>

                  <div className="flex flex-row items-center">
                    <Tooltip title={`${blog.view} Views`} placement="top" arrow>
                      <div className="flex flex-row items-center mr-2 text-xs font-medium text-gray-500">
                        <svg
                          className="w-4 h-4 mr-1 cursor-pointer"
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

                        <span className="cursor-pointer">{blog.view}</span>
                      </div>
                    </Tooltip>

                    <Tooltip
                      title={`${blog.comment.length} Comments`}
                      placement="top"
                      arrow
                    >
                      <div
                        className="flex flex-row items-center mr-2 text-xs font-medium text-gray-500 cursor-pointer"
                        onClick={() => {
                          handleOpen("xxl");
                        }}
                      >
                        <svg
                          className="w-4 h-4 mr-1 cursor-pointer"
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

                        <span className="cursor-pointer">
                          {blog.comment.length}
                        </span>
                      </div>
                    </Tooltip>

                    <Tooltip
                      title={`${allclap.length} Claps`}
                      placement="top"
                      arrow
                    >
                      <div className="flex flex-row items-center text-xs font-medium text-gray-500 cursor-pointer">
                        <FaHandsClapping
                          className={
                            user && allclap.includes(String(user._id))
                              ? postlike
                              : postunlike
                          }
                          onClick={() => {
                            let id = blog._id;
                            if (user) {
                              PostReaction(id);
                            } else {
                              Swal.fire({
                                title: "You need to Sign In",
                                text: "Before you can like a post",
                                icon: "warning",
                              });
                              router.push("/signin");
                            }
                          }}
                        />

                        <span>{allclap.length}</span>
                      </div>
                    </Tooltip>
                  </div>
                </div>
              </div>

              <PostChat
                size={size}
                handleOpen={handleOpen}
                PostComment={PostComment}
                usercomment={usercomment}
                blog={blog}
                setUserComment={setUserComment}
                allComments={allComments}
              />

              <div className="flex flex-col mt-4">
                <div className="w-full text-lg leading-relaxed text-gray-700 lg:px-0 lg:w-full">
                  {parse(blog.longdescription)}
                </div>
              </div>

              <div className="absolute top-2 right-2 text-[23px] text-gray-700 w-fit">
                <div placement="relative">
                  <div>
                    <HiOutlineDotsVertical
                      className="text-black cursor-pointer"
                      onClick={PostNav}
                    />
                  </div>

                  {blognav && (
                    <div className="absolute right-0 flex flex-col bg-white shadow-lg rounded-base w-fit">
                      {blog.author._id === user._id ? (
                        <>
                          <Link href={`/edit/${blog._id}`}>
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
                          </Link>
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

                      {blog.author._id === user._id ? (
                        <>
                          <p
                            className="flex flex-row items-center gap-2 px-6 py-2 text-sm rounded hover:cursor-pointer hover:bg-gray-100"
                            onClick={deletePost}
                          >
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
            </main>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default BlogPost;
