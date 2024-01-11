import React, { useState, useContext, useEffect } from 'react';
import Spinner from './Spinner';
import { LoadingContext } from '../Context/LoadingContext';

const CreateNewPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const { loadingState, setIsLoadingState } = useContext(LoadingContext);

  const createNewPost = async (e) => {
    e.preventDefault();
    console.log(title, content);

    try {
      setIsLoadingState(true);
      const response = await fetch('http://localhost:3000/api/blogs', {
        method: 'POST',
        body: JSON.stringify({ title, body: content }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
        },
      });

      if (response.ok) {
        // Handle success, if needed
        console.log('Post created successfully!');
      } else {
        // Handle failure, if needed
        console.error('Failed to create post');
      }
    } catch (error) {
      // Handle errors
      console.error('Error during post creation:', error);
    } finally {
      setIsLoadingState(false);
    }
  };

  useEffect(() => {
    // Your useEffect logic here (if needed)
  }, []); // Dependency array can be adjusted based on your needs

  return (
    <>
      {loadingState && <Spinner />}
      <section className="px-10 my-16">
        <form className="py-4 border rounded-[30px] max-w-[1080px] mx-auto">
          <div className="p-10 mx-auto text-gray-400">
            <div className="border-b border-gray-400 pb-12">
              <h1 className="text-4xl font-poppins font-bold tracking-wider">
                Enter the Blog Details
              </h1>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-12">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium leading-6 text-gray-400"
                  >
                    Title
                  </label>
                  <div className="mt-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300  sm:max-w-md">
                    <input
                      type="text"
                      name="title"
                      id="title"
                      className="ml-4 w-full block flex-1 focus:outline-none border-0 bg-transparent py-1.5 pl-1 text-gray-400 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                      placeholder="Enter the Heading"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium leading-6 text-gray-400"
                  >
                    Markdown content
                  </label>
                  <textarea
                    onChange={(e) => setContent(e.target.value)}
                    value={content}
                    id="message"
                    rows="4"
                    className="mt-2 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Write your thoughts here..."
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="button"
                className="text-sm font-semibold leading-6 text-gray-400 hover:text-gray-300"
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
