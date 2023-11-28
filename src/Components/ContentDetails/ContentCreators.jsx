import React, {useEffect, useState} from 'react';

function ContentCreators({actors, director}) {
  
  return (
    <div className='w-full flex text-white'>
      <div className='m-6'>
        <div className='my-3'>감독</div>
        <div className='flex'>
          <div className='m-3 flex flex-col justify-center items-center'>
            <div className='my-2'><img className='w-12 h-12 rounded-full' src={director.img} alt="" /></div>
            <div>{director.name}</div>
          </div>
        </div>
      </div>
      <div className='m-6' >
        <div className='my-3'>출연진</div>
        <div className='flex'>
          {actors.map(actor=>(
            <div className='m-3 flex flex-col justify-center items-center'>
              <div className='my-2'><img className='w-12 h-12 rounded-full' src={actor.img} alt="" /></div>
              <div>{actor.name}</div>
            </div>          
          ))}
        </div>
      </div>
    </div>
  )
}

export default ContentCreators;