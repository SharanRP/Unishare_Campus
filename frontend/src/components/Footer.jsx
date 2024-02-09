import React from 'react';
import styles from '../style';
import { unihub } from '../assets';
import { footerLinks, socialMedia } from '../constants';

const Footer = () => {
  return (
    <section className={`${styles.flexCenter} pt-16 flex-col`}>
      <div className={`${styles.flexStart} md:flex-row flex-col mb-8 w-full`}>
        <div className="flex-[1] flex flex-col justify-start mr-10">
          <a href="/" className="cursor-pointer">
            <img
              src={unihub}
              alt="unnihyb"
              className="sm:w-[187.32px] sm:h-[66.84px] w-[131.124px] h-[46.788px]"
            />
          </a>
          <p className={`${styles.paragraph} mt-4 max-w-[312px]`}>
            A new way to navigate academic journeys.
          </p>
        </div>

        <div className="flex-[1.5] w-full flex flex-row justify-between flex-wrap md:mt-0 mt-10">
          {footerLinks.map((footerlink) => (
            <div
              key={footerlink.title}
              className={`flex flex-col ss:my-0 my-4 min-w-[150px]`}
            >
              <h4 className="font-poppins font-medium text-[18px] leading-[27px] text-white">
                {footerlink.title}
              </h4>
              <ul className="list-none mt-4">
                {footerlink.links.map((link, index) => (
                  <li
                    key={link.name}
                    className={`font-poppins font-normal text-[16px] leading-[24px] text-dimWhite hover:text-secondary cursor-pointer ${
                      index !== footerlink.links.length - 1 ? 'mb-4' : 'mb-0'
                    }`}
                  >
                    {link.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full flex justify-between items-center md:flex-row flex-col pt-6 border-t-[1px] border-t-[#3F3E45] mb-5 md:mb-3">
        <p className="font-poppins font-normal text-center text-[18px] leading-[27px] text-white">
          Copyright Ⓒ 2023 UniHub. All Rights Reserved.
        </p>

        <div className="flex flex-row md:mt-0 mt-6">
          {socialMedia.map((social, index) => (
            <img
              key={social.id}
              src={social.icon}
              alt={social.id}
              className={`w-[21px] h-[21px] object-contain cursor-pointer ${
                index !== socialMedia.length - 1 ? 'mr-6' : 'mr-0'
              }`}
              onClick={() => window.open(social.link)}
            />
          ))}
        </div>
      </div>
      <div className="">
        <a
          className="flex text-sm items-center justify-around p-4 py-2 mb-4 font-semibold text-purple-100 bg-purple-600 shadow-md focus:outline-none focus:shadow-outline-purple"
          href="https://github.com/SharanRP/Unishare_Campus"
          target="_blank"
          rel="noopener noreferrer"
          style={{ borderRadius: '20% 20% / 90% 5%' }}
        >
          <div className="flex items-center mx-2">
            <svg
              className="w-5 h-5   mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm">Star our project on GitHub</span>
          </div>
          <span className="md:visible hidden">
            View here
            <span dangerouslySetInnerHTML={{ __html: '&RightArrow;' }} />
          </span>
        </a>
      </div>
    </section>
  );
};

export default Footer;
