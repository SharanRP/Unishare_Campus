import React from 'react';
import { features2 } from '../constants';
import styles, { layout } from '../style';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

const FeatureCard = ({ icon, title, content, index }) => {
  return (
    <div
      className={`flex flex-row p-6 rounded-[20px] ${
        index !== features2.length - 1 ? 'mb-6' : 'mb-0'
      } feature-card`}
    >
      <div
        className={`w-[64px] h-[64px] rounded-full ${styles.flexCenter} bg-dimBlue`}
      >
        <img src={icon} alt="icon" className="w-[50%] h-[50%] object-contain" />
      </div>
      <div className="flex-1 flex flex-col ml-3">
        <h4 className="font-poppins font-semibold text-white text-[18px] leading-[23px] mb-1">
          {title}
        </h4>
        <p className="font-poppins font-normal text-dimWhite text-[16px] leading-[24px] mb-1">
          {content}
        </p>
      </div>
    </div>
  );
};

const Features2 = () => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate('/features');
  };
  return (
    <section id="features" className={`${layout.section} flex-between gap-10`}>
      <div className={`${layout.sectionImg} flex-col mr-5`}>
        {features2.map((feature, index) => (
          <FeatureCard key={feature.id} {...feature} index={index} />
        ))}
      </div>
      <div className={layout.sectionInfo}>
        <h2 className={styles.heading2}>Explore other features</h2>
        <p className={`${styles.paragraph} max-w-[470px] mt-5 text`}>
          Explore our platform's capabilities, including Viva Chatbot for
          instant assistance, an extensive library of Blogs for insights, and
          interactive Maps for easy navigation. Our platform ensures seamless
          user experiences and unparalleled convenience.
        </p>
        <div className="flex justify-end w-[550px]">
          <Button
            styles="mt-10"
            buttonCaption="Explore Features"
            onClick={handleButtonClick}
          />
        </div>
      </div>
    </section>
  );
};

export default Features2;
