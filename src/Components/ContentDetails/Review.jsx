import React, {useState} from 'react';
import { AiFillStar } from 'react-icons/ai';
import {DeleteModal} from './Modals';
import * as Fetchers from './Fetchers';

function Review({review, id}) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };
  const handleDelete = (id) => {
    Fetchers.callReviewReportAPI(id);
    alert(`${id}를 신고완료하였습니다!`);
    closeModal();
  };
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
        <div className='' >
          <button className='m-3 bg-orange-500 hover:bg-orange-500/60 text-white font-bold py-2 px-4 rounded'
          onClick={openModal}
          >신고하기</button>
        </div>
      </div>

      <DeleteModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        onDelete={()=>handleDelete(id)}
      />

    </div>
  )
}

export default Review;