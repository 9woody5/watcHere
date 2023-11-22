import React, {useEffect, useState} from 'react';
import { SiNetflix } from 'react-icons/si';

import StarRating from './StarRating';

function ContentComplexInfo({actors, director, availablePlatforms}) {
  
  return (
    <div className='w-full flex text-white'>

      <div className='w-2/5 flex flex-col justify-around'>
        {/* <div className='' >
          <div>평점등록</div>
          <StarRating/>
        </div> */}
        <div className='w-3/5'>
          <div>시청 가능한 플랫폼</div>
          <div className="carousel carousel-center max-w-md p-4 space-x-4 bg-neutral rounded-box">
            {new Array(5).fill(0).map((p)=>(
              <button className="btn carousel-item">
                <SiNetflix className="rounded-box"/>
              </button> 
            ))}
          </div>
        </div>
      </div>

      <div className='w-3/5 ml-16 flex'>
        <div className='m-6'>
          <div className='my-3'>감독</div>
          <div className='w-30 flex'>
            <div className='w-12 mx-4'><img className='rounded-full' src={director.img} alt="" /></div>
            <div className=' flex flex-col justify-around'>
              <div>{director.name}</div>
              <div>대표작1, 대표작2</div>
            </div>
          </div>
        </div>
        <div className='m-6' >
          <div className='my-3'>출연진</div>
          <div className='flex'>
            {actors.map(actor=>(
              <div className='mx-3'>
                <div className='w-12 my-2'><img className='rounded-full' src={actor.img} alt="" /></div>
                <div>{actor.name}</div>
              </div>          
            ))}
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default ContentComplexInfo;