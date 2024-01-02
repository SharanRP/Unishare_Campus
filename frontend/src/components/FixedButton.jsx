import React from 'react';
import { community } from '../assets';

const FixedButton = () => {
  return (
    <div className='fixed bottom-[100px] right-[40px] cursor-pointer z-[1000000]'>
      <a href="/your-link" className='bg-white rounded-full w-[65px]'>
        <img src={community} alt="" className='w-[65px]'/>
      </a>
    </div>
  );
};

export default FixedButton;
