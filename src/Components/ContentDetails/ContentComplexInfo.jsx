import React, {useEffect, useState} from 'react';
import { SiNetflix } from 'react-icons/si';
import { TbSquareRoundedLetterN } from "react-icons/tb";

const availablePlatforms = [
  {name:'NETFLIX', img:"../src/assets/img/logo/logo_netflix.png", buf:Math.round(Math.random())},
  {name:'WATCHA', img:"../src/assets/img/logo/logo_watcha_rd.png", buf:Math.round(Math.random())}, 
  {name:'WAVVE', img:"../src/assets/img/logo/logo_wavve.png", buf:Math.round(Math.random())},
  {name:'DISNEY+', img:"../src/assets/img/logo/logo_disney_plus.png", buf:Math.round(Math.random())}, 
  {name:'PARAMOUNT+', img:"../src/assets/img/logo/logo_Paramount_Plus.png", buf:Math.round(Math.random())}]
console.log(availablePlatforms)

const btnDesigns = ["btn carousel-item btn-neutral disabled:btn-neutral", "btn carousel-item btn-white disable:btn-white"]

function ContentComplexInfo({actors, director}) {
  
  return (
    <div className='w-full flex text-white'>

      <div className='w-2/5 flex flex-col justify-around'>
        <div className='w-3/5'>
          <div className='mb-5'>시청 가능한 플랫폼</div>
          <div className="carousel carousel-center max-w-md p-4 space-x-4 bg-neutral  rounded-box">
            {/* {new Array(5).fill(0).map((p,idx)=>(
              <div>
                <button key={`platform-${idx}`} className="btn carousel-item">
                  <TbSquareRoundedLetterN className="rounded-box text-2xl "/>
                </button>
                <div className='mt-2'>넥플릭스</div>
              </div> 
            ))} */}
            {availablePlatforms.map((p, idx) => (
              <div className='flex flex-col items-center justify-center'>
                <button key={`platform-${idx}`} className="btn carousel-item btn-white" disabled={p.buf}>
                  <img className='w-10' src={p.img}></img>
                </button>
                <div className='mt-2 text-sm'>{p.name}</div>
              </div> 
            ))}
            
          </div>
        </div>
      </div>

      <div className='w-3/5 ml-16 flex'>
        <div className="m-6">
          <div className="my-3 font-pretendardBold">감독</div>
          <div className="flex gap-4">
            <div className="flex flex-col justify-center items-center">
              <div className="my-2">
                <img className="w-16 h-16 rounded-full object-cover" src={director.img} alt="" />
              </div>
              <div>{director.name}</div>
            </div>
          </div>
        </div>
        <div className='m-6' >
          <div className='my-3'>출연진</div>
          <div className='flex'>
            {actors.map((actor, idx)=>(
              <div className='mx-3' key={`actor-${idx}`}>
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