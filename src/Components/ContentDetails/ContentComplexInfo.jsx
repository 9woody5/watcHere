import React from 'react';
import {Link} from 'react-router-dom';

const availablePlatforms = [
  {name:'NETFLIX', img:"../src/assets/img/logo/logo_netflix.png", buf:Math.round(Math.random()), link:'https://www.netflix.com/kr/'},
  {name:'WATCHA', img:"../src/assets/img/logo/logo_watcha_rd.png", buf:Math.round(Math.random()), link:'https://watcha.com/'}, 
  {name:'WAVVE', img:"../src/assets/img/logo/logo_wavve.png", buf:Math.round(Math.random()), link:'https://www.wavve.com/'},
  {name:'DISNEY+', img:"../src/assets/img/logo/logo_disney_plus.png", buf:Math.round(Math.random()), link:'https://www.disneyplus.com'}, 
  // {name:'PARAMOUNT+', img:"../src/assets/img/logo/logo_Paramount_Plus.png", buf:Math.round(Math.random())}
]

function ContentComplexInfo({actors, director}) {
  
  return (
    <div className='w-full flex text-white'>

      <div className='w-2/5 flex flex-col justify-around'>
        <div className='w-3/5'>
          <div className='mb-5'>시청 가능한 플랫폼</div>
          <div className="carousel carousel-center max-w-md p-2 space-x-2 bg-neutral rounded-box">
            {availablePlatforms.map((p, idx) => (
              <div key={`platform-${idx}`} className='flex flex-col items-center justify-center'>
                <button  className=" btn carousel-item btn-white" disabled={p.buf}>
                  <Link to={p.link}><img className='w-6 h-6 bg-cover rounded-full' src={p.img}></img></Link>
                </button>
                <div className='pt-2'>{p.name}</div>
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
                <img className="w-12 h-12 rounded-full object-cover" src={director.img} alt="" />
              </div>
              <div>{director.name}</div>
            </div>
          </div>
        </div>
        <div className='m-6' >
          <div className='my-3'>출연진</div>
          <div className='flex'>
            {actors.map((actor, idx) => (
            <div key={`actor-${idx}`} className="mr-3 flex flex-col justify-center items-center">
              <div className="my-2">
                <img className="w-12 h-12 rounded-full object-cover" src={actor.img} alt="" />
              </div>
              <div className='text-center'>{actor.name}</div>
            </div>
          ))}
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default ContentComplexInfo;