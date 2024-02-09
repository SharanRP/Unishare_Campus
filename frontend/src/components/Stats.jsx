import React from 'react';
import styles from '../style';
import { stats } from '../constants';

const Stats = () => {
  return (
    <section className={`${styles.flexCenter} items-center sm:mb-10 mb-6`}>
      {stats.map((stat, index) => (
        <div
          key={stat.id}
          className="flex-1 flex flex-wrap text-center justify-center items-center"
        >
          <h4 className="font-poppins font-semibold xs:text-[40px] text-[30px] xs:leading-[50px] leading-[43px] text-white">
            {stat.value}
          </h4>
          <p className="font-poppins font-normal xs:text-[20px] text-[15px] xs:leading-[25px] leading-[20px] text-white text-gradient uppercase">
            {stat.title}
          </p>
        </div>
      ))}
    </section>
  );
};

export default Stats;
