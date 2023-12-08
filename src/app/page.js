'use client';

import Image from 'next/image';
import Dashboard from './Components/Dashboard/Dashboard';
import PostHome from './Components/Post/PostHome';
import Announcement from './Components/Announcement/Announcement';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';

export default function Home() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userauth.user);
  const isAuthenticated = useSelector(
    (state) => state.userauth.isAuthenticated
  );
  const loading = useSelector((state) => state.userauth.loading);
  const error = useSelector((state) => state.userauth.error);

  useEffect(() => {
    dispatch({ type: 'userauth/getUserInformation' });
  }, [dispatch]);
  

  return (
    <main className=''>
      <Navbar />
      <Dashboard />
      <PostHome />
      <Footer />
    </main>
  );
}
