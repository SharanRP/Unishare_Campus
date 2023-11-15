import React from 'react';
import { Link } from 'react-router-dom';

const CustomCard = ({ id, title, description, imageUrl }) => {
  return (
    <section className="w-full mt-16 mb-8 p-[10px] sm:p-7 mr-12 bg-gradient-to-b from-sky-950 to-black rounded-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-30 shadow-[0_20px_50px_rgba(8,_112,_184,_0.5)]">
      <div className="relative h-full flex flex-col sm:flex-row p-[10px] sm:p-4 m-auto ">
        <img
          src={imageUrl}
          alt="img-blur-shadow"
          className="sm:w-1/3 sm:max-w-lg p-auto m-auto object-cover rounded-xl bg-clip-border"
        />
        <div className="w-full sm:w-2/3 p-4 sm:mx-4 mt-2 overflow-hidden text-gray-800 shadow-lg rounded-xl bg-blue-gray-500 bg-clip-border shadow-blue-gray-500/40">
          <h5 className="block mb-2 text-2xl font-semibold text-gray-100">{title}</h5>
          <p className="block text-base font-light text-gray-100">{description}</p>
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
    </section>
  );
};

export default CustomCard;
