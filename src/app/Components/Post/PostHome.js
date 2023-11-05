'use client';

import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineComment } from 'react-icons/ai';
import { PiEyeLight } from 'react-icons/pi';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';

function PostHome() {
  const [blogs, setBlogs] = useState(null);
  const [loads, setLoads] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userauth.user);
  const isAuthenticated = useSelector((state) => state.userauth.isAuthenticated);
  const loading = useSelector((state) => state.userauth.loading);
  const error = useSelector((state) => state.userauth.error);
  const [blogLoading, setBlogLoading] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/blog');
      if (response.data && response.data.allblog) {
        setBlogs(response.data.allblog);
        setLoads(false);
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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <section className='bg-white'>
        <div className=' flex h-full flex-row gap-5 justify-between py-3  px-4 mx-auto lg:py-6 lg:px-6'>
          <div className='grid gap-8 lg:grid-cols-1 w-full md:w-full lg:w-[65%]'>
            {!blogs &&
              <article className='h-fit flex flex-col w-full lg:flex-row items-center gap-4 rounded-lg border border-gray-200 shadow-md animate-pulse sm:flex-col'>
                <div className='rounded-lg w-[60%] h-[50%] md:h-full lg:h-[50%] object-cover bg-gray-500'></div>

                <div className='content flex-grow p-6 w-full'>
                  <div className='flex justify-between items-center mb-5 text-gray-300'>
                    <span className='bg-gray-300 text-gray-300 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded w-full'>
                      <div className='w-3 h-3 bg-gray-300 rounded-full'></div>
                    </span>
                    <span className='text-sm'></span>
                  </div>

                  <div className='flex items-center space-x-4 my-1'>
                    <div className='w-10 h-10 bg-gray-300 rounded-full'></div>
                    <span className='font-medium bg-gray-300 h-5 w-20'></span>
                  </div>

                  <div className='mb-2 text-2xl font-bold tracking-tight text-gray-300 bg-gray-300 h-8 rounded'></div>
                  <div className='mb-5 font-light text-gray-300 bg-gray-300 h-4 rounded'></div>
                  <div className='flex justify-between items-center'>
                    <a
                      href='#'
                      className='inline-flex items-center font-medium text-gray-300 hover:underline'>
                      <div className='ml-2 w-4 h-4 bg-gray-300 rounded-full'></div>
                    </a>
                  </div>
                </div>
              </article>}
            
              <>
                {blogs && blogs.map((post) => (
                  <>
                    <article
                      key={post.id}
                      // className='flex flex-col md:flex-row lg:flex-row items-center gap-4 bg-white rounded-lg border border-gray-200 shadow-md'>
                      className='flex flex-col bg-white h-fit rounded-lg shadow-lg md:flex-row lg:flex-row items-center gap-4 bg-white rounded-lg mb-5'>
                      <Link href={`/${post._id}`} className='h-full w-fit'>
                        <Image
                          className='rounded-lg h-auto w-[50vw] object-cover'
                          src={post.blogimage}
                          alt='Blog post'
                          width={440}
                          height={203}
                          draggable={false}
                        />
                      </Link>
                      <div className='content p-6'>
                        <div className='flex justify-between items-center mb-5 text-gray-500'>
                          {/* <span className='bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded'>
                            {post.category}
                          </span> */}
                          <div className='flex items-center space-x-4'>
                            <Link href={`/user/${post.authorid}`}>
                              <Image
                                src={post.blogimage}
                                alt='Jese Leos avatar'
                                width={56}
                                height={56}
                                className='h-[30px] w-[30px] object-cover bg-gray-50 p-1[]  rounded-full'
                              />
                            </Link>
                            <Link href={`/user/${post.authorid}`}>
                              <span className='font-medium text-sm'>
                                Peter Haxander
                              </span>
                            </Link>
                          </div>
                          <span className='text-sm'>
                            <time
                              dateTime={post.createdAt}
                              className='text-gray-500'>
                              {post.posttime}
                            </time>
                          </span>
                        </div>

                        <h2 className='my-2 text-base font-medium tracking-tight text-gray-900'>
                          <Link href={`/${post._id}`}>{post.title}</Link>
                        </h2>
                        <p className='mb-5 font-light text-sm text-gray-500'>
                          <Link href={`/${post._id}`}>
                            {post.shortdescription}
                          </Link>
                        </p>
                        <div className='flex justify-between items-center'>
                          <div className='flex flex-row items-center'>
                            <div className='text-xs font-medium text-gray-500 flex flex-row items-center mr-2'>
                              <svg
                                className='w-4 h-4 mr-1'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                                xmlns='http://www.w3.org/2000/svg'>
                                <path
                                  stroke-linecap='round'
                                  stroke-linejoin='round'
                                  stroke-width='2'
                                  d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'></path>
                                <path
                                  stroke-linecap='round'
                                  stroke-linejoin='round'
                                  stroke-width='2'
                                  d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'></path>
                              </svg>
                              <span>1.5k</span>
                            </div>

                            <div className='text-xs font-medium text-gray-500 flex flex-row items-center mr-2'>
                              <svg
                                className='w-4 h-4 mr-1'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                                xmlns='http://www.w3.org/2000/svg'>
                                <path
                                  stroke-linecap='round'
                                  stroke-linejoin='round'
                                  stroke-width='2'
                                  d='M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z'></path>
                              </svg>
                              <span>25</span>
                            </div>

                            <div className='text-xs font-medium text-gray-500 flex flex-row items-center'>
                              <svg
                                className='w-4 h-4 mr-1'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                                xmlns='http://www.w3.org/2000/svg'>
                                <path
                                  stroke-linecap='round'
                                  stroke-linejoin='round'
                                  stroke-width='2'
                                  d='M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5'></path>
                              </svg>
                              <span>7</span>
                            </div>
                          </div>
                          <Link
                            href={`/${post._id}`}
                            className='inline-flex items-center font-medium text-primary-600 hover:underline'>
                            Read
                            <svg
                              className='ml-2 w-4 h-4'
                              fill='currentColor'
                              viewBox='0 0 20 20'
                              xmlns='http://www.w3.org/2000/svg'>
                              <path
                                fillRule='evenodd'
                                d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
                                clipRule='evenodd'></path>
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </article>
                  </>
                ))}
              </>
        
          </div>
          <div className='hidden lg:w-[35%] h-fit lg:flex flex-col gap-6 items-end justify-center sticky top-20'>
            <div className='flex flex-col gap-4 items-end justify-center w-full'>
              <p className='text-black font-medium'>Suggested Authors...</p>
              <div className='flex -space-x-4'>
                <Image
                  alt='Author 1'
                  className='w-12 h-12 border rounded-full bg-gray-200 border-gray-300'
                  width={40}
                  height={40}
                  src='https://source.unsplash.com/40x40/?portrait?1'
                />
                <Image
                  alt='Author 3'
                  className='w-12 h-12 border rounded-full bg-gray-200 border-gray-300'
                  width={40}
                  height={40}
                  src='https://source.unsplash.com/40x40/?portrait?3'
                />
                <Image
                  alt='Author 2'
                  className='w-12 h-12 border rounded-full bg-gray-200 border-gray-300'
                  width={40}
                  height={40}
                  src='https://source.unsplash.com/40x40/?portrait?2'
                />
                <Image
                  alt='Author 3'
                  className='w-12 h-12 border rounded-full bg-gray-200 border-gray-300'
                  width={40}
                  height={40}
                  src='https://source.unsplash.com/40x40/?portrait?3'
                />
                <Image
                  alt='Author 4'
                  className='w-12 h-12 border rounded-full bg-gray-200 border-gray-300'
                  width={40}
                  height={40}
                  src='https://source.unsplash.com/40x40/?portrait?4'
                />
                <span className='flex items-center justify-center w-12 h-12 font-semibold border rounded-full bg-[#FF3131] text-white border-gray-300'>
                  +3
                </span>
              </div>
            </div>

            {blogs === null ? (
              <><CircularProgress /></>

            ) : (
              <div className=' h-[60vh] overflow-y-hidden hover:overflow-y-auto'>
                <aside className='w-full p-6 sm:w-60 h-fit bg-gray-900 text-gray-100 pb-28 rounded-sm'>
                  <nav className='space-y-8 text-sm'>
                    <div className='space-y-2'>
                      <h2 className='text-sm font-semibold tracking-wide uppercase text-gray-400'>
                        Technology
                      </h2>
                      <div className='flex flex-col space-y-1'>
                        <a rel='noopener noreferrer' href='#'>
                          Artificial Intelligence
                        </a>
                        <a rel='noopener noreferrer' href='#'>
                          Blockchain
                        </a>
                        <a rel='noopener noreferrer' href='#'>
                          Cybersecurity
                        </a>
                        <a rel='noopener noreferrer' href='#'>
                          Machine Learning
                        </a>
                        <a rel='noopener noreferrer' href='#'>
                          Web Development
                        </a>
                      </div>
                    </div>
                    <div className='space-y-2'>
                      <h2 className='text-sm font-semibold tracking-wide uppercase text-gray-400'>
                        Science
                      </h2>
                      <div className='flex flex-col space-y-1'>
                        <a rel='noopener noreferrer' href='#'>
                          Space Exploration
                        </a>
                        <a rel='noopener noreferrer' href='#'>
                          Biology
                        </a>
                        <a rel='noopener noreferrer' href='#'>
                          Physics
                        </a>
                        <a rel='noopener noreferrer' href='#'>
                          Chemistry
                        </a>
                      </div>
                    </div>
                    <div className='space-y-2'>
                      <h2 className='text-sm font-semibold tracking-wide uppercase text-gray-400'>
                        Travel
                      </h2>
                      <div className='flex flex-col space-y-1'>
                        <a rel='noopener noreferrer' href='#'>
                          Adventure Destinations
                        </a>
                        <a rel='noopener noreferrer' href='#'>
                          Cultural Experiences
                        </a>
                        <a rel='noopener noreferrer' href='#'>
                          Travel Tips
                        </a>
                        <a rel='noopener noreferrer' href='#'>
                          Food & Cuisine
                        </a>
                      </div>
                    </div>
                    <div className='space-y-2'>
                      <h2 className='text-sm font-semibold tracking-wide uppercase text-gray-400'>
                        Lifestyle
                      </h2>
                      <div className='flex flex-col space-y-1'>
                        <a rel='noopener noreferrer' href='#'>
                          Health & Wellness
                        </a>
                        <a rel='noopener noreferrer' href='#'>
                          Fitness
                        </a>
                        <a rel='noopener noreferrer' href='#'>
                          Fashion
                        </a>
                        <a rel='noopener noreferrer' href='#'>
                          Entertainment
                        </a>
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
