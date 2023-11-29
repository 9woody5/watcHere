import React, {useState} from 'react';
import {DeleteModal} from './Modals';
import * as Fetchers from './Fetchers';

function ReviewButtons({reviewId, token}){
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };
  const handleDelete = (reviewId) => {
    Fetchers.callReviewReportAPI(reviewId, token);
    alert(`신고완료하였습니다!`);
    closeModal();
  };

  return (
  <div className='' >
    <button className='m-3 bg-orange-500 hover:bg-orange-500/60 text-white font-bold py-2 px-4 rounded'
    onClick={openModal}>신고하기</button>
    <DeleteModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        onDelete={()=>handleDelete(reviewId)}
      />
  </div>)
}

export default ReviewButtons;