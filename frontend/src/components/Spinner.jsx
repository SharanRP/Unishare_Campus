import React, { useState, useEffect } from 'react';

const Spinner = () => {
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-primary`}
    >
      <div className="w-16 h-16 border-8 border-dashed rounded-full animate-spin border-blue-600"></div>
    </div>
  );
};

export default Spinner;
