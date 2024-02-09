import React from 'react';
import { feedback } from '../constants';
import styles from '../style';
import FeedbackCard from './FeedbackCard';

const Testimonials = () => {
  return (
    <section
      id="clients"
      className={`${styles.paddingY} ${styles.flexCenter} flex-col relative`}
    >
      <div className="absolute z-[0] w-[60%] h-[60%] -right-[60%] rounded-full blue__gradient" />
      <div className="w-full flex md:flex-row flex-col justify-around items-center sm:mb-16 mb-6 relative z-[1] px-20">
        <h1 className={`sm:${styles.heading2} text-[2rem]`}>
          Discover Student Voices
        </h1>
        <div className="md:mt-0 mt-6">
          <p className={`${styles.paragraph} text-left max-w-[600px]`}>
            Gain valuable insights and authentic experiences directly from the
            students themselves.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap sm:justify-center justify-center w-full feedback-container relative z-[1]">
        {feedback.map((card, index) => (
          <FeedbackCard key={card.id} {...card} />
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
