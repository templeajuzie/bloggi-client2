'use client'; // This is a client component 👈🏽

import axios from 'axios';
import { useState, useEffect } from 'react';
import Auth from '../../Components/Auth/ProtectedRoute';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter, useParams } from 'next/navigation';
import Cookies from 'js-cookie';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import ReactiveButton from 'reactive-button';
import Dashboard from '../../Components/Dashboard/Dashboard';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function EditBlog() {
  const params = useParams();
  const router = useRouter();
  const token = Cookies.get('authtoken');

  const isAuthenticated = useSelector(
    (state) => state.authslice.isAuthenticated
  );

  const [state, setState] = useState('idle');
  const authToken = useSelector((state) => state.authslice.authToken);

  var currentDate = new Date();
  var year = currentDate.getFullYear();
  var month = currentDate.getMonth() + 1; // Note: Month is zero-based, so we add 1
  var day = currentDate.getDate();

  // Create a formatted string with the current date
  const [blog, setBlog] = useState(null);
  var formattedDate = year + '-' + month + '-' + day;

  useEffect(() => {
    dispatch({ type: 'userauth/getUserInformation' });

    const FetchData = async () => {

      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/blog/${params.id}`
        );


        if (response.status === 200) {
          // setBlog(response.data.data);
          console.log('data', blog);
        }

        setBlog(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    FetchData();

  }, []);



  const [title, setTitle] = useState(null);
  const [shortdescription, setShortDescription] = useState(null);
  const [longdescription, setLongDescription] = useState(null);
  const [category, setCategory] = useState(null);
  const [blogimage, setBlogImage] = useState(null);




  const handleChange = (html) => {
    setLongDescription(html);
  };

  const user = useSelector((state) => state.userauth.user);
  const dispatch = useDispatch();





  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setState('loading');
      const response = await axios.post(
        'http://localhost:8000/api/v1/blog/create',
        {
          title: title,
          shortdescription: shortdescription,
          longdescription: longdescription,
          category: category,
          blogimage: blogimage,
        },
        {
          headers: {
            Authorization: `Bearer ${String(token)}`,
          },
        }
      );

      if (response.status !== 201) {
        setState('error');
      }

      console.log(response.data.blogdata);
      setState('success');

      console.log(post.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className='mx-auto bg-gray-50 px-4 py-16 sm:px-6'>
        <div className='max-w-lg mx-auto'>
          <h1 className='text-center text-2xl font-bold text-black sm:text-3xl'>
            Edit your blog
          </h1>

          <p className='text-center text-gray-700 text-sm mt-5 font-medium'>
            Tweak, your blog, your audience are waiting...
          </p>

          {blog === null ? (<>
            loading...</>) : (<>
              <form
                className='mb-6 mt-6 space-y-4 rounded-lg p-6 shadow-lg sm:p-8 lg:p-8'
                onSubmit={handleSubmit}
              >
                <div>
                  <label htmlFor='title' className='sr-only'>
                    Title
                  </label>
                  <input
                    type='text'
                    value={title}
                    className='w-full rounded-lg border border-gray-300 p-4 text-sm shadow-sm'
                    placeholder='Blog Title'
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor='shortDescription' className='sr-only'>
                    Short Description
                  </label>
                  <input
                    type='text'
                    value={shortdescription}
                    className='w-full rounded-lg border border-gray-300 p-4 text-sm shadow-sm'
                    placeholder='Short Description'
                    onChange={(e) => setShortDescription(e.target.value)}
                  />
                </div>
                <div className='w-full'>
                  <fieldset className='border border-gray-300 rounded-lg w-full'>
                    <select
                      name='blog-category'
                      className='block w-full rounded-md border-gray-300 shadow-sm py-4 px-3 text-sm text-gray-700'
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value='technology'>Uncategorized</option>
                      <option value='lifestyle'>Lifestyle</option>
                      <option value='travel'>Travel</option>
                      <option value='food'>Food</option>
                      <option value='fashion'>Fashion</option>
                    </select>
                  </fieldset>
                </div>
                {/* <div>
              <label htmlFor='file_input' className='block mb-2 text-sm font-medium text-gray-900'>
                Upload file
              </label>
              <input
                className='block w-full text-sm text-gray-900 border border-gray-200 rounded-lg cursor-pointer bg-gray-100 focus:outline-none placeholder-gray-400 shadow-md'
                aria-describedby='file_input_help'
                id='file_input'
                type='file'
              />
              <p className='mt-1 text-xs text-gray-700' id='file_input_help'>
                SVG, PNG, JPG, or GIF (Max. 800x400px).
              </p>
            </div> */}

                <div className="flex items-center justify-center w-full">
                  <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" />
                  </label>
                </div>


                <div className='my-10 h-[50vh] pb-16 pt-6'>
                  <label htmlFor='longDescription' className='block mb-2 text-sm font-medium text-gray-900'>
                    Post Content
                  </label>
                  <ReactQuill
                    theme="snow"
                    className='w-full rounded-lg text-sm h-full'
                    value={longdescription}
                    onChange={handleChange}
                  />
                </div>
                <ReactiveButton
                  buttonState={state}
                  idleText="Publish"
                  loadingText="Loading"
                  successText="Created successfully"
                  errorText="Unable to Create"
                  color="red"
                  width='100%'
                  size="medium"
                  type='submit'
                  style={{
                    display: 'block',
                    borderRadius: '0.5rem',
                    backgroundColor: '#FF3131',
                    padding: '0.75rem 1.25rem',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: 'white',
                    marginTop: "20px"
                  }}
                />
              </form>
            </>)}

        </div>
      </div>
      <Footer />
    </div>
  );
}

export default EditBlog;
