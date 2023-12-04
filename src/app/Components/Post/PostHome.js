"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineComment } from "react-icons/ai";
import { PiEyeLight } from "react-icons/pi";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import Cookies from "js-cookie";
import Tooltip from "@mui/material/Tooltip";
import io from "socket.io-client";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { FaHandsClapping } from "react-icons/fa6";

function PostHome() {
  const [blogs, setBlogs] = useState(null);
  const [loads, setLoads] = useState(true);
  const [allclap, setallClap] = useState(null);
  const dispatch = useDispatch();
  const [dataFetched, setDataFetched] = useState(false);
  const token = Cookies.get("authtoken");
  const fetchRef = useRef(null);

  const socket = io.connect(`${process.env.NEXT_PUBLIC_SERVER_URL}`);

  const router = useRouter();

  const user = useSelector((state) => state.userauth.user);
  const isAuthenticated = useSelector(
    (state) => state.userauth.isAuthenticated
  );
  const loading = useSelector((state) => state.userauth.loading);
  const error = useSelector((state) => state.userauth.error);
  const [blogLoading, setBlogLoading] = useState(false);

  useEffect(() => {
    socket.on("alllike", (data) => {
      setLike(data);
      console.log("this is data", allclap);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/blog`
        );
        if (response.data && response.data.allblog) {
          setBlogs(response.data.allblog);
          setallClap(response.data.allblog.like)
          setLoads(false);
          setDataFetched(true);
          console.log("This is the fetched data:", response.data.allblog);
        } else {
          setLoads(false);
          console.log("No blog posts found");
        }
      } catch (error) {
        console.error(error);
        setLoads(false); // Set loads to false on error to handle the loading state
      }
    };

    fetchData();
  }, []);

  const postlike = "w-4 h-4 mr-1 text-blue-500";
  const postunlike = "w-4 h-4 mr-1";

  const checkpost = !user ? postlike : postunlike;

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
    <div>
      <section className="bg-white">
        <div className="flex flex-row justify-between h-full gap-5 px-0 py-3 mx-auto lg:py-6 lg:px-6">
          <div className="grid gap-8 lg:grid-cols-1 w-full md:w-full lg:w-[65%]">
            {!blogs && (
              <article className="flex flex-col items-center w-full gap-4 border border-gray-200 rounded-lg shadow-md h-fit lg:flex-row animate-pulse sm:flex-col">
                <div className="rounded-lg w-[60%] h-[50%] md:h-full lg:h-[50%] object-cover bg-gray-500"></div>

                <div className="flex-grow w-full p-6 content">
                  <div className="flex items-center justify-between mb-5 text-gray-300">
                    <span className="bg-gray-300 text-gray-300 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded w-full">
                      <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                    </span>
                    <span className="text-sm"></span>
                  </div>

                  <div className="flex items-center my-1 space-x-4">
                    <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                    <span className="w-20 h-5 font-medium bg-gray-300"></span>
                  </div>

                  <div className="h-8 mb-2 text-2xl font-bold tracking-tight text-gray-300 bg-gray-300 rounded"></div>
                  <div className="h-4 mb-5 font-light text-gray-300 bg-gray-300 rounded"></div>
                  <div className="flex items-center justify-between">
                    <a
                      href="#"
                      className="inline-flex items-center font-medium text-gray-300 hover:underline"
                    >
                      <div className="w-4 h-4 ml-2 bg-gray-300 rounded-full"></div>
                    </a>
                  </div>
                </div>
              </article>
            )}

            <>
              {blogs &&
                blogs.map((post) => (
                  <>
                    <article
                      key={post.id}
                      
                      className="flex flex-col-reverse items-center w-full gap-4 px-2 mb-5 bg-white rounded-lg shadow-lg h-fit md:flex-row lg:flex-row"
                    >
                      <Link
                        href={`/${post._id}`}
                        className="h-full w-full md:w-[50%] lg:w-[50%] xl:w-[50%]"
                      >
                        <Image
                          className="rounded-lg h-full md:h-[270px] w-full object-cover"
                          src={post.blogimage}
                          alt="Blog post"
                          width={440}
                          height={203}
                          draggable={false}
                        />
                      </Link>
                      <div className="content p-2 md:p-6 w-full md:w-[50%] lg:w-[50%] xl:w-[50%]">
                        <div className="flex items-center justify-between mb-5 text-gray-500">
                          {/* <span className='bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded'>
                            {post.category}
                          </span> */}
                          <div className="flex items-center space-x-4">
                            <Link href={`/user/${post.author._id}`}>
                              <Image
                                src={post.author.userdp}
                                alt="Jese Leos avatar"
                                width={56}
                                height={56}
                                className="h-[30px] w-[30px] object-cover bg-gray-50 p-1[]  rounded-full"
                              />
                            </Link>
                            <Link href={`/user/${post.author._id}`}>
                              <span className="text-sm font-medium">
                                {post.author.fullname}
                              </span>
                            </Link>
                          </div>
                          <span className="text-sm">
                            <time
                              dateTime={post.createdAt}
                              className="text-gray-500"
                            >
                              {post.posttime}
                            </time>
                          </span>
                        </div>

                        <h2 className="my-2 text-base font-medium tracking-tight text-gray-900">
                          <Link href={`/${post._id}`}>{post.title}</Link>
                        </h2>
                        <p className="mb-5 text-sm font-light text-gray-500">
                          <Link href={`/${post._id}`}>
                            {post.shortdescription}
                          </Link>
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex flex-row items-center">
                            <Tooltip
                              title={`${post.view} Views`}
                              placement="top"
                              arrow
                            >
                              <div className="flex flex-row items-center mr-2 text-xs font-medium text-gray-500">
                                <Link href={`/${post._id}`}>
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
                                </Link>
                                <Link href={`/${post._id}`}>
                                  <span className="cursor-pointer">
                                    {post.view}
                                  </span>
                                </Link>
                              </div>
                            </Tooltip>

                            <Tooltip
                              title={`${post.comment.length} Comments`}
                              placement="top"
                              arrow
                            >
                              <div className="flex flex-row items-center mr-2 text-xs font-medium text-gray-500">
                                <Link href={`/${post._id}`}>
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
                                </Link>
                                <Link href={`/${post._id}`}>
                                  <span className="cursor-pointer">
                                    {post.comment.length}
                                  </span>
                                </Link>
                              </div>
                            </Tooltip>

                            <Tooltip
                              title={`${post.like.length} Claps`}
                              placement="top"
                              arrow
                            >
                              <div className="flex flex-row items-center text-xs font-medium text-gray-500 cursor-pointer">
                                <FaHandsClapping
                                  className={
                                    user && post.like.includes(String(user._id))
                                      ? postlike
                                      : postunlike
                                  }
                                  onClick={() => {
                                    
                                    if (user) {
                                      router.push(`/${post._id}`);
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

                                <span>{post.like.length}</span>
                              </div>
                            </Tooltip>
                          </div>
                          <Link
                            href={`/${post._id}`}
                            className="inline-flex items-center font-medium text-primary-600 hover:underline"
                          >
                            View
                            <svg
                              className="w-4 h-4 ml-2"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </article>
                  </>
                ))}
            </>
          </div>
          <div className="hidden lg:w-[35%] h-fit lg:flex flex-col gap-6 items-end justify-center sticky top-20">
            <div className="flex flex-col items-end justify-center w-full gap-4">
              <p className="font-medium text-black">Suggested Authors...</p>
              <div className="flex -space-x-4">
                <Image
                  alt="Author 1"
                  className="w-12 h-12 bg-gray-200 border border-gray-300 rounded-full"
                  width={40}
                  height={40}
                  src="https://source.unsplash.com/40x40/?portrait?1"
                />
                <Image
                  alt="Author 3"
                  className="w-12 h-12 bg-gray-200 border border-gray-300 rounded-full"
                  width={40}
                  height={40}
                  src="https://source.unsplash.com/40x40/?portrait?3"
                />
                <Image
                  alt="Author 2"
                  className="w-12 h-12 bg-gray-200 border border-gray-300 rounded-full"
                  width={40}
                  height={40}
                  src="https://source.unsplash.com/40x40/?portrait?2"
                />
                <Image
                  alt="Author 3"
                  className="w-12 h-12 bg-gray-200 border border-gray-300 rounded-full"
                  width={40}
                  height={40}
                  src="https://source.unsplash.com/40x40/?portrait?3"
                />
                <Image
                  alt="Author 4"
                  className="w-12 h-12 bg-gray-200 border border-gray-300 rounded-full"
                  width={40}
                  height={40}
                  src="https://source.unsplash.com/40x40/?portrait?4"
                />
                <span className="flex items-center justify-center w-12 h-12 text-[13px] font-semibold border rounded-full bg-[#FF3131] text-white border-gray-300 cursor-pointer">
                  view
                </span>
              </div>
            </div>

            {blogs === null ? (
              <>
                <CircularProgress />
              </>
            ) : (
              <div className=" h-[60vh] overflow-y-hidden hover:overflow-y-auto">
                <aside className="w-full p-6 text-gray-100 bg-gray-900 rounded-sm sm:w-60 h-fit pb-28">
                  <nav className="space-y-8 text-sm">
                    <div className="space-y-9">
                      <div>
                        <h2 className="text-sm font-semibold tracking-wide text-gray-400 uppercase">
                          Technology
                        </h2>
                        <div className="flex flex-col space-y-2">
                          <Link href="/category/technology">Technology</Link>
                          <Link href="/category/ai">
                            Artificial Intelligence
                          </Link>
                          <Link href="/category/blockchain">Blockchain</Link>
                          <Link href="/category/cybersecurity">
                            Cybersecurity
                          </Link>
                          <Link href="/category/machine-learning">
                            Machine Learning
                          </Link>
                          <Link href="/category/web-development">
                            Web Development
                          </Link>
                        </div>
                      </div>

                      <div>
                        <h2 className="text-sm font-semibold tracking-wide text-gray-400 uppercase">
                          Travel
                        </h2>
                        <div className="flex flex-col space-y-2">
                          <Link href="/category/travel">Travel</Link>
                          <Link href="/category/adventure-destinations">
                            Adventure Destinations
                          </Link>
                          <Link href="/category/cultural-experiences">
                            Cultural Experiences
                          </Link>
                          <Link href="/category/travel-tips">Travel Tips</Link>
                          <Link href="/category/food-cuisine">
                            Food & Cuisine
                          </Link>
                        </div>
                      </div>

                      <div>
                        <h2 className="text-sm font-semibold tracking-wide text-gray-400 uppercase">
                          Lifestyle
                        </h2>
                        <div className="flex flex-col space-y-2">
                          <Link href="/category/health-wellness">
                            Health & Wellness
                          </Link>
                          <Link href="/category/fitness">Fitness</Link>
                          <Link href="/category/fashion">Fashion</Link>
                          <Link href="/category/entertainment">
                            Entertainment
                          </Link>
                        </div>
                      </div>

                      <div>
                        <h2 className="text-sm font-semibold tracking-wide text-gray-400 uppercase">
                          Other Categories
                        </h2>
                        <div className="flex flex-col space-y-2">
                          <Link href="/category/agriculture">Agriculture</Link>
                          <Link href="/category/politics">Politics</Link>
                          <Link href="/category/business">Business</Link>
                          <Link href="/category/education">Education</Link>
                          <Link href="/category/health">Health</Link>
                          <Link href="/category/finance">Finance</Link>
                          <Link href="/category/environment">Environment</Link>
                          <Link href="/category/sports">Sports</Link>
                          <Link href="/category/marketing">Marketing</Link>
                          <Link href="/category/arts-culture">
                            Arts & Culture
                          </Link>
                          <Link href="/category/science">Science</Link>
                          <Link href="/category/food-drink">Food & Drink</Link>
                          <Link href="/category/music">Music</Link>
                          <Link href="/category/technology-gadgets">
                            Technology Gadgets
                          </Link>
                          <Link href="/category/history">History</Link>
                          <Link href="/category/travel-guides">
                            Travel Guides
                          </Link>
                          <Link href="/category/family-parenting">
                            Family & Parenting
                          </Link>
                          <Link href="/category/career">Career</Link>
                          <Link href="/category/philosophy">Philosophy</Link>
                          <Link href="/category/religion-spirituality">
                            Religion & Spirituality
                          </Link>
                        </div>
                      </div>
                    </div>
                  </nav>
                </aside>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default PostHome;
