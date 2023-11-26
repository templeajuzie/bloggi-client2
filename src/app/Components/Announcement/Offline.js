import Image from 'next/image';
import offline from '../../Resources/Images/offline.png';
import logo from '../../Resources/Images/bloggilogo.png';
import Link from 'next/link';

const Offline = () => {

  // console.log('loading offline');

  const reFresh = () => {
    window.location.reload();
  }

  return (
    <div className='text-center text-2xl'>
      <div className='bg-white text-black'>
        <div className='flex flex-col h-screen'>
          <div className='w-full my-4 flex flex-row items-center justify-center'>
            <Image
              className='h-[80px] w-auto object-cover '
              src={logo}
              height={200}
              width={200}
              alt=''
            />
          </div>
          <div className='m-auto w-full h-full text-center flex flex-col items-center justify-center'>
            <div>
              <Image
                className='h-[100px] w-auto object-cover '
                src={offline}
                height={200}
                width={200}
                alt=''
              />
            </div>
            <p className='text-sm md:text-base text-black p-2 mb-4'>
              You aren{`'`}t connected to a working internet connection
            </p>
            <button
              className='rounded-md bg-[#FF3131] px-5 py-2.5 text-sm font-medium text-white shadow'
              onClick={reFresh}>
              Retry
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Offline;