import React, { useState } from 'react';
import {ReviewInputModal as ModificationModal, DeletionModal} from './Modals';
import * as Fetchers from './Fetchers';


function MyReviewButtons({id, review, token}){
  const {reviewId, text, score} = review

  const [userScore, setUserScore] = useState(review.score);
  const [userReview, setUserReview] = useState(review.text);

  const [modificationModalIsOpen, setModificationModalIsOpen] = useState(false);
  const [deletionModalIsOpen, setDeletionModalIsOpen] = useState(false);

  // ModificationModal 관련
  const handleUserScore = (userScore) => {
    setUserScore(userScore);
  }
  const handleUserReview = (userReview) => {
    setUserReview(userReview);
  }

  const openModificationModal = () => {
    setModificationModalIsOpen(true);
  };
  const closeModificationModal = () => {
    setModificationModalIsOpen(false);
  };
  const handleSubmit = () => {
    console.log('호로로롷',userReview, userScore, reviewId, id)
    if(!userScore){
      alert('점수를 넣어주세요! 🫨');
    } 
    else if(!userReview){
      alert('리뷰를 작성해주세요! 😲');
    }
    else{
      alert('리뷰수정 완료하였습니다! 😁');
      Fetchers.callPutReviewsAPI(userReview, userScore, id, reviewId, token);
      closeModificationModal();
      window.location.reload(true);
    }
  };

  // deletionModal 관련 
  const openDeletionModal = () => {
    setDeletionModalIsOpen(true);
  };
  const closeDeletionModal = () => {
    setDeletionModalIsOpen(false);
  };
  const handleDelete = (reviewId, token) => {
    Fetchers.callDeleteReviewsAPI(reviewId, token);
    alert(`삭제완료하였습니다!`);
    closeDeletionModal();
    window.location.reload(true);

  };

  return (
    <div>
      <div className='flex' >
        <button className='m-3 bg-green-500 hover:bg-green-500/60 text-white font-bold py-2 px-4 rounded'
        onClick={openModificationModal}>수정하기</button>
        <button className='m-3 bg-red-500 hover:bg-red-500/60 text-white font-bold py-2 px-4 rounded'
        onClick={openDeletionModal}>삭제하기</button>
      </div>
      <ModificationModal
        isOpen={modificationModalIsOpen}
        onRequestClose={closeModificationModal}
        onSubmit={handleSubmit}
        handleUserScore={handleUserScore}
        handleUserReview={handleUserReview}
        initialScore={score}
        initialReview={text}
      />
      <DeletionModal
        isOpen={deletionModalIsOpen}
        onRequestClose={closeDeletionModal}
        onDelete={()=>handleDelete(reviewId, token)}
      />
  
    </div>
  )
}



export default MyReviewButtons;