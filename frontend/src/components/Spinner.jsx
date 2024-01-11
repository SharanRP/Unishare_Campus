import React, { useState, useEffect } from 'react';

const Spinner = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setVisible(false);
    }, 1000); // Set the minimum duration in milliseconds (1 second in this example)

    return () => {
      clearTimeout(timeoutId);
    };
  }, []); // Run this effect only once when the component mounts

  return (
    <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-primary bg-opacity-75 ${visible ? '' : 'hidden'}`}>
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
    </div>
  );
};

export default Spinner;
