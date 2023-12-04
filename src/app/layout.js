import Head from 'next/head';
import { Inter } from "next/font/google";
import './globals.css';
import { store } from './redux/store/store';
import { Provider } from 'react-redux';
import Offline from './Components/Announcement/Offline';

export const metadata = {
  title: 'Bloggi: Your Gateway to Creative Expression',
  description: 'Unleash your thoughts and stories on Bloggi, the platform designed for seamless writing experiences. Crafted with precision and powered by create next app.',
};

export default function RootLayout({ children }) {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>
      <Provider store={store}>
        <Offline />
        {children}
      </Provider>
    </>
  );
}
