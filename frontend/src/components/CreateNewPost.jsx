import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';
import { LoadingContext } from '../Context/LoadingContext';
import { greenCheck } from '../assets';

const CreateNewPost = () => {
  const [state, setState] = useState({
    title: '',
    content: '',
    image: null,
  });

  const [error, setError] = useState(null);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const { loadingState, setIsLoadingState } = useContext(LoadingContext);

  const navigate = useNavigate();

  const createNewPost = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoadingState(true);

    const formData = new FormData();
    for (const key in state) {
      if (state.hasOwnProperty(key)) {
        console.log(key, state[key]);
        formData.append(key, state[key]);
      }
    }

    try {
      const response = await fetch('http://localhost:5000/api/blogs', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem('userInfo')).token
          }`,
        },
      });
      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
      } else {
        console.log('Post created successfully!');
        setState((prev) => {
          const newState = {};
          Object.keys(prev).forEach((key) => {
            if (key === 'image') {
              newState[key] = null;
            } else {
              newState[key] = '';
            }
          });
          return newState;
        });
        setIsModalVisible(true);
      }
    } catch (error) {
      console.error('Error during post creation:', error);
      setError('An unexpected error occurred.');
    } finally {
      setIsLoadingState(false);
    }
  };

  const handleChange = (e) => {
    setState((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  console.log(state);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setState((prevState) => ({
      ...prevState,
      image: file,
    }));
  };

  return (
    <>
      {loadingState && <Spinner />}
      <div
        id="popup-modal"
        tabIndex="-1"
        className={`${
          isModalVisible ? '' : 'hidden'
        } fixed flex z-50 justify-center items-center w-full md:inset-0 max-h-full backdrop-blur-xs`}
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative rounded-lg bg-gray-700">
            <div className="p-4 md:p-5 text-center">
              <img
                className="h-[50px] w-[50px] mx-auto mb-5"
                src={greenCheck}
                alt=""
              />
              <h3 className="mb-5 text-lg font-semibold font-poppins text-white">
                Blog Submitted Successfully!
              </h3>
              <button
                onClick={() => navigate('/blogs')}
                type="button"
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2"
              >
                Go to Blogs
              </button>
            </div>
          </div>
        </div>
      </div>
      <section className="px-10 my-16">
        <form className="py-4 border rounded-[30px] max-w-[1080px] mx-auto">
          <div className="p-10 mx-auto text-gray-400">
            <div className="border-b border-gray-400 pb-12">
              <h1 className="text-5xl font-poppins font-bold tracking-wider">
                Enter the Blog Details
              </h1>

              <div className="mt-10 grid gap-x-6 sm:grid-cols-6">
                <div className="col-span-12 ">
                  <div className="mb-7">
                    <label className="block text-md font-poppins font-medium leading-6 text-gray-400 ml-2">
                      Title
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300">
                      <input
                        type="text"
                        name="title"
                        className="p-3 pl-5 w-full text-md placeholder:text-sm text-gray-100 bg-transparent hover:bg-gray-500 hover:bg-opacity-10 focus:bg-gray-500 focus:bg-opacity-10 rounded-lg border border-gray-300 font-poppins"
                        placeholder="Enter the Heading"
                        value={state.title}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <div className="mb-7">
                      <label className="block text-md font-poppins font-medium leading-6 text-gray-400 ml-2">
                        Upload Image
                      </label>
                      <input
                        className="block mt-1 p-3 pl-5 w-full text-md placeholder:text-sm text-gray-100 bg-transparent hover:bg-gray-500 hover:bg-opacity-10 focus:bg-gray-500 focus:bg-opacity-10 rounded-lg border border-gray-300 font-poppins"
                        aria-describedby="file_input_help"
                        id="file_input"
                        type="file"
                        onChange={handleImageChange}
                        required
                        name="image"
                      />
                      <p
                        className="mt-1 text-xs ml-2 text-gray-500 dark:text-gray-300"
                        id="file_input_help"
                      >
                        SVG, PNG, JPG (MAX. 800x400px).
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-span-12">
                  <label className="block text-md font-poppins font-medium leading-6 text-gray-400 ml-2">
                    Markdown content
                  </label>
                  <textarea
                    onChange={handleChange}
                    value={state.content}
                    rows="15"
                    name="content"
                    className="mt-1 p-5 pl-5 w-full text-md placeholder:text-sm text-gray-100 bg-transparent hover:bg-gray-500 hover:bg-opacity-10 focus:bg-gray-500 focus:bg-opacity-10 rounded-lg border border-gray-300 font-poppins"
                    placeholder="Write your thoughts here..."
                    required
                  ></textarea>
                </div>
              </div>
            </div>
            {error && <div className="error">{error}</div>}
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="button"
                className="text-sm font-semibold leading-6 text-gray-400 hover:text-gray-300"
                onClick={() => navigate('/blogs')}
              >
                Cancel
              </button>
              <button
                onClick={createNewPost}
                type="button"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Upload
              </button>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default CreateNewPost;
