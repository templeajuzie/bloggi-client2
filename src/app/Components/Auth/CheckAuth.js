'use client';

import Cookies from 'js-cookie';
import { useSelector, useDispatch } from 'react-redux';
import { UserSignIn, UserSignOut } from '../../redux/slice/authSlice';

const token = Cookies.get('token');

const CheckAuth = (id = token) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state) => state.authslice.isAuthenticated
  );

  if (token) {
    axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/account`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          // dispatch(UserSignIn());
        } else {
          // dispatch(UserSignOut());
        }
      })
      .catch((error) => {
        console.error('Authentication error:', error);
        router.push('/signin');
      });
  } else {
    // No token, user is not authenticated
    // setIsAuthenticated(false);
    router.push('/signin');
  }
};

export default CheckAuth;
