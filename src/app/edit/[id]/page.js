'use client'; 

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
import Image from 'next/image';

function EditBlog() {
  const params = useParams();
  const router = useRouter();
  const token = Cookies.get('authtoken');

  const isAuthenticated = useSelector(
    (state) => state.authslice.isAuthenticated
  );

  const [state, setState] = useState('idle');
  const [loading, setLoading] = useState(true);

  var currentDate = new Date();
  var year = currentDate.getFullYear();
  var month = currentDate.getMonth() + 1; // Note: Month is zero-based, so we add 1
  var day = currentDate.getDate();


  const [blogid, setBlogId] = useState(params.id)
  const [selectedphoto, setSelectedPhoto] = useState(null)
  const [title, setTitle] = useState("");
  const [shortdescription, setShortDescription] = useState(null);
  const [longdescription, setLongDescription] = useState(null);
  const [category, setCategory] = useState(null);
  const [blogimage, setBlogImage] = useState(null);



  useEffect(() => {
    dispatch({ type: 'userauth/getUserInformation' });


    const FetchData = async () => {

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/blog/edit/${params.id}`,
          {
            headers: {
              Authorization: `Bearer ${String(token)}`,
            },
          }
        )

        if (response.status === 200) {
          const data = response.data.oldblog;

          setLoading(false)

          setTitle(data.title)
          setShortDescription(data.shortdescription)
          setLongDescription(data.longdescription)
          setCategory(data.category)
          setSelectedPhoto(data.blogimage)
        }


      } catch (error) {
        console.log(error);
      }
    };

    FetchData();

  }, []);





  const handleChange = (html) => {
    setLongDescription(html);
  };

  const user = useSelector((state) => state.userauth.user);
  const dispatch = useDispatch();


  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setBlogImage(selectedFile);
    const imageUrl = URL.createObjectURL(selectedFile);
    setSelectedPhoto(imageUrl)
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData()
    formData.append("title", title)
    formData.append("shortdescription", shortdescription)
    formData.append("longdescription", longdescription)
    formData.append("category", category)
    formData.append("blogimage", blogimage)
    formData.append("blogid", blogid)


    try {
      setState('loading');
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/blog/update/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${String(token)}`,
          },
          'Content-Type': 'multipart/form-data',
        }
      );

      if (response.status !== 200) {
        setState('error');
      }

      setState('success');

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className='px-4 py-16 mx-auto bg-gray-50 sm:px-6'>
        <div className='max-w-lg mx-auto'>
          <h1 className='text-2xl font-bold text-center text-black sm:text-3xl'>
            Edit your post
          </h1>

          <p className='mt-5 text-sm font-medium text-center text-gray-700'>
            Tweak, your blog, your audience are waiting...
          </p>

          {loading === true ? (<>
            loading...</>) : (<>
              <form
                className='px-2 py-6 mt-6 mb-6 space-y-4 rounded-lg shadow-lg md:p-6 sm:p-8 lg:p-8'
                onSubmit={handleSubmit}
                encType="multipart/form-data"
              >
                <div>
                  <label htmlFor='title' className='sr-only'>
                    Title
                  </label>
                  <input
                    type='text'
                    value={title}
                    className='w-full p-4 text-sm border border-gray-300 rounded-lg shadow-sm'
                    placeholder='Blog Title'
                    onChange={(e) => setTitle(e.target.value)}
                    min={74}
                  />
                </div>
                <div>
                  <label htmlFor='shortDescription' className='sr-only'>
                    Short Description
                  </label>
                  <input
                    type='text'
                    value={shortdescription}
                    className='w-full p-4 text-sm border border-gray-300 rounded-lg shadow-sm'
                    min={92}
                    placeholder='Short Description'
                    onChange={(e) => setShortDescription(e.target.value)}
                  />
                </div>
                <div className='w-full'>
                  <fieldset className='w-full border border-gray-300 rounded-lg'>
                    <select
                      name='blog-category'
                      value={category}
                      className='block w-full px-3 py-4 text-sm text-gray-700 border-gray-300 rounded-md shadow-sm'
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value='uncategorized'>Uncategorized</option>
                      <option value='technology'>Technology</option>
                      <option value='travel'>Travel</option>
                      <option value='lifestyle'>Lifestyle</option>
                      <option value='food-cuisine'>Food & Cuisine</option>
                      <option value='health-wellness'>Health & Wellness</option>
                      <option value='fashion'>Fashion</option>
                      <option value='entertainment'>Entertainment</option>
                      <option value='personal-development'>Personal Development</option>
                      <option value='finance'>Finance</option>
                      <option value='education'>Education</option>
                      <option value='sports'>Sports</option>
                      <option value='business'>Business</option>
                      <option value='marketing'>Marketing</option>
                      <option value='arts-culture'>Arts & Culture</option>
                      <option value='environment'>Environment</option>
                      <option value='agriculture'>Agriculture</option>
                      <option value='politics'>Politics</option>
                      <option value='science'>Science</option>
                      <option value='food-drink'>Food & Drink</option>
                      <option value='music'>Music</option>
                      <option value='technology-gadgets'>Technology Gadgets</option>
                      <option value='history'>History</option>
                      <option value='travel-guides'>Travel Guides</option>
                      <option value='family-parenting'>Family & Parenting</option>
                      <option value='career'>Career</option>
                      <option value='philosophy'>Philosophy</option>
                      <option value='religion-spirituality'>Religion & Spirituality</option>
                    </select>
                  </fieldset>
                </div>

                <div className="w-full mx-auto">
                  <label for="example1" className="block mb-1 text-sm font-medium text-gray-700">Update post image</label>
                  <input id="example1" name="blogimage" onChange={handleImageChange} type="file" className="block w-full mt-2 text-sm file:mr-4 file:rounded-md file:border-0 file:bg-black file:py-2 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-60" accept='image/*' />
                </div>


                {selectedphoto &&
                  <div className=''>
                    <Image className='w-fill h-[50vh] object-cover rounded-lg' src={selectedphoto} height={500} width={500} alt='' />
                  </div>
                }


                <div className='my-10 h-[50vh] pb-16 pt-6'>
                  <label htmlFor='longDescription' className='block mb-2 text-sm font-medium text-gray-900'>
                    Post Content
                  </label>
                  <ReactQuill
                    theme="snow"
                    className='w-full h-full text-sm rounded-lg'
                    value={longdescription}
                    onChange={handleChange}
                  />
                </div>
                <ReactiveButton
                  buttonState={state}
                  idleText="Publish"
                  loadingText="Loading"
                  successText="Updated successfully"
                  errorText="Unable to update"
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
