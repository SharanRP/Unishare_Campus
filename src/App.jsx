import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styles from './style'; // Make sure this import is needed
import './index.css';
import { Navbar, Hero, Stats, Features, Features2, Testimonials, CTA, Footer, Contact, Home, Blog } from './components/index';
import FixedButton from './components/FixedButton';

const App = () => {
  const [isvisible, setIsVisible] = useState(false);

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
    <Router>
      <div className='bg-primary w-full overflow-hidden'>
        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <Navbar />
          </div>
        </div>

        {isvisible && <FixedButton/>}

        {/* <div className={`bg-primary ${styles.flexStart}`}>
          <div className={`${styles.boxWidth}`}>
            <Hero />
          </div>
        </div>

        <div className={`bg-primary ${styles.paddingX} ${styles.flexStart}`}>
          <div className={`${styles.boxWidth}`}>
            <Stats />
            <Features />
            <Features2 />
            <Testimonials /> 
            <CTA />
            <Footer /> 
            <Routes> 
                <Route exact path='/' element={<Home />} />
                <Route exact path='/about' element={<About />} />
                <Route exact path='/contact' element={<Contact />} />
            </Routes>
          </div>
        </div> */}
        <Routes>
          <Route exact path='/home' element={<Home />} />
          <Route exact path='/blog' element={<Blog />} />
          <Route exact path='/contact' element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;



