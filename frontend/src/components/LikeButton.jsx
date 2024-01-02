import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

const LikeButton = () => {
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

    function handleClick() {
        if(!isLiked) {
            setLikes(likes => likes+1);
        }
        setIsLiked(true);
    }
  return (
    <div className='flex justify-center items-center gap-1.5 mr-2'>
        <FontAwesomeIcon icon={faHeart} className={`heart ${isLiked ? 'text-[#ff69b4]' : 'hover:text-white'}  cursor-pointer text-lg`} onClick={() => handleClick()} />
        <span className='num text-xs'>{likes} </span>
    </div>
  )
}

export default LikeButton