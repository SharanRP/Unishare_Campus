import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Main from './Main';
import '../index.css';
import books from "../assets/books.json";
import Lottie from 'lottie-react';

const theme = createTheme({
  palette: {
    primary: {
      main: '#8F00FF',
    },
    secondary: {
      main: '#082063',
    },
  },
  typography: {
    fontFamily: ["'Inter'", 'sans-serif'].join(',')
  }
});

export default function PointerCal() {

  return (
    <div className='flex px-6 flex-col items-center justify-center min-h-[400px] mx-auto'>
      <ThemeProvider theme={theme}>
        <h1 className='styles font-extrabold text-transparent bg-clip-text bg-gradient-to-tr from-gray-800 via-blue-900 to-black text-4xl'
        style={{fontFamily:'cursive'}}>
          VJTI Pointer Calculator
        </h1>
        <div className='app-wrapper w-full items-center flex justify-between'>
          {/* Left Lottie Animation */}
          <Lottie
            loop={true}
            animationData={books}
            alt="billing"
            className="w-[30%] h-auto scale-100 relative z-[5]"
          ></Lottie>

          {/* Main Content */}
          <Main className="w-[30%]" />

          {/* Right Lottie Animation */}
          <Lottie
            loop={true}
            animationData={books}
            alt="billing"
            className="w-[30%] h-auto scale-100 relative z-[5]"
          ></Lottie>
        </div>
      </ThemeProvider>
    </div>
  );
}
