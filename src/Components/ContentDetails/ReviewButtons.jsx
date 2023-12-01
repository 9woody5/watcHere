import React, {useState} from 'react';
import {useRecoilValue, useSetRecoilState } from "recoil";
import {DeleteModal} from './Modals';
import * as Fetchers from './Fetchers';

import { reviewsState, reviewFilterState, reviewPageState } from "../../Common/CommonAtom";
import * as contentReformatData from './refomatData';

function ReviewButtons({reviewId, token, id, contentType}){
  const reviewFilter = useRecoilValue(reviewFilterState);
  const page = useRecoilValue(reviewPageState);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const setReviews = useSetRecoilState(reviewsState);

  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };
  const handleDelete = (reviewId) => {
    alert(`신고완료하였습니다!`);
    Fetchers.callReviewReportAPI(reviewId, token)
    .then(() => {
      Fetchers.callGetReviewsContentAPI(contentType, id, page, reviewFilter)
      .then(({data})=>{
        const reformattedReviews = contentReformatData.reformatReviewData(data.reviews.content);
        setReviews(reformattedReviews)
      })}
    );
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