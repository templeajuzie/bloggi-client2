'use client';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import Auth from '../Components/Auth/ProtectedRoute2';
import Footer from '../Components/Footer/Footer';
import Navbar from '../Components/Navbar/Navbar';
import ReactiveButton from 'reactive-button';
import { useRouter } from 'next/navigation';

function UpdatePassword() {
  const [state, setState] = useState('idle');
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const router = useRouter();

  const urlParams = useSearchParams();
  const reset = urlParams.get('reset');

  const PasswordUpdate = async (e) => {
    e.preventDefault();

    try {
      setState('loading');
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/account/updatepassword`,
        {
          reset,
          password,
          confirmPassword,
        }
      )

      if (response.status !== 200) {
        setState('error');
      }

      setState('success');
      router.push('/signin')


    } catch (error) {

    }
  };

  return (
    <div>
      <Navbar />
      <section className='bg-gray-200 px-2 py-16'>
        <div className='flex flex-col items-center justify-center py-8 mx-auto md:h-fit lg:py-0'>
          <div className='w-full bg-white rounded-lg md:mt-0 sm:max-w-md xl:p-0 shadow-lg dark:border-gray-700'>
            <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
              <div className='a flex flex-row items-center gap-4 mb-[30px]'>
                <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-black'>
                  Update Password
                </h1>
              </div>
              <form
                className='space-y-4 md:space-y-6'
                action='#'
                onSubmit={PasswordUpdate}>
                <div>
                  <label
                    for='password'
                    className='block mb-2 text-sm font-medium text-gray-900'>
                    New Password
                  </label>
                  <input
                    type='password'
                    name='password'
                    id='password'
                    placeholder='••••••••'
                    className='w-full rounded-lg border border-gray-300 p-4 pe-12 text-sm shadow-sm'
                    required={true}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div>
                  <label
                    for='password'
                    className='block mb-2 text-sm font-medium text-gray-900'>
                    Confirm Password
                  </label>
                  <input
                    type='password'
                    name='password'
                    id='password'
                    placeholder='••••••••'
                    className='w-full rounded-lg border border-gray-300 p-4 pe-12 text-sm shadow-sm'
                    required={true}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                <div className='flex items-start'>
                  <div className='flex items-center h-5'>
                    <input
                      id='terms'
                      aria-describedby='terms'
                      type='checkbox'
                      className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800'
                      required={true}
                    />
                  </div>
                  <div className='ml-3 text-sm'>
                    <label
                      for='terms'
                      className='font-light text-sm text-gray-500 dark:text-gray-800'>
                      By checking this box, you agree to our {' '}
                      <a
                        className='font-medium text-primary-600 mr-1 underline dark:text-primary-500'
                        href='#'>
                        Terms
                      </a>
                      and
                      <a
                        className='font-medium ml-1 text-primary-600 underline dark:text-primary-500'
                        href='#'>
                        Privacy policy
                      </a>
                    </label>
                  </div>
                </div>


                <ReactiveButton
                  buttonState={state}
                  idleText="Update Password"
                  loadingText="Loading"
                  successText="Updated successfully"
                  errorText="Unable to update"
                  color="red"
                  width='100%'
                  size="medium"
                  type='submit'
                  style={{
                    display: 'block',
                    borderRadius: '0.5rem',
                    backgroundColor: '#FF3131',
                    padding: '0.75rem 1.25rem',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: 'white',
                    background: '#FF3131',
                  }}
                />
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Auth(UpdatePassword);
