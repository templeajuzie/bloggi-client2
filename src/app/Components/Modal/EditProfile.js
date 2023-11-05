import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from '@material-tailwind/react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdCameraAlt } from 'react-icons/md';
import Cookies from 'js-cookie';
import axios from 'axios';

const EditProfile = ({ size, handleOpen }) => {
  const user = useSelector((state) => state.userauth.user);
  const dispatch = useDispatch();
  const token = Cookies.get('authtoken');

  useEffect(() => {
    dispatch({ type: 'userauth/getUserInformation' });
  }, []);

  const [fullname, setFullname] = useState(user.fullname);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [userbio, setUserBio] = useState(user.userbio);
  const [userdp, setUserDp] = useState(user.userdp);

  console.log("my fullname", fullname);



  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    const imageUrl = URL.createObjectURL(selectedFile);
    setUserDp(imageUrl);
  };

  const UpdateProfile = async () => {
    console.log(fullname, username, email, userbio);

    try {
      const response = await axios.patch(
        'http://localhost:8000/api/v1/auth/account',
        {
          fullname,
          username,
          email,
          userdp,
          userbio,
        },
        {
          headers: {
            Authorization: `Bearer ${String(token)}`,
          },
        }
      );

      if (response.status !== 200) {
        console.log('opps something went wrong, try again');

      }

      handleOpen(null)
      window.location.reload();
    } catch (error) { }

  };

  return (
    <Dialog
      open={
        size === 'xs' ||
        size === 'sm' ||
        size === 'md' ||
        size === 'lg' ||
        size === 'xl' ||
        size === 'xxl'
      }
      size={size || 'sm'}
      handler={handleOpen} >
      <DialogHeader className='flex flex-row justify-between'>
        <span className='text-large font-lg'>Update Profile</span>
      </DialogHeader>
      <DialogBody className='h-[65vh] overflow-y-scroll'>
        <form className='max-w-2xl'>
          <div className='flex flex-wrap  rounded-lg p-3'>
            <div className='object-center relative bottom-10 middle-0 shadow rounded-lg w-full flex flex-row text-center items-center justify-center '>
              <div className='relative rounded-full w-40 h-40 overflow-hidden'>
                <Image
                  alt='Profile Picture'
                  src={userdp}
                  className='rounded-full w-40 h-40 p-5 text-center object-cover'
                  width={500}
                  height={500}
                />
                <label
                  for='file'
                  className='absolute top-0 left-0 w-full h-full flex justify-center items-center'>
                  <MdCameraAlt
                    className='text-2xl text-white bg-black rounded-full p-1 cursor-pointer'
                    name='file'
                  />
                  <input
                    type='file'
                    id='file'
                    alt=''
                    className='hidden'
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            </div>

            <div className='flex flex-col gap-2 mt-5 w-full'>
              <div>
                <label className='text-black font-base text-sm'>Fullname</label>
                <input
                  className='w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100'
                  type='text'
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                />
              </div>

              <div>
                <label className='text-black font-base text-sm'>Username</label>
                <input
                  className='w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100'
                  type='text'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div>
                <label className='text-black font-base text-sm'>Email</label>
                <input
                  className='w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100'
                  type='text'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className='text-black font-base text-sm'>Bio</label>
                <textarea
                  className='w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100'
                  value={userbio}
                  name='bio'
                  onChange={(e) => setUserBio(e.target.value)}
                >
                </textarea>
              </div>
            </div>
          </div>
        </form>
      </DialogBody>

      <DialogFooter>
        <Button
          variant='text'
          color='red'
          onClick={() => handleOpen(null)}
          className='text-black mr-4'>
          <span>Cancel</span>
        </Button>
        <Button
          variant='gradient'
          className='bg-[#FF3131]'
          onClick={() => UpdateProfile()}>
          <span>Confirm</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default EditProfile;
