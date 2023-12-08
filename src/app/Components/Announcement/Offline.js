'use client';

import Image from "next/image";
import offline from "../../Resources/Images/offline.png";
import logo from "../../Resources/Images/bloggilogo.png";
import Link from "next/link";

const Offline = () => {
  // console.log('loading offline');

  const reFresh = () => {
    if (typeof window !== "undefined") {
      window.location.reload(); 
    }
  };

  return (
    <div className="text-2xl text-center">
      <div className="text-black bg-white">
        <div className="flex flex-col h-screen">
          <div className="flex flex-row items-center justify-center w-full my-4">
            <Image
              className="h-[80px] w-auto object-cover "
              src={logo}
              height={200}
              width={200}
              alt=""
            />
          </div>
          <div className="flex flex-col items-center justify-center w-full h-full m-auto text-center">
            <div>
              <Image
                className="h-[100px] w-auto object-cover "
                src={offline}
                height={200}
                width={200}
                alt=""
              />
            </div>
            <p className="p-2 mb-4 text-sm text-black md:text-base">
              You aren{`'`}t connected to a working internet connection
            </p>
            <button
              className="rounded-md bg-[#FF3131] px-5 py-2.5 text-sm font-medium text-white shadow"
              onClick={reFresh}
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offline;
