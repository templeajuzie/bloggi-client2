import Image from 'next/image';

const PageCheck = () => {
  return (
    <>
      <section className='max-w-4xl p-6 mx-auto bg-gray-100 rounded-md shadow-md'>
        <h2 className='text-lg font-semibold text-gray-700 capitalize'>
          Update Profile
        </h2>

        <form>
          <div className='object-center'>
            <Image
              alt='Profile Picture'
              src='https://picsum.photos/500/500'
              className='rounded-full w-48 h-48 p-5'
              width={500}
              height={500}
            />
          </div>
          <div className='grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2'>
            <div>
              <label className='text-gray-900 text-sm' htmlFor='username'>
                Username
              </label>
              <input
                id='username'
                type='text'
                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring'
              />
            </div>

            <div>
              <label className='text-gray-700' htmlFor='emailAddress'>
                Email Address
              </label>
              <input
                id='emailAddress'
                type='email'
                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring'
              />
            </div>

            <div>
              <label className='text-gray-700' htmlFor='password'>
                Password
              </label>
              <input
                id='password'
                type='password'
                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring'
              />
            </div>

            <div>
              <label className='text-gray-700' htmlFor='passwordConfirmation'>
                Password Confirmation
              </label>
              <input
                id='passwordConfirmation'
                type='password'
                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring'
              />
            </div>
          </div>

         
        </form>
      </section>
    </>
  );
};

export default PageCheck;
