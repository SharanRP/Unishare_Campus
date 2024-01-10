import React, { useEffect, useState } from 'react';
import styles from '../style';
import PointerCal from './PointerCal';
// import { useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Tilt } from 'react-tilt';

const defaultOptions = {
  reverse: false,
  max: 22,
  perspective: 2000,
  scale: 1,
  speed: 8,
  transition: true,
  axis: null,
  reset: true,
  easing: 'cubic-bezier(0.68, -0.55, 0.27, 1.55)', // Adjust these values for smooth in and out animations
};

const buttonStyles = {
  button1:
    'bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800',
  button2:
    'bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800',
  button3:
    'bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800',
  button4:
    'bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800',
  button5:
    'bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800',
  button6:
    'bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800',
};

const FeatureCard = ({ title, tag, info, buttontext, style }) => {
  const navigateTo = useNavigate();

  const handleButtonClick = () => {
    navigateTo(`/${title.toLowerCase()}`);
  };
  return (
      <div className="card1 max-w-[380px] p-6 flex flex-col bg-clip-border rounded-xl bg-gradient-to-r from-gray-700 via-gray-900 to-black shadow-md">
        <div className="heading w-full mb-3">
          <h3 className="text-3xl font-semibold font">{title}</h3>
        </div>
        <div className="tag mb-1">
          <p>{tag}</p>
        </div>
        <div className="info mb-[4rem] md:h-[100px]">
          <p className="paragraph">{info}</p>
        </div>
        <div className="function">
          <button 
          onClick={handleButtonClick}
          className={`relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-lg font-medium text-gray-900 rounded-lg group ${style} `}>
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              {buttontext}
            </span>
          </button>
        </div>
      </div>

  );
};;


const MainFeatures = () => {
  return (
    <section
      id="featurespage"
      className={`bg-primary ${styles.paddingY} ${styles.paddingX} ${styles.boxWidth} text-white`}
    >
      <div
        className={`outer flex flex-col flex-1 ${styles.paddingX} ${styles.flexCenter} ${styles.boxWidth}`}
      >
        <div className={`one py-6  w-full`}>
          <h1
            id="typing-text"
            className="heroHeading font-poppins font-semibold text-[52px] md:text-[58px] lg:text-[68px] text-white ss:leading-[100.8px] leading-[75px]"
          >
            Elevate Your <span className="text-gradient"> Experience</span> with
            These Features
          </h1>
        </div>
        <div className={`two ${styles.paddingY}`}>
          <div className={`two-one flex flex-col gap-10 sm:flex-row mb-10`}>
            <Tilt options={defaultOptions}>
              <div className="bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 p-[1px] rounded-xl">
                <FeatureCard
                  title="Pointer Calculator"
                  tag="text"
                  info="Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
                    tempore quis minima illum neque"
                  buttontext="Calculate Now"
                  style={buttonStyles.button1}
                />
              </div>
            </Tilt>
            <Tilt options={defaultOptions}>
              <div className="bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 p-[1px] rounded-xl">
                <FeatureCard
                  title="Pointer Calculator"
                  tag="text"
                  info="Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
                  tempore quis minima illum neque"
                  buttontext="Calculate Now"
                  style={buttonStyles.button2}
                />
              </div>
            </Tilt>
            <Tilt options={defaultOptions}>
              <div className="bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 p-[1px] rounded-xl">
                <FeatureCard
                  title="Pointer-Calculator"
                  tag="text"
                  info="Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
                  tempore quis minima illum neque"
                  buttontext="Calculate Now"
                  style={buttonStyles.button3}
                />
              </div>
            </Tilt>
          </div>
          <div className={`two-two flex flex-col gap-10 sm:flex-row`}>
            <Tilt options={defaultOptions}>
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 p-[1px] rounded-xl">
                <FeatureCard
                  title="Pointer-Calculator"
                  tag="text"
                  info="Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
                  tempore quis minima illum neque"
                  buttontext="Calculate Now"
                  style={buttonStyles.button4}
                />
              </div>
            </Tilt>
            <Tilt options={defaultOptions}>
              <div className="bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 p-[1px] rounded-xl">
                <FeatureCard
                  title="Pointer-Calculator"
                  tag="text"
                  info="Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
                  tempore quis minima illum neque"
                  buttontext="Calculate Now"
                  style={buttonStyles.button5}
                />
              </div>
            </Tilt>
            <Tilt options={defaultOptions}>
              <div className="bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 p-[1px] rounded-xl">
                <FeatureCard
                  title="Pointer-Calculator"
                  tag="text"
                  info="Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
                  tempore quis minima illum neque"
                  buttontext="Calculate Now"
                  style={buttonStyles.button6}
                />
              </div>
            </Tilt>
          </div>
        </div>
        <div className={`three text-[50px] py-6 w-full`}>
          Big Heading
        </div>
      </div>
    </section>
  );
};

export default MainFeatures;
