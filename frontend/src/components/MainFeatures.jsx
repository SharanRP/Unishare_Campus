import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../style';
import PointerCal from './PointerCal';
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
  easing: 'cubic-bezier(0.68, -0.55, 0.27, 1.55)',
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
const tagStyles = {
  button1: 'text-purple-300',
  button2: 'text-cyan-300',
  button3: 'text-green-300',
  button4: 'text-purple-400',
  button5: 'text-pink-400 ',
  button6: 'text-teal-200',
};

const FeatureCard = ({ title, tag, info, buttontext, style, tagStyle, page }) => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate(page);
  };

  return (
    <div className="card1 max-w-[380px] p-3 flex flex-col bg-clip-border rounded-xl bg-gradient-to-tr from-gray-700 via-gray-900 to-black shadow-md">
      <div className={`heading w-full mb-3 `}>
        <h3 className="text-3xl font-semibold font ">{title}</h3>
      </div>
      <div className="tag mb-1">
        <p className={`text-[0.8rem] ${tagStyle}`}>{tag}</p>
      </div>
      <div className="info mb-[4rem] md:h-[100px]">
        <p className={`${styles.paragraph} text-[1.1rem]`}>{info}</p>
      </div>
      <div className="function">
        <button
          className={`mx-auto left-1/4 relative inline-flex items-center justify-center p-0.5 mb-3 me-2 overflow-hidden text-lg font-medium text-gray-900 rounded-lg group ${style}`}
          onClick={() => handleButtonClick(page)}
        >
          <span className="relative px-3 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            {buttontext}
          </span>
        </button>
      </div>
    </div>
  );
};

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
          <div className={`two-one flex flex-col gap-10 sm:flex-row mb-[70px]`}>
            <Tilt options={defaultOptions}>
              <div className="bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 p-[1px] rounded-xl">
                <FeatureCard
                  title="Pointer Calculator"
                  tag="#Grades"
                  info="Curious about your college grades? Our swift SPI Calculator makes it a breeze to calculate your SPI in minutes."
                  buttontext="Calculate SPI 📊"
                  style={buttonStyles.button1}
                  tagStyle={tagStyles.button1}
                  page="/features/pointer-calculator"
                />
              </div>
            </Tilt>
            <Tilt options={defaultOptions}>
              <div className="bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 p-[1px] rounded-xl">
                <FeatureCard
                  title="PYQ Papers"
                  tag="#Pyq"
                  info="Uncover triumph in every semester with our extensive stash of Previous Year Question Papers."
                  buttontext="View Papers 📑"
                  style={buttonStyles.button2}
                  tagStyle={tagStyles.button2}
                  page="/features/previous-year-papers"
                />
              </div>
            </Tilt>
            <Tilt options={defaultOptions}>
              <div className="bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 p-[1px] rounded-xl">
                <FeatureCard
                  title="Viva Chatbot"
                  tag="#Viva"
                  info="Viva-ready in a chat! Engage with Viva Chatbot, your ultimate prep companion. Get ready now!"
                  buttontext="Start Chat 💬"
                  style={buttonStyles.button3}
                  tagStyle={tagStyles.button3}
                  page="/features/chat-bot"
                />
              </div>
            </Tilt>
          </div>
          <div className={`two-two flex flex-col gap-10 sm:flex-row`}>
            <Tilt options={defaultOptions}>
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 p-[1px] rounded-xl">
                <FeatureCard
                  title="College Events"
                  tag="#Events"
                  info="Discover upcoming events and engaging extracurricular activities with our Calendar, ensuring you never miss a moment of enrichment."
                  buttontext="Explore Events 📅"
                  style={buttonStyles.button4}
                  tagStyle={tagStyles.button4}
                  page="/features/college-events"
                />
              </div>
            </Tilt>
            <Tilt options={defaultOptions}>
              <div className="bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 p-[1px] rounded-xl">
                <FeatureCard
                  title="UniHub Community"
                  tag="#Community"
                  info="Connect, share, shape - Join UniHub Community, where vibrant conversations ignite change. Join now!"
                  buttontext="Join Community 🌐"
                  style={buttonStyles.button5}
                  tagStyle={tagStyles.button5}
                  page="/features/community"
                />
              </div>
            </Tilt>
            <Tilt options={defaultOptions}>
              <div className="bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 p-[1px] rounded-xl">
                <FeatureCard
                  title="Lost and Found"
                  tag="#Rediscovery"
                  info="Recover your belongings seamlessly with Lost and Found. "
                  buttontext="Find Items 🔍"
                  style={buttonStyles.button6}
                  tagStyle={tagStyles.button6}
                  page="/LostandFound"
                />
              </div>
            </Tilt>
          </div>
        </div>
        <div
          className={`three text-[50px] py-6 w-full ${styles.marginY} text-center`}
        >
          <h1
            id="typing-text"
            className="heroHeading font-poppins font-semibold text-[52px] md:text-[58px] lg:text-[68px] text-white ss:leading-[100.8px] leading-[75px]"
          >
            UniHub - Ignite, Connect, Excel!
          </h1>
        </div>
      </div>
    </section>
  );
};

export default MainFeatures;
