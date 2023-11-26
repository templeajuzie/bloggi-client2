"use client"; // This is a client component 👈🏽
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Cookies from "js-cookie";
import axios from "axios";
// import { useRouter } from 'next/router';
import Announcement from "../Components/Announcement/Announcement";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import { AiOutlineUserAdd } from "react-icons/ai";
import parse from "html-react-parser";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Swal from "sweetalert2";

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

const BlogPost = () => {
  const params = useParams();
  const router = useRouter();
  const token = Cookies.get("authtoken");
  const socketRef = useRef(null);

  const socket = io.connect(`${process.env.NEXT_PUBLIC_SERVER_URL}`);

  const [blog, setBlog] = useState(null);
  const [usercomment, setUserComment] = useState(null);
  const [allComments, setAllComments] = useState(null);
  const [blognav, setBlogNav] = useState(false);
  const isInitialRender = useRef(true);
  

  const user = useSelector((state) => state.userauth.user);

  const FetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/blog/${params.id}`
      );

      if (response.status === 200) {
        setBlog(response.data.blogdata);

        setAllComments(response.data.blogdata.comment);
        console.log(comment);
      }

      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const PostNav = () => {
    setBlogNav(!blognav);
  };

  useEffect(() => {
    socket.on("allcomment", (data) => {
      setAllComments(data);
      console.log(data);
    });

    // Clean up socket on component unmount
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  useEffect(() => {
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

  const PostComment = async (e) => {
    e.preventDefault();

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

  const viewProfile = (id) => {
    router.push(`/user/${id}`);
  };

  return (
    <div className="">
      <Navbar />
      {blog === null ? (
        <div className="flex flex-col md:mx-10 my-10 lg:flex-row lg:mx-[12%] gap-10">
          <div class="w-[100%] lg:w-[60%]">
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
          <div className="w-[100%] lg:w-[40%]">
            <div className="w-full p-5 md:p-5 lg:w-full h-fit m-auto max-w-screen-sm lg:sticky lg:top-[50px] animate-pulse">
              <div className="p-4 border-t border-b md:border md:rounded">
                <div className="flex py-2">
                  <div className="w-10 h-10 mr-2 bg-gray-200 rounded-full"></div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700"></p>
                    <p className="text-xs font-semibold text-gray-600"></p>
                  </div>
                </div>
                <p class="text-gray-700 py-3"></p>
                <div className="flex items-center justify-center w-full px-2 py-3 text-gray-100 bg-gray-400 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col  md:mx-10 my-10 md:flex-col lg:flex-row lg:px-[2%] gap-10">
          <div class="w-[100%] md:w-[100%] lg:w-[60%] justify-between lg:px-10">
            <main className="relative p-5 shadow-md md:p-5 lg:p-10">
              <div className="w-full mx-auto mb-4 ab md:mb-0">
                <div className="md:px-4 lg:px-0">
                  <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {blog.title}
                  </h2>
                  <a
                    href="#"
                    className="inline-flex items-center justify-center py-2 mb-2 text-green-700"
                  >
                    {blog.category}
                  </a>
                </div>

                <div className="relative flex flex-col w-full h-full show">
                  <Image
                    src={blog.blogimage}
                    className="object-cover w-full h-full lg:rounded"
                    width={1000}
                    height={500}
                    alt="blog"
                  />

                  <div className="absolute top-0 left-0 flex w-full px-5 py-2 bg-black bg-opacity-50 md:hidden">
                    <div className="flex py-2 ">
                      <Image
                        src={blog.blogimage}
                        className="object-cover w-10 h-10 mr-2 rounded-full"
                        height={40}
                        width={40}
                        alt="user"
                      />
                      <div>
                        <p className="text-sm font-semibold text-gray-100">
                          {" "}
                          Mike Sullivan{" "}
                        </p>
                        <p className="text-xs font-semibold text-gray-100">
                          {" "}
                          Editor{" "}
                        </p>
                      </div>
                      <AiOutlineUserAdd className="ml-2 text-xl bx bx-user-plus text-[#FF3131]" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row">
                <div className="w-full mt-12 text-lg leading-relaxed text-gray-700 lg:px-0 lg:w-full">
                  {/* <p className='pb-6'>{blog.longdescription}</p> */}
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

          <div class="w-[100%]  lg:w-[40%]">
            <div className="top-0 left-0 flex items-center justify-between w-full px-5 py-2 bg-black rounded-t-lg jus bg-opacity-85">
              <div className="flex py-2 ">
                <Image
                  src={blog.author.userdp}
                  className="object-cover w-10 h-10 mr-2 rounded-full"
                  height={40}
                  width={40}
                  alt="user"
                />
                <div>
                  <p className="text-sm font-semibold text-gray-100">
                  {blog.author.fullname}
                  </p>
                  <p className="text-xs font-semibold text-gray-100">
                  {blog.author.username}
                  </p>
                </div>
              </div>
              <div
                className="flex flex-row items-center gap-2 px-3 py-2 rounded-md cursor-pointer hover:bg-blue-gray-900"
                onClick={() => {
                  let id = blog.author._id;
                  viewProfile(id);
                }}
              >
                <p className="text-gray-100 text-[14px]">View profile</p>
                <AiOutlineUserAdd className="ml-2 text-xl bx bx-user-plus text-[#FF3131]" />
              </div>
            </div>

            <div className="w-full max-w-screen-sm p-5 m-auto md:p-5 lg:w-full h-fit">
              <section className="py-8 antialiased bg-white dark:bg-gray-900 lg:py-2">
                <div className="max-w-2xl mx-auto">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-gray-900 lg:text-2xl dark:text-white">
                      Post Comment
                    </h2>
                  </div>
                  <form className="mb-1" onSubmit={PostComment}>
                    <div className="px-4 py-2 mb-4 bg-white border border-gray-200 rounded-lg rounded-t-lg dark:bg-gray-800 dark:border-gray-700">
                      <label htmlFor="comment" className="sr-only">
                        Your comment
                      </label>
                      <textarea
                        id="comment"
                        rows="2"
                        className="w-full px-0 text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                        placeholder="Write a comment..."
                        onChange={(e) => setUserComment(e.target.value)}
                        required
                      ></textarea>
                    </div>

                    <Button variant="gradient" type="submit">
                      Comment
                    </Button>
                  </form>
                </div>
              </section>
            </div>

            {allComments && (
              <div className="lg:sticky lg:top-[65px] flex flex-col gap-4 p-5 rounded-sm border shadow-sm h-auto max-h-[70vh] overflow-y-auto mx-5">
                {allComments.map((item) => (
                  <>
                    <article
                      className="p-2 text-base bg-white rounded-lg dark:bg-gray-900"
                      key={item.id}
                    >
                      <footer className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <p className="inline-flex items-center mr-3 text-sm font-semibold text-gray-900 dark:text-white">
                            <Image
                              className="w-6 h-6 mr-2 rounded-full"
                              src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                              alt="Michael Gough"
                              width={24}
                              height={24}
                            />
                            Michael Gough
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            <time
                              pubdate
                              dateTime="2022-02-08"
                              title="February 8th, 2022"
                            >
                              Feb. 8, 2022
                            </time>
                          </p>
                        </div>
                        <button
                          id="dropdownComment1Button"
                          data-dropdown-toggle="dropdownComment1"
                          className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 bg-white rounded-lg dark:text-gray-400 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                          type="button"
                        >
                          <svg
                            className="w-4 h-4"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 16 3"
                          >
                            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                          </svg>
                          <span className="sr-only">Comment settings</span>
                        </button>
                        {/* Dropdown menu */}
                        <div
                          id="dropdownComment1"
                          className="z-10 hidden bg-white divide-y divide-gray-100 rounded shadow w-36 dark:bg-gray-700 dark:divide-gray-600"
                        >
                          <ul
                            className="py-1 text-sm text-gray-700 dark:text-gray-200"
                            aria-labelledby="dropdownMenuIconHorizontalButton"
                          >
                            <li>
                              <a
                                href="#"
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                              >
                                Remove
                              </a>
                            </li>
                            <li>
                              <a
                                href="#"
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                              >
                                Report
                              </a>
                            </li>
                          </ul>
                        </div>
                      </footer>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {item.usercomment}
                      </p>
                    </article>
                  </>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default BlogPost;
