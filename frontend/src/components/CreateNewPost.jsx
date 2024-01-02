import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the styles
import Footer from './Footer';
import styles from '../style';

const CreateNewPost = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [selectedImage, setSelectedImage] = useState()

  function createNewPost(e) {
    const data = new FormData();
    data.set('title', title)
    data.set('content', content)
    data.set('image', selectedImage)

  }

  console.log(selectedImage);

  // Define custom styles for React Quill
  const quillStyles = {
    // border: '1px solid #ccc', // Add any custom border styles
    borderRadius: '8px',      // Add border-radius for rounded corners
    minHeight: '200px',       // Set a minimum height
    color: '#333',             // Set the text color
    backgroundColor: '#fff',   // Set the background color
  };

  return (
    <>
      <section className='px-10 my-16'>
        <form onSubmit={createNewPost} action="" className='py-4 border rounded-[30px] max-w-[1080px] mx-auto' on>
          <div className='p-10 mx-auto text-gray-400'>
            <div className='border-b border-gray-400 pb-12'>
              <h1 className='text-4xl font-poppins font-bold tracking-wider'>Enter the Blog Details</h1>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-12">
                  <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-400">
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
                      onChange={e => setTitle(e.target.value)}
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-400">
                    About
                  </label>
                  <ReactQuill
                    className='rounded mt-2'
                    style={quillStyles}
                    value={content}
                    onChange={newValue => setContent(newValue)}
                  />
                </div>

                <div className="col-span-full">
                  <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-400">
                    Cover photo
                  </label>
                  <div className="mt-2 flex justify-center rounded-lg border-2 border-dashed border-gray-400/50 px-6 py-10">
                    <div className="text-center">
                      <div className="mt-4 flex text-sm leading-6 text-gray-400">
                        <label
                          htmlFor="file-upload"
                          className="px-1 relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500 text-xs my-auto py-1"
                        >
                          <span>Upload a file</span>
                          <input value={selectedImage} onChange={(e) => setSelectedImage(e.target.files[0])} id="file-upload" name="file-upload" type="file" className="sr-only" />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs leading-5 text-gray-400">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button type="button" className="text-sm font-semibold leading-6 text-gray-400 hover:text-gray-300">
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Upload
              </button>
            </div>
          </div>
        </form>
      </section>
      <div className={`${styles.marginX}`}>
        <Footer />
      </div>
    </>
  );
};

export default CreateNewPost;
