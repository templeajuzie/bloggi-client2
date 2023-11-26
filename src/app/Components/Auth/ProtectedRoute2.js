'use client';

import { useEffect } from 'react';
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation'; // Correct the import statement
import Cookies from 'js-cookie';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

export default function isAuth(Component) {
  return function IsAuth(props) {
    const router = useRouter();
    const params = useParams();

    const authToken = useSelector((state) => state.authslice.authToken);
    const isAuthenticated = useSelector(
      (state) => state.authslice.isAuthenticated
    );
    
    const dispatch = useDispatch();

    useEffect(() => {
      if (authToken) {
        axios
          .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/account`, {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          })
          .then((response) => {
            if (response.status === 200 && isAuthenticated === true) {
              // Request was successful; you are authenticated
              console.log('successful');

              router.push('/');
              
            } else {
              // Request was not successful, unauthorized or other errors
              console.log('unsuccessful');
            }
          })
          .catch((error) => {
            console.error('Authentication error:', error);
          });
      } else {
        router.push('/signin');
      }
    }, [authToken]); // Only use token as a dependency

    return <Component {...props} />;
  };
}
