import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { formatDistance, subDays } from 'date-fns';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import LikeButton from './LikeButton';
import styles from '../style';

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

  const handleShare = () => {
    alert(`Share post with ID ${id}`);
  };

  return (
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
  );
};

export default CustomCard;
