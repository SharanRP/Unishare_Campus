
import React from 'react';
import { Link } from 'react-router-dom';

const CustomCard = ({ id, title, description, imageUrl }) => {
  return (
    <div className="mt-16 my-36 relative text-gray-700 w-full bg-gradient-to-b from-sky-950 to-black p-7 mr-12 rounded-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-30 shadow-[0_20px_50px_rgba(8,_112,_184,_0.5)]">
      <div className="relative h-full flex p-4 m-auto">
        <img
          src={imageUrl}
          alt="img-blur-shadow"
          className="w-1/3 h-3/4 p-auto m-auto object-cover rounded-xl bg-clip-border"
        />
        <div className="w-2/3 p-4 mx-4 mt-2 overflow-hidden text-gray-800 shadow-lg rounded-xl bg-blue-gray-500 bg-clip-border shadow-blue-gray-500/40">
          <h5 className="block mb-2 font text-4xl antialiased font-semibold leading-snug tracking-normal text-gray-100">
            {title}
          </h5>
          <p className="block font-sans text-base antialiased font-light leading-relaxed text-gray-100">
            {description}
          </p>
        </div>
      </div>
      <div className="p-6 pt-0 flex justify-end items-end">
        <Link to={`/blog/${id}`}>
          <button
            className="py-4 px-6 bg-blue-gradient font-poppins font-medium text-[18px] text-primary outline-none rounded-[20px]"
            type="button"
            data-ripple-light="true"
          >
            Read More
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CustomCard;
