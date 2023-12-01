'use client'; // This is a client component 👈🏽

import './globals.css';
import { Inter } from 'next/font/google';
import { useEffect, useState } from 'react';
import { store } from './redux/store/store';
import { Provider } from 'react-redux';
import Offline from './Components/Announcement/Offline';

const inter = Inter({ subsets: ['latin'] });

const metadata = {
  title: "Bloggi: Your Gateway to Creative Expression",
  description: "Unleash your thoughts and stories on Bloggi, the platform designed for seamless writing experiences. Crafted with precision and powered by create next app.",
};

export default function RootLayout({ children }) {
  
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    setIsOnline(navigator.onLine);

    window.addEventListener('online', () => setIsOnline(true));
    window.addEventListener('offline', () => setIsOnline(false));

    return () => {
      window.removeEventListener('online', () => setIsOnline(true));
      window.removeEventListener('offline', () => setIsOnline(false));
    };
  }, []);

  return (
    <html lang='en'>
      <body className={inter.className}>
        <Provider store={store}>{isOnline ? children : <Offline />}</Provider>
      </body>
    </html>
  );
}
