import React, {useState, useEffect} from 'react';
import {useRecoilValue } from "recoil";
import { AiFillStar } from 'react-icons/ai';

import * as Fetchers from './Fetchers'; 
import * as contentReformatData from './refomatData';
import { myReviewState } from "../../Common/CommonAtom";

const scoreRanking2tailWindClassName = {
  1: 'w-5/6 h-1 bg-white',
  2: 'w-4/6 h-1 bg-white',
  3: 'w-3/6 h-1 bg-white',
  4: 'w-2/6 h-1 bg-white',
  5: 'w-1/6 h-1 bg-white',
}

// score에 따른 랭킹만들기
const makeScoreRankingIndexs = (scoreNum) => {
  const scoreRankingIndexs = [];
  const score2ranking = {};

  let prev = -1;
  Object.values(scoreNum).sort((a,b)=>b-a).map((score, index)=>{
    if (score !== prev){
      score2ranking[score] = index+1;
    }
    prev = score;
  })

  Object.values(scoreNum).map((score, index)=>{
    scoreRankingIndexs.push(score2ranking[score]);
  })

  return scoreRankingIndexs;
}

function ContentScoreInfo({id}) {
  const [myReviews] = useRecoilValue(myReviewState);
  const [contentScoreInfo, setcontentScoreInfo] = useState({
    'meanScore': 0,
    'totalScoreNum': 0,
    'scoreNum': {'1': 0, '2': 0, '3': 0, '4': 0, '5': 0}
  });
  const [scoreRankingIndexs, setScoreRankingIndexs] = useState([1,2,3,4,5])

  // take related data
  useEffect(()=>{
    Fetchers.callGetReviewsRatingsAPI(id)
      .then(({data})=>{
        const reformattedScoreData = contentReformatData.reformatContentScoreData(data.ratings);
        setcontentScoreInfo(reformattedScoreData);
      })
  }, [id, myReviews]);  // id를 통해 각 컨텐츠마다 한번씩 정보를 불러오고, 나의 리뷰가 바뀔때마다 업데이트 해주기위함

  useEffect(()=>{
    setScoreRankingIndexs(makeScoreRankingIndexs(contentScoreInfo['scoreNum']));
  }, [contentScoreInfo])

  return (
    <div className='w-full my-14 text-white'>
      <div className='flex bg-white/10 rounded-xl p-5 justify-center items-center' id='scoreInfo-background'>
        <div className='w-2/5 flex-col '>
          <div className='mb-3 flex justify-center'>
            <AiFillStar className='text-5xl'/>
            <div className='align-middle text-center text-4xl'>{isNaN(contentScoreInfo.meanScore)? 0: contentScoreInfo.meanScore}</div>
          </div>
          <div className='text-center'>(총 리뷰 수: {contentScoreInfo.totalScoreNum})</div>
        </div>

        <div className='w-3/5 p-3 flex flex-col border-white border-solid border-l-2 items-center' id='star-stat'>
          {new Array(5).fill('').map((x, index)=>{
            return (
              <div key={`star-${index}`} className='w-full flex items-center by-1 h-7 grow'>
                <div className='w-10 text-center'>{1+index}점</div>
                <div className={scoreRanking2tailWindClassName[scoreRankingIndexs[index]]}></div>
                <div className='w-10 text-center'>({contentScoreInfo['scoreNum'][index+1]})</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ContentScoreInfo;