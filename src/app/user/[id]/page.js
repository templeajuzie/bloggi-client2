'use client';

import Footer from '@/app/Components/Footer/Footer';
import Navbar from '@/app/Components/Navbar/Navbar';
import EditProfile from '@/app/Components/Modal/EditProfile';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { FaCamera } from 'react-icons/fa';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from '@material-tailwind/react';

const UserProfile = () => {
  const user = useSelector((state) => state.userauth.user);
  const isAuthenticated = useSelector(
    (state) => state.userauth.isAuthenticated
  );

  const [userdata, setUserData] = useState(null);

  const loading = useSelector((state) => state.userauth.loading);
  const error = useSelector((state) => state.userauth.error);

  const params = useParams();
  const dispatch = useDispatch();

  const [size, setSize] = useState(null);

  const handleOpen = (value) => setSize(value);

  useEffect(() => {
    dispatch({ type: 'userauth/getUserInformation' });

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/auth/user/${params.id}`
        );
        setUserData(response.data.olduser);
        console.log('------------------------');
        console.log(response.data.olduser);
      } catch (error) {
        // Handle errors here
      }
    };

    const fetchUserBlog = async () => {
      
    }

    fetchData();
  }, [params.id, dispatch]);

  return (
    <>
      <Navbar />
      <div className='bg-gray-200 h-auto'>
        <div className='flex items-start pt-[65px] justify-left'>
          {userdata === null ? (
            <div className='w-[60%] flex flex-col gap-5 items-center justify-start px-20 md:flex-col lg:flex-row'>
              <div className='object-center'>
                <div className='rounded-full w-40 h-40 animate-pulse bg-gray-300'></div>
              </div>

              <div className='content flex-grow p-6'>
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

                <div className='mb-2 text-2xl font-bold tracking-tight text-gray-300 bg-gray-300 h-8 rounded'>
                </div>
                <div className='mb-5 font-light text-gray-300 bg-gray-300 h-4 rounded'>

                </div>
                <div className='flex justify-between items-center'>
                  <div
                    className='inline-flex items-center font-medium text-gray-300 hover:underline'>
                    <div className='ml-2 w-4 h-4 bg-gray-300 rounded-full'></div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className='flex flex-col gap-5 items-center justify-center md:flex-col lg:flex-row '>
                <div className='object-center lg:ml-20 bg-transparent p-1 rounded-full bg-white'>
                  <Image
                    alt='Profile Picture'
                    src={userdata.userdp}
                    className='rounded-full w-36 h-36 object-cover'
                    width={500}
                    height={500}
                  />
                </div>


                <div className='col-span-4 flex flex-col gap-4 justify-center items-center lg:justify-start lg:items-start'>
                  <div className='text-gray-800 flex flex-col md:flex-row gap-5 items-end'>
                    <div className='a flex flex-col gap-2 items-center lg:items-start'>
                      <div className='font-medium'>{userdata.username}</div>

                      <div className='text-2xl'>{userdata.fullname}</div>
                    </div>

                    {user && (
                      <div className='lg:ml-10'>
                        {user._id !== userdata._id ? (
                          <div className=''>
                            <button className='px-6 py-2 text-gray-100 bg-[#FF3131] flex w-fit items-center justify-center rounded'>
                              Follow
                              <AiOutlineUserAdd className='bx bx-user-plus ml-2' />
                            </button>
                          </div>
                        ) : (
                          <div className='b flex flex-row gap-4 items-center '>
                            <Button
                              onClick={() => handleOpen('xs')}
                              variant='gradient'>
                              Edit Profile
                            </Button>

                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              className='h-6 w-6'
                              fill='none'
                              viewBox='0 0 24 24'
                              stroke='currentColor'>
                              <path
                                stroke-linecap='round'
                                stroke-linejoin='round'
                                stroke-width='2'
                                d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
                              />
                              <path
                                stroke-linecap='round'
                                stroke-linejoin='round'
                                stroke-width='2'
                                d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                              />
                            </svg>

                            <EditProfile size={size} handleOpen={handleOpen} />
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className='text-gray-800 flex flex-row gap-10 items-center'>
                    <div>
                      <span className='font-semibold'> {userdata.mypost.length} </span> Posts
                    </div>

                    <div>
                      <span className='font-semibold'> {userdata.followers.length} </span> Followers
                    </div>

                    <div>
                      <span className='font-semibold'> {userdata.following.length} </span> Following
                    </div>
                  </div>

                  <div className='text-gray-800 flex flex-col justify-center items-center lg:justify-start lg:items-start'>
                    <p className='w-[80%] md:w-[70%] text-center lg:text-start'>
                      {userdata.userbio}
                    </p>
                  </div>
                </div>
              </div>

              <hr className='border-gray-800' />
            </>
          )}
        </div>

        <div>
          <section className='md:px-10'>
            <div className='container px-2 md:px-6 py-10 pt-2 mx-auto'>
              {userdata !== null ? (
                <div className='grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 sm:grid-cols-2 xl:grid-cols-3 lg:grid-cols-3'>
                  <div className='transition-all duration-150 flex w-full py-6 md:w-full lg:w-full'>
                    <div className='flex flex-col items-stretch min-h-full pb-4 mb-6 transition-all duration-150 bg-white rounded-lg shadow-lg hover:shadow-2xl'>
                      <div className='md:flex-shrink-0'>
                        <Image
                          src='https://www.unfe.org/wp-content/uploads/2019/04/SM-placeholder-1024x512.png'
                          alt='Blog Cover'
                          className='object-fill w-full rounded-lg rounded-b-none md:h-56'
                          width={200}
                          height={200}
                        />
                      </div>
                      <div className='flex items-center justify-between px-4 py-2 overflow-hidden'>
                        <span className='text-xs font-medium text-blue-600 uppercase'>
                          Web Programming
                        </span>
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
                      </div>
                      <hr className='border-gray-300' />
                      <div className='flex flex-wrap items-center flex-1 px-4 py-1 text-start mx-auto'>
                        <a href='#' className='hover:underline'>
                          <h2 className='text-xl font-bold tracking-normal text-gray-800'>
                            Ugochukwu the great man to Yawn in 7 Days
                          </h2>
                        </a>
                      </div>
                      <hr className='border-gray-300' />
                      <p className='flex flex-row flex-wrap w-full px-4 py-2 overflow-hidden text-sm text-justify text-gray-700'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Alias, magni fugiat, odit incidunt necessitatibus aut
                        nesciunt exercitationem aliquam id voluptatibus quisquam
                        maiores officia sit amet accusantium aliquid quo
                        obcaecati quasi.
                      </p>

                    </div>
                  </div>
                </div>
              ) : (
                <div className='animate-pulse grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-8 sm:grid-cols-2 xl:grid-cols-3 lg:grid-cols-3'>
                  <div className='w-full '>
                    <div className='w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600'></div>

                    <h1 className='w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700'></h1>
                    <p className='w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700'></p>
                  </div>

                  <div className='w-full '>
                    <div className='w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600'></div>

                    <h1 className='w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700'></h1>
                    <p className='w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700'></p>
                  </div>

                  <div className='w-full '>
                    <div className='w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600'></div>

                    <h1 className='w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700'></h1>
                    <p className='w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700'></p>
                  </div>


                </div>
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
