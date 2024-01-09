import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import AuthContextProvider from './Context/AuthContext.jsx';
import LoadingContextProvider from './Context/LoadingContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <LoadingContextProvider>
    <BrowserRouter>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </BrowserRouter>
  </LoadingContextProvider>
);
