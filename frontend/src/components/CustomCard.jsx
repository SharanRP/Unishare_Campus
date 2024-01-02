import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareAlt } from '@fortawesome/free-solid-svg-icons';
import styles from '../style'; // Assuming styles is a valid import
import LikeButton from './LikeButton';
import { format, formatDistance, formatRelative, subDays } from 'date-fns'


const CustomCard = ({ id, title, description, imageUrl }) => {
  const date = formatDistance(subDays(new Date(), 3), new Date(), { addSuffix: true })
  const truncatedDescription = description.substring(0, 400) + ' . . .';

  const handleShare = (id) => {
    // Implement your share functionality here
    alert(`Share post with ID ${id}`);
  };

  return (
    <section className={`${styles.cardContainer} max-w-[1080px] mt-16 p-[10px] bg-gradient-to-b from-sky-950 from-60% to-black rounded-[1rem] bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-30 hover:outline-cyan-700 hover:out line-solid outline-none outline-2 box-border`}>
      <div className="relative h-full flex flex-col sm:flex-row p-[10px] pb-0 sm:p-4 m-auto ">
        <img
          src={imageUrl}
          alt={`Image for ${title}`} // Use dynamic alt text
          className="sm:w-1/3 sm:max-w-lg p-auto object-cover rounded-xl bg-clip-border"
        />
        <div className="w-full sm:w-2/3 p-4 sm:mx-4 mt-2 overflow-hidden text-gray-800bg-blue-gray-500 bg-clip-border shadow-blue-gray-500/40">
          <h5 className="block mb-2 text-2xl font-semibold text-gray-100">
            {title}
          </h5>
          <p
            className={`block text-base font-light text-gray-100 ${styles.paragraph}`}
          >
            {truncatedDescription}
          </p>
        </div>
      </div>
      <div className="p-6 pt-0 flex justify-between items-end">
        <div className="w-auto text-dimWhite flex flex-nowrap items-center justify-center gap-2 text-xs font-extralight font-sans">
          <LikeButton />
          <div className="ss:block hidden">x min read &nbsp; &#x2022;</div>
          <div className="xs:block hidden">
            {date}{' '}
            &nbsp; &#x2022;
          </div>
          <div>
            <FontAwesomeIcon icon={faShareAlt} style={{ cursor: 'pointer' }} onClick={() => handleShare(id)} className='text-[20px] hover:text-white' />
          </div>
        </div>
        <Link to={`/blogs/${id}`}>
          <button
            className="py-4 px-6 bg-blue-gradient font-poppins font-medium text-[18px] text-primary outline-none rounded-[20px]"
            type="button"
            data-ripple-light="true"
          >
            Read More
          </button>
        </Link>
      </div>
    </section>
  );
};

export default CustomCard;
