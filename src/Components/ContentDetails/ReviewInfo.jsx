import React, {useState, useEffect} from 'react';
import {useRecoilState } from "recoil";
import {ReviewInputModal} from './Modals';
import * as Fetchers from './Fetchers'; 
import * as contentReformatData from './refomatData';
import Review from './Review';
import { myReviewState ,reviewsState, reviewPageState, reviewFilterState } from "../../Common/CommonAtom";

function ReviewInfo({contentType, id, token}) {
  /* 리뷰 데이터 관련 */
  const [myReviews, setMyReviews] = useRecoilState(myReviewState);
  const [reviews, setReviews] = useRecoilState(reviewsState);
  const [reviewFilter, setReviewFilter] = useRecoilState(reviewFilterState);
  const [page, setPage] = useRecoilState(reviewPageState);

  const checkReviewTabActive = (reviewTab) =>{
    return reviewFilter === reviewTab? 'tab-active': '';
  }

  /* 리뷰 업데이트 관련 */
  const updateMyReviewState = (contentType, id, token) => {
    Fetchers.callGetMyReviewAPI(contentType, id, token)
      .then(({data})=>{
        const reformattedMyReviews = contentReformatData.reformatMyReviewData(data);
        setMyReviews(reformattedMyReviews);
      })
      .catch(()=>{setMyReviews([])});
  }
  const updateReviewsState = (contentType, id, page, reviewFilter) => {
    if (reviewFilter !== 'my-review'){
      Fetchers.callGetReviewsContentAPI(contentType, id, page, reviewFilter)
        .then(({data})=>{
          const reformattedReviews = contentReformatData.reformatReviewData(data.reviews.content);
          setReviews(reformattedReviews)
        })
        .catch(()=>{setReviews([])});
    }
    else{
      setReviews(myReviews);
    }
  }
  useEffect(()=>{
    updateMyReviewState(contentType,id,token);
    updateReviewsState(contentType,id,page, reviewFilter);
  }, [id, token])

  useEffect(()=>{
    updateReviewsState(contentType,id,page, reviewFilter);
  }, [reviewFilter, myReviews]);

  /* 리뷰 작성 관련 */
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [userScore, setUserScore] = useState(null); // userNewScore
  const [userReview, setUserReview] = useState(null);  // userNewReview

  // 각 해당 컴포넌트에서 score와 review를 설정하도록 한다.
  const handleUserScore = (userScore) => {
    setUserScore(userScore);
  }
  const handleUserReview = (userReview) => {
    setUserReview(userReview);
  }

  const openModal = () => {
    if(!token){
      alert('리뷰를 작성하시려면, 로그인을 먼저 해주세요!');
    }
    else if (myReviews.length!==0){
      alert('이미 리뷰가 존재합니다. 리뷰는 컨텐츠 당 하나만 작성가능합니다.\n나의 리뷰에서 리뷰를 수정해보세요! 😲');
    }
    else{
      setModalIsOpen(true);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSubmit = () => {
    if(!userScore){
      alert('점수를 넣어주세요! 🫨');
    } 
    else if(!userReview){
      alert('리뷰를 작성해주세요! 😲');
    }
    else{
      // 리뷰등록처리
      alert('리뷰등록 완료하였습니다! 😁');
      Fetchers.callPostReviewsAPI(contentType, id, userReview, userScore, token)
        .then(()=>{
          updateMyReviewState(contentType,id,token);
        });
      closeModal();
    }
  };

  return (
    <div className='w-full mb-10 flex flex-col text-white'>
      <div className='flex justify-between'>
        <div className='flex items-center mb-10'>
          <div className='align-middle' >리뷰</div>
          <div className="ml-3 tabs tabs-boxed text-white bg-white/20">
            <a className={`tab text-white ${checkReviewTabActive('createdAt')}`} onClick={()=>{setReviewFilter('createdAt')}}>최신순</a>
            <a className={`tab text-white ${checkReviewTabActive('ratingDesc')}`} onClick={()=>{setReviewFilter('ratingDesc')}}>별점높은순</a>
            <a className={`tab text-white ${checkReviewTabActive('ratingAsc')}`} onClick={()=>{setReviewFilter('ratingAsc')}}>별점낮은순</a>
            <a className={`tab text-white ${checkReviewTabActive('my-review')}`} onClick={()=>{setReviewFilter('my-review')}}>나의리뷰</a>
          </div>
          
        </div>
        <div className=''>
          <button className='btn bg-white/10 hover:bg-white/20 text-white' onClick={openModal}>리뷰작성하기</button>
          <ReviewInputModal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            onSubmit={handleSubmit}
            handleUserScore={handleUserScore}
            handleUserReview={handleUserReview}
          />
        </div>
      </div>

      <div className='relative mb-3 overflow-x-auto h-80' id='reviews-box'>
        {/* {loading&&(<div className="absolute loading loading-spinner loading-md "></div>)}  */}
        {reviews.length!=0?
          (<table className="table table-pin-rows">
            <tbody>
              {reviews.map((review,idx)=>(<tr key={`review-${idx}`}><td><Review key={review.reviewId} contentType={contentType} id={id} review={review} token={token} /></td></tr>))}
            </tbody>
          </table>):
          (<div>해당 컨텐츠에 아직 리뷰가 없어요😢 로그인하여, 리뷰를 작성해보세요! </div>)
        }
      </div>
    </div>
  )
}

export default ReviewInfo;