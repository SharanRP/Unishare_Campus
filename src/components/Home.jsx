import React from 'react'
import styles from '../style';
import { Navbar, Hero, Stats, Features, Features2, Testimonials, CTA, Footer, Contact, Blog } from './index';

const Home = () => {
  return (
    <>
      <div className={`bg-primary ${styles.flexStart}`}>
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
              
            </div>
          </div>
    </>
  )
}

export default Home