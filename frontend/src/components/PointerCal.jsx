import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Main from './Main';
import '../index.css';

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
    <div className='flex flex-col items-center justify-center min-h-[400px] mx-auto'>
      <ThemeProvider theme={theme}>
        <h1 className=' styles font-extrabold text-transparent bg-clip-text bg-gradient-to-tr from-gray-800 via-blue-900 to-black text-4xl' style={{fontFamily: 'Signika Negative'}}>VJTI Pointer Calculator</h1>
        <div className='app-wrapper'>
          <Main />
        </div>
      </ThemeProvider>
    </div>
  );
}
