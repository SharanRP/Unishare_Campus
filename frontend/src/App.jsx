import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import styles from './style';
import './index.css';
import {
  Navbar,
  Hero,
  Stats,
  Features,
  Features2,
  Testimonials,
  CTA,
  Footer,
  Contact,
  Home,
  Blogs,
  CreateNewPost,
  Login,
  Signup,
} from './components/index';
import FixedButton from './components/FixedButton';
import { useAuthContext } from './Hooks/useAuthContext';
import RequireAuth from './Hooks/RequireAuth';
import Blog from './components/Blog';

const App = () => {
  const [isvisible, setIsVisible] = useState(false);
  console.log(window.location.pathname);

  const { isAuthenticated } = useAuthContext();

  useEffect(() => {
    if (window.location.pathname !== '/') return;

    const handleScroll = () => {
      setIsVisible(window.scrollY > 200 && window.scrollY < 2350);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="bg-primary w-full overflow-hidden">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>

      {isvisible && window.location.pathname === '/' && <FixedButton />}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/blogs">
          <Route
            index
            element={
              <RequireAuth redirectTo="/login">
                <Blogs />
              </RequireAuth>
            }
          />
          <Route
            path=":id"
            element={
              <RequireAuth redirectTo="/login">
                <Blog />
              </RequireAuth>
            }
          />
        </Route>
        <Route path="/blogs/create" element={<CreateNewPost />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
};

export default App;
