import React, { forwardRef } from 'react';

const Button = forwardRef(({ styles, buttonCaption, onClick }, ref) => {
  return (
    <button
      ref={ref}
      type="button"
      className={`py-4 px-6 bg-blue-gradient font-poppins font-medium text-[18px] text-primary outline-none rounded-[20px] ${styles}`}
      onClick={onClick}
    >
      {buttonCaption}
    </button>
  );
});

export default Button;
