import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { close, unihub, menu } from '../assets';
import { navLinks } from '../constants';

const Navbar = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <nav className='w-full flex justify-between items-center navbar py-6 z-10'>
      <Link to='/' className='cursor-pointer'>
        <img
          src={unihub}
          alt="UniHub"
          className='sm:w-[187.32px] sm:h-[66.84px] w-[131.124px] h-[46.788px]'
        />
      </Link>
      <ul className="list-none hidden justify-end items-center sm:flex flex-1">
        {navLinks.map((item, index) => (
          <li
            key={item.id}
            className={`font-poppins font-normal cursor-pointer text-[16px] text-white ${(index === navLinks.length - 1) ? 'mr-0' : 'mr-10'}`}
          >
            <Link to={`/${item.id}`}>{item.title}</Link>
          </li>
        ))}
      </ul>

      <div className='sm:hidden flex flex-1 justify-end items-center'>
        <img
          src={toggle ? close : menu}
          alt="menu"
          className='w-[28px] h-[28px] object-contain cursor-pointer'
          onClick={() => setToggle(prev => !prev)}
        />
        <div className={`${toggle ? 'flex' : 'hidden'} bg-black-gradient absolute z-[10000] top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar p-6`}>
          <ul className="list-none flex justify-end items-center flex-col z-10">
            {navLinks.map((item, index) => (
              <li
                key={item.id}
                className={`font-poppins font-normal cursor-pointer text-[16px] text-white ${(index === navLinks.length - 1) ? 'mr-0' : 'mr-10 mb-4'}`}
              >
                <Link to={`/${item.id}`}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
    
  );
};

export default Navbar;