import React from 'react';
import { community } from '../assets';
import { useNavigate } from 'react-router-dom';

const FixedButton = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-[100px] right-[40px] cursor-pointer z-[1000000]">
      {/* <button onClick={() => navigate('/features/community')}>
        <img src={community} alt="" className="w-[65px]" />
      </button> */}
    </div>
  );
};

export default FixedButton;
