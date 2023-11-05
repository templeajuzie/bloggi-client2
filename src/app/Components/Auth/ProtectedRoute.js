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

    const user = useSelector((state) => state.userauth.user);

    const isAuthenticated = useSelector(
      (state) => state.userauth.isAuthenticated
    );

    const dispatch = useDispatch();

    useEffect(() => {

      dispatch({ type: 'userauth/getUserInformation' });

      if (user) {

      } else {
        router.push('/signin');
      }
    }, []);



    return <Component {...props} />;
  };
}
