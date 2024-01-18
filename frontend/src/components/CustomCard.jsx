import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { formatDistance, subDays } from 'date-fns';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import LikeButton from './LikeButton';
import styles from '../style';
import { ToastContainer, toast } from 'react-toastify';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  PinterestShareButton,
  LinkedinShareButton,
} from 'react-share';
import {
  FacebookIcon,
  LinkedinIcon,
  PinterestIcon,
  WhatsappIcon,
  XIcon,
} from 'react-share';

const CustomCard = ({
  id,
  title,
  description,
  imageUrl = 'https://cdn.pixabay.com/photo/2015/11/06/13/25/blog-1027861_640.jpg',
  isSingle,
}) => {
  const date = formatDistance(subDays(new Date(), 3), new Date(), {
    addSuffix: true,
  });
  const truncatedDescription = isSingle
    ? description
    : `${description?.substring(0, 400)}...`;

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleShare = () => {
    alert(`Share post with ID ${id}`);
    setIsModalVisible(true);
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(`https://UniHub.com/blogs/${id}`);

    toast.success('Copied to Clipboard', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
  };

  return (
    <>
      <div
        className={` ${
          isModalVisible ? '' : 'hidden'
        } fixed flex z-50 justify-center font-poppins items-center md:inset-0 backdrop-blur-xs text-gray-200`}
      >
        <div class="bg-gray-800 w-full mx-4 px-6 py-1 border max-w-[400px] border-gray-200  rounded-xl md:w-1/2 lg:w-1/3">
          <div class="flex justify-between items center border-b border-gray-200 py-3">
            <div class="flex items-center justify-center">
              <p class="text-xl font-bold">Share</p>
            </div>
            <button
              onClick={() => setIsModalVisible(false)}
              class=" cursor-pointer hover:text-gray-300 font-bold text-md text-gray-500 flex items-center justify-center  rounded-full"
            >
              X
            </button>
          </div>

          <div class="my-4">
            <p class="text-sm">Share this link via</p>

            <div className="flex justify-around my-4 gap-2">
              <div className="flex flex-col items-center gap-2">
                <FacebookShareButton url={`https://UniHub.com/blogs/${id}`}>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-xl hover:shadow-blue-500/50 cursor-pointer">
                    <FacebookIcon size={50} round />
                  </div>
                </FacebookShareButton>
                <span className="text-[10px]">Facebook</span>
              </div>

              <div className="flex flex-col items-center gap-2">
                <TwitterShareButton url={`https://UniHub.com/blogs/${id}`}>
                  <div className=" w-12 h-12 rounded-full flex items-center justify-center shadow-xl hover:shadow-white/35 cursor-pointer">
                    <XIcon size={50} round />
                  </div>
                </TwitterShareButton>
                <span className="text-[10px]">X</span>
              </div>

              <div className="flex flex-col items-center gap-2">
                <WhatsappShareButton url={`https://UniHub.com/blogs/${id}`}>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-xl hover:shadow-green-500/50 cursor-pointer">
                    <WhatsappIcon size={50} round />
                  </div>
                </WhatsappShareButton>
                <span className="text-[10px]">Whatapp</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <PinterestShareButton url={`https://UniHub.com/blogs/${id}`}>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-xl hover:shadow-red-500/50 cursor-pointer">
                    <PinterestIcon size={50} round />
                  </div>
                </PinterestShareButton>
                <span className="text-[10px]">Pinterest</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <LinkedinShareButton url={`https://UniHub.com/blogs/${id}`}>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center blue shadow-xl hover:shadow-blue-200/50 cursor-pointer">
                    <LinkedinIcon size={50} round />
                  </div>
                </LinkedinShareButton>
                <span className="text-[10px]">Linkedin</span>
              </div>
            </div>

            <p className="text-sm">Or copy link</p>
            <div className="border-1 border text-xs border-gray-200 rounded-2xl flex items-center mt-2 py-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                className="fill-gray-500 ml-2"
              >
                <path d="M8.465 11.293c1.133-1.133 3.109-1.133 4.242 0l.707.707 1.414-1.414-.707-.707c-.943-.944-2.199-1.465-3.535-1.465s-2.592.521-3.535 1.465L4.929 12a5.008 5.008 0 0 0 0 7.071 4.983 4.983 0 0 0 3.535 1.462A4.982 4.982 0 0 0 12 19.071l.707-.707-1.414-1.414-.707.707a3.007 3.007 0 0 1-4.243 0 3.005 3.005 0 0 1 0-4.243l2.122-2.121z"></path>
                <path d="m12 4.929-.707.707 1.414 1.414.707-.707a3.007 3.007 0 0 1 4.243 0 3.005 3.005 0 0 1 0 4.243l-2.122 2.121c-1.133 1.133-3.109 1.133-4.242 0L10.586 12l-1.414 1.414.707.707c.943.944 2.199 1.465 3.535 1.465s2.592-.521 3.535-1.465L19.071 12a5.008 5.008 0 0 0 0-7.071 5.006 5.006 0 0 0-7.071 0z"></path>
              </svg>

              <input
                className="flex flex-1 text-wrap outline-none bg-transparent break-all"
                type="text"
                placeholder="link"
                value={`https://UniHub.com/blogs/${id}`}
              />

              <div className="bg-gray-800 h-8 w-8 rounded-full flex justify-center items-center mr-1">
                <button
                  className="bg-gray-300 rounded-full h-7 w-7 text-white text-xs flex items-center justify-center p-2 hover:bg-gray-200"
                  onClick={copyUrl}
                >
                  <svg
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    stroke-linejoin="round"
                    stroke-miterlimit="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m6 19v2c0 .621.52 1 1 1h2v-1.5h-1.5v-1.5zm7.5 3h-3.5v-1.5h3.5zm4.5 0h-3.5v-1.5h3.5zm4-3h-1.5v1.5h-1.5v1.5h2c.478 0 1-.379 1-1zm-1.5-1v-3.363h1.5v3.363zm0-4.363v-3.637h1.5v3.637zm-13-3.637v3.637h-1.5v-3.637zm11.5-4v1.5h1.5v1.5h1.5v-2c0-.478-.379-1-1-1zm-10 0h-2c-.62 0-1 .519-1 1v2h1.5v-1.5h1.5zm4.5 1.5h-3.5v-1.5h3.5zm3-1.5v-2.5h-13v13h2.5v-1.863h1.5v3.363h-4.5c-.48 0-1-.379-1-1v-14c0-.481.38-1 1-1h14c.621 0 1 .522 1 1v4.5h-3.5v-1.5z"
                      fill-rule="nonzero"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
      <section
        className={`${styles.cardContainer}  md:w-[800px] lg:w-[1040px] mt-16 p-[7px] bg-gradient-to-b from-sky-950 from-60% to-black rounded-[1rem] bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-30 hover:outline-cyan-700 hover:outline-none outline-2 box-border`}
      >
        <div
          className={`relative h-full flex ${
            isSingle ? 'flex-col' : 'sm:flex-row'
          } p-[10px] pb-0 sm:p-4`}
        >
          <img
            src={imageUrl}
            alt={`Image for ${title}`}
            className="sm:w-1/3 sm:max-w-lg p-auto object-cover rounded-xl bg-clip-border"
          />
          <div
            className={`text-gray-100  ${
              isSingle ? 'w-full' : 'sm:w-2/3'
            }  p-4 py-0 text-[16px] sm:mx-4 overflow-hidden text-gray-800bg-blue-gray-500 bg-clip-border shadow-blue-gray-500/40`}
          >
            <h5 className="block mb-2 text-2xl font-semibold text-gray-100">
              {title}
            </h5>
            <div className="prose">
              <Markdown remarkPlugins={[remarkGfm]}>
                {truncatedDescription}
              </Markdown>
            </div>
          </div>
        </div>
        <div className="px-6 pb-4 pt-0 flex justify-between items-center">
          <div className="w-auto text-dimWhite flex flex-nowrap items-center justify-center gap-2 text-xs font-extralight font-sans mx-[50px]">
            <LikeButton />
            <div className="ss:block hidden font-semibold">
              x min read &nbsp; &#x2022;
            </div>
            <div className="xs:block hidden">{date} &nbsp; &#x2022;</div>
            <div>
              <FontAwesomeIcon
                icon={faShareAlt}
                style={{ cursor: 'pointer' }}
                onClick={handleShare}
                className="text-[20px] hover:text-white"
              />
            </div>
          </div>
          {!isSingle && (
            <Link to={`/blogs/${id}`}>
              <button
                className="py-3 px-6 bg-blue-gradient font-poppins font-medium text-[18px] text-primary outline-none rounded-[20px]"
                type="button"
                data-ripple-light="true"
              >
                Read More
              </button>
            </Link>
          )}
        </div>
      </section>
    </>
  );
};

export default CustomCard;
