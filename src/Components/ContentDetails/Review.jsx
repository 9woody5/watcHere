import React, {useState} from 'react';
import { AiFillStar } from 'react-icons/ai';
import ReviewButtons from './ReviewButtons';
import MyReviewButtons from './MyReviewButtons';

function Review({contentType, review, id, token}) {
  const convertString2Number = (scoreString) => {
    try{
      return parseInt(scoreString);
    }
    catch{
      return 0;
    }
  }

  return (
    <div className='w-full my-4 flex'>

      <div className='w-3/4 flex flex-col'>
        <div className='flex items-center'>
          <img className='w-8 mx-2 rounded-full' src={review.userImg} alt="" />
          <div className='text-lg'>{review.userName}</div>
        </div>
        <div className='my-3 text-base'>{review.text}</div>
        <div className='text-xs'>{String(review.date)}</div>
      </div>
      
      <div className='w-1/4 flex flex-col'>
        <div className=''>{[1,2,3,4,5].map((index)=>(
          <AiFillStar key={`review-socre-star-${index}`} className= {`inline-block text-2xl ${convertString2Number(review.score)>=index? 'text-yellow-200': 'text-white'} text-2xl`} /> ))}
          
        </div>
        {review.isMine?
          <MyReviewButtons id={id}  review={review} token={token} contentType={contentType} /> :
          <ReviewButtons id={id}/>
        }
      </div>
    </div>
  )
}

export default Review;