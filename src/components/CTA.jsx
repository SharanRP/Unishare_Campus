import React from 'react';
import styles from '../style';
import Button from './Button';

const CTA = () => {
  return (
    <section className={`${styles.flexCenter} ${styles.marginY} ${styles.padding} sm:flex-row flex-col bg-black-gradient-2 rounded-[20px] box-shadow`}>
      <div className='flex flex-1 flex-col'>
        <h2 className={`${styles.heading2}`}>All-in-One Campus Solution</h2>
        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>Experience a hassle-free university journey and enhance your academic experience with us.</p>
      </div>
      <div className={`${styles.flexCenter} sm:ml-10 ml-0 sm:mt-0 mt-10`}>
        <Button buttonCaption='Sign up now' />
      </div>
    </section>
  );
}

export default CTA;
