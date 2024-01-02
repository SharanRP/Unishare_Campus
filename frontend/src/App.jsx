import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
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
  Blog,
  CreateNewPost
} from './components/index';
import FixedButton from './components/FixedButton';

const App = () => {
  const [isvisible, setIsVisible] = useState(false);
  console.log(window.location.pathname);

  useEffect(() => {
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

        {isvisible && window.location.pathname === '/home' && <FixedButton />}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/blogs" element={<Blog />} />
          <Route exact path="/blogs/create" element={<CreateNewPost />} />
          <Route exact path="/contact" element={<Contact />} />
        </Routes>
      </div>
  );
};

export default App;
