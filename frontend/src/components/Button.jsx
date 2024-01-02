import React from 'react'

const Button = ({styles, buttonCaption}) => {
  return (
    <button type='button' className={`py-4 px-6 bg-blue-gradient font-poppins font-medium text-[18px] text-primary outline-none rounded-[20px] ${styles}`}>
      {buttonCaption}
    </button>
  )
}

export default Button