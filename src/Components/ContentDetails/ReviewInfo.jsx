import React, {useState, useEffect} from 'react';

import * as contentFakeData from './createFakerData';
import Review from './Review';

function ReviewInfo({id}) {
  // 어떻게 API가 나올지를 모르니 state는 조금 있다가 분배?
  const [reviews, setReviews] = useState([]); // 

  let reviewsInfo = {};
  // take related data
  useEffect(()=>{
    setTimeout(()=>{
      reviewsInfo = contentFakeData.createReviewData();
      console.log('reviewsInfo', reviewsInfo)
      setReviews(reviewsInfo)
      console.log('reviews',reviews)
    } , 1000);
  }, []);

  return (
    <div className='w-full m-10 flex flex-col text-white' id="review-info-box">
      <div className='flex items-center' id='review-info-box-name'>
        <div className='align-middle mr-2'>리뷰 작성</div>
        <div className="tabs tabs-boxed text-white bg-white/20">
          <a className="tab text-white">기본순</a>
          <a className="tab text-white tab-active">최신순</a>
          <a className="tab text-white">별점높은순</a>
          <a className="tab text-white">별점낮은순</a>
        </div>
        <div className='mx-3 dropdown dropdown-right dropdown-end'>
          <button tabIndex={0} className='btn bg-white/10 hover:bg-white/20 text-white'>필터</button>
          <ul tableIndex={0} className='dropdown-content z-[1] menu p-2 shadow bg-white/10 rounded-box w-52'>
            <li><button>최신순</button></li>
            <li><button>별점높은순</button></li>
            <li><button>별점낮은순</button></li>
          </ul>
        </div>
        {/* <button className='m-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>필터</button> */}
      </div>
      <div className='overflow-x-auto h-60' id = 'reviews'>
        <table className="table table-pin-rows">
          <tbody>
            {reviews.map(review=>(<tr><td><Review review={review} /></td></tr>))}
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default ReviewInfo;