import React, {useState, useEffect} from 'react';

import { AiFillStar } from 'react-icons/ai';

import * as contentFakeData from './createFakerData';


function ContentScoreInfo({id}) {
  const [contentScoreInfo, setcontentScoreInfo] = useState({
    'meanScore': 0,
    'totalScoreNum': 0,
    'scoreNum': 
      {
        '1': 0, 
        '2': 0, 
        '3': 0, 
        '4': 0, 
        '5': 0 
      }
  });

  // take related data
  useEffect(()=>{
    setTimeout(()=>{
      const data = contentFakeData.createContentScoreData();
      setcontentScoreInfo(data)
    } , 0);
    console.log('contentScoreInfo', contentScoreInfo)
  }, []);


  return (
    <div className='w-full my-14 text-white'>
      <div className='flex bg-white/10 rounded-xl p-5 justify-center items-center' id='scoreInfo-background'>
        <div className='w-2/5 flex-col '>
          <div className='mb-3 flex justify-center'>
            <AiFillStar className='text-5xl'/>
            <div className='align-middle text-center text-4xl'>{contentScoreInfo.meanScore}</div>
          </div>
          <div className='text-center'>(총 리뷰 수: {contentScoreInfo.totalScoreNum})</div>
        </div>

        <div className='w-3/5 p-3 flex flex-col border-white border-solid border-l-2' id='star-stat'>
          {new Array(5).fill('').map((x, index)=>{
            return (
              <div className='flex by-1 h-7'>
                <div className='w-10 text-center'>{5-index}점</div>
                {/* <div className={`w-${60-index*8} h-1 bg-white`}></div> */}
                <div className={`w-${5-index-1}/5 h-1 bg-white`}></div>
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