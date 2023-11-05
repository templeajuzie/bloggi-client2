'use client'; // This is a client component 👈🏽
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import axios from 'axios';
// import { useRouter } from 'next/router';
import Announcement from '../Components/Announcement/Announcement';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import { AiOutlineUserAdd } from 'react-icons/ai';
import ReactHtmlParser from 'react-html-parser';
import { HiOutlineDotsVertical } from 'react-icons/hi'

const BlogPost = () => {
  const params = useParams();

  const [blog, setBlog] = useState(null);

  const FetchData = async () => {

    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/blog/${params.id}`
      );

      if (response.status === 200) {

        setBlog(response.data.data);
      }


      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    FetchData();
  }, []);

  return (
    <div className=''>
      <Navbar />
      {blog === null ? (
        <div class='flex flex-col mx-5 md:mx-10 my-10 lg:flex-row lg:mx-[12%] gap-10'>
          <div class='w-[100%] lg:w-[60%]'>
            <main className='shadow-md p-5 md:p-5 lg:p-10 animate-pulse'>
              <div className='mb-4 md:mb-0 w-full mx-auto relative'>
                <div className='px-4 lg:px-0 flex flex-col gap-4 mb-3'>
                  <div className='rounded-mdfont-semibold bg-gray-200 leading-tight animate-pulse h-5 w-[70%]'></div>
                  <div className='rounded-mdfont-semibold bg-gray-200 leading-tight animate-pulse h-5 w-[40%]'></div>
                </div>

                <div className='show flex flex-col'>
                  <div className='w-full h-72 bg-gray-200 rounded'></div>
                </div>
              </div>

              <div className='flex flex-col lg:flex-row'>
                <div className='lg:px-0 mt-12 text-gray-700 text-lg leading-relaxed w-full lg:w-full'>
                  <p className='pb-6'></p>
                </div>
              </div>
            </main>
          </div>
          <div className='w-[100%] lg:w-[40%]'>
            <div className='w-full p-5 md:p-5 lg:w-full h-fit m-auto max-w-screen-sm lg:sticky lg:top-[50px] animate-pulse'>
              <div className='p-4 border-t border-b md:border md:rounded'>
                <div className='flex py-2'>
                  <div className='w-10 h-10 bg-gray-200 rounded-full mr-2'></div>
                  <div>
                    <p className='font-semibold text-gray-700 text-sm'></p>
                    <p className='font-semibold text-gray-600 text-xs'></p>
                  </div>
                </div>
                <p class='text-gray-700 py-3'></p>
                <button className='px-2 py-1 text-gray-100 bg-green-700 flex w-full items-center justify-center rounded'>
                  Follow
                  <i className='bx bx-user-plus ml-2'></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (


        <div class='flex flex-col mx-5 md:mx-10 my-10 lg:flex-row lg:mx-[10%] gap-10'>
          <div class=' w-[100%] lg:w-[60%] relative'>
            <main className=' shadow-md p-5 md:p-5 lg:p-10'>
              <div className='mb-4 md:mb-0 w-full mx-auto relative'>
                <div className='px-4 lg:px-0'>
                  <h2 className='text-xl font-semibold text-gray-800 leading-tight'>
                    {blog.title}
                  </h2>
                  <a
                    href='#'
                    className='py-2 text-green-700 inline-flex items-center justify-center mb-2'>
                    Cryptocurrency
                  </a>
                </div>

                <div className='show flex flex-col h-full w-full'>
                  <Image
                    src={blog.blogimage}
                    className='w-full h-full object-cover lg:rounded'
                    width={1000}
                    height={500}
                    alt='blog'
                  />
                </div>
              </div>

              <div className='flex flex-col lg:flex-row'>
                <div className='lg:px-0 mt-12 text-gray-700 text-lg leading-relaxed w-full lg:w-full'>
                  {/* <p className='pb-6'>{blog.longdescription}</p> */}
                  {ReactHtmlParser(blog.longdescription)}
                </div>
              </div>
            </main>
            <div className='absolute top-2 right-2 text-[23px] text-gray-700'>
              <HiOutlineDotsVertical className='text-black cursor-pointer' />
            </div>
          </div>
          <div class='w-[100%] lg:w-[40%]'>
            <div className='w-full p-5 md:p-5  lg:w-full h-fit m-auto max-w-screen-sm lg:sticky lg:top-[50px]'>
              <div className='p-4 border-t border-b md:border md:rounded'>
                <div className='flex py-2 justify-between'>
                  <div className='flex py-2'>
                    <Image
                      src={blog.blogimage}
                      className='h-10 w-10 rounded-full mr-2 object-cover'
                      height={40}
                      width={40}
                      alt='user'
                    />
                    <div>
                      <p className='font-semibold text-gray-700 text-sm'>
                        {' '}
                        Mike Sullivan{' '}
                      </p>
                      <p className='font-semibold text-gray-600 text-xs'>
                        {' '}
                        Editor{' '}
                      </p>
                    </div>
                  </div>
                  <div className=''>
                    <button className='px-6 py-2 text-gray-100 bg-[#FF3131] flex w-fit items-center justify-center rounded'>
                      Follow
                      <AiOutlineUserAdd className='bx bx-user-plus ml-2' />
                    </button>
                  </div>
                </div>
                <p class='text-gray-700 py-3 text-sm'>
                  Mike writes about technology Yourself required no at thoughts
                  delicate landlord it be. Branched dashwood
                </p>
              </div>
            </div>
          </div>
        </div>



      )}
      <Footer />
    </div>
  );
};

export default BlogPost;
