'use client';

import Image from 'next/image';
import userimg from '../../Resources/Images/user.jpg';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import Link from 'next/link';

const Dasboard = () => {

  const user = useSelector((state) => state.userauth.user)

  return (
    <div>
      <header className='h-[50vh] overflow-hidden'>
        <div className="absolute">
          <div className="absolute bg-black opacity-[45%] w-full h-[45vh]"></div>
          <Image
            src="/headerbg.png"
            alt="background image"
            className="w-screen h-[45vh] object-cover bg-no-repeat"
            height={500}
            width={500}
          />
        </div>
        <div className='relative z-10 mx-auto px-4 py-8 sm:px-6 text-white'>
          <div className='flex items-center sm:justify-between sm:gap-4'>
            <div className='relative hidden sm:block'>
              <label className='sr-only' for='search'>
                {' '}
                Search{' '}
              </label>

              <input
                className='h-10 w-full rounded-lg border-none bg-white pe-10 ps-4 text-sm shadow-sm sm:w-56'
                id='search'
                type='search'
                placeholder='Search website...'
              />

              <button
                type='button'
                className='absolute end-1 top-1/2 -translate-y-1/2 rounded-md bg-gray-50 p-2 text-gray-600 transition hover:text-gray-700'>
                <span className='sr-only'>Search</span>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-4 w-4'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth='2'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                  />
                </svg>
              </button>
            </div>

            <div className='flex flex-1 items-center justify-between gap-8 sm:justify-end'>
              <div className='flex gap-4'>
                <button
                  type='button'
                  className='block shrink-0 rounded-lg bg-white p-2.5 text-gray-600 shadow-sm hover:text-gray-700 sm:hidden'>
                  <span className='sr-only'>Search</span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth='2'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                    />
                  </svg>
                </button>

                <a
                  href='#'
                  className='block shrink-0 rounded-lg bg-white p-2.5 text-gray-600 shadow-sm hover:text-gray-700'>
                  <span className='sr-only'>Academy</span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth='2'>
                    <path d='M12 14l9-5-9-5-9 5 9 5z' />
                    <path d='M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z' />
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222'
                    />
                  </svg>
                </a>

                <a
                  href='#'
                  className='block shrink-0 rounded-lg bg-white p-2.5 text-gray-600 shadow-sm hover:text-gray-700'>
                  <span className='sr-only'>Notifications</span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth='2'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
                    />
                  </svg>
                </a>
              </div>

              <button
                type='button'
                className='group flex shrink-0 items-center rounded-lg transition'>
                {user && (
                  <>
                    <span className='sr-only'>Menu</span>

                    <TuneIcon className="block text-lg sm:hidden md:hidden lg:invisible mr-3" />

                    {/* <Link href={`/user/${user._id}`}>
                      <Image
                        alt='Man'
                        src={user.userdp}
                        className='h-10 w-10 rounded-full object-cover border border-1 border-gray-300'
                        height={200}
                        width={200}
                      />
                    </Link> */}

                    <p className='ms-2 hidden text-left text-xs sm:block'>
                      <Link href={`/user/${user._id}`}>
                        <strong className='block font-medium'>
                          {user.fullname}
                        </strong>
                      </Link>

                      <Link href={`/user/${user._id}`}>
                        <span className='text-gray-300'>{user.email} </span>
                      </Link>
                    </p>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className='mt-8 text-white'>
            {user && (
              <h1 className='text-xl font-bold sm:text-3xl text-gray-300'>
                Welcome Back, {user.fullname.split(' ')[0]}!
              </h1>
            )}

            <p className='mt-1.5 text-sm text-gray-100 '>
              Your post has seen a 52% increase in traffic in the last month.
              Keep it up! 🚀
            </p>
          </div>
        </div>
      </header>

    </div>
  );
};

export default Dasboard;
