import React, {useState, useEffect} from 'react';
import {ReviewInputModal} from './Modals';
import * as contentFakeData from './createFakerData';
import Review from './Review';

function ReviewInfo({id}) {
  // 어떻게 API가 나올지를 모르니 state는 조금 있다가 분배?
  const [reviews, setReviews] = useState([]);
  const [reviewFilter, setReviewFilter] = useState('base');

  const checkReviewTabActive = (reviewTab) =>{
    return reviewFilter === reviewTab? 'tab-active': '';
  }

  let reviewsInfo = {};
  // take related data
  useEffect(()=>{
    setTimeout(()=>{
      reviewsInfo = contentFakeData.createReviewData();
      setReviews(reviewsInfo)
    } , 1000);
  }, [reviewFilter]);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };
  const handleSubmit = () => {
    alert('리뷰등록 완료하였습니다');
    closeModal();
  };

  return (
    <div className='w-full mb-10 flex flex-col text-white'>
      <div className='flex justify-between'>
        <div className='flex items-center mb-10'>
          <div className='align-middle' >리뷰</div>
          <div className="ml-3 tabs tabs-boxed text-white bg-white/20">
            <a className={`tab text-white ${checkReviewTabActive('base')}`} onClick={()=>{setReviewFilter('base')}}>기본순</a>
            <a className={`tab text-white ${checkReviewTabActive('latest')}`} onClick={()=>{setReviewFilter('latest')}}>최신순</a>
            <a className={`tab text-white ${checkReviewTabActive('highest')}`} onClick={()=>{setReviewFilter('highest')}}>별점높은순</a>
            <a className={`tab text-white ${checkReviewTabActive('smallest')}`} onClick={()=>{setReviewFilter('smallest')}}>별점낮은순</a>
            <a className={`tab text-white ${checkReviewTabActive('my-review')}`} onClick={()=>{setReviewFilter('my-review')}}>나의리뷰</a>
          </div>
          {/* <div className='mx-3 dropdown dropdown-right dropdown-end'>
            <button tabIndex={0} className='btn bg-white/10 hover:bg-white/20 text-white'>필터</button>
            <ul tableIndex={0} className='dropdown-content z-[1] menu p-2 shadow bg-white/10 rounded-box w-52'>
              <li><button>최신순</button></li>
              <li><button>별점높은순</button></li>
              <li><button>별점낮은순</button></li>
              <li><button>나의리뷰</button></li>
            </ul>
          </div> */}
          
        </div>
        <div className=''>
          <button className='btn bg-white/10 hover:bg-white/20 text-white' onClick={openModal}>리뷰작성하기</button>
          <ReviewInputModal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            onSubmit={handleSubmit}
          />
        </div>
      </div>

      <div className='mb-3 overflow-x-auto h-80' id='reviews-box'>
        <table className="table table-pin-rows">
          <tbody>
            {reviews.map((review,idx)=>(<tr><td><Review key={`review ${String(idx)}`} review={review} /></td></tr>))}
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default ReviewInfo;