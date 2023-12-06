import './globals.css';
import { Inter } from 'next/font/google';
import ReduxProvider from './redux/Provider/ReduxProvider';


const inter = Inter({ subsets: ['latin'] });

const metadata = {
  title: "Bloggi: Your Gateway to Creative Expression",
  description: "Unleash your thoughts and stories on Bloggi, the platform designed for seamless writing experiences. Crafted with precision and powered by create next app.",
};

export default function RootLayout({ children }) {
  
  

  return (
    <html lang='en'>
      <body className={inter.className}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
