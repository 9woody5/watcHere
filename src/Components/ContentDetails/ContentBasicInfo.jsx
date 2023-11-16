import React,{useEffect, useState} from 'react';
import { AiFillStar } from 'react-icons/ai';
import { BsFillBookmarkPlusFill, BsBookmarkCheckFill, BsFillShareFill } from 'react-icons/bs';


function ContentBasicInfo(data) {
  const {img, title, story, score, date, genres, nation, learningTime} = data;
  const [isMarked, setIsMarked] = useState(false);

  return (
    <div className='w-full m-10 flex' id="content-basic-info-box">

      <div className='w-2/5 m-5 flex flex-col  items-center' id='poster-box'>
        <div className=''>
          <img className='w-full object-cover' src={img}/>
        </div>
        <button className='btn w-full m-3 bg-white/10 hover:bg-white/20 text-white font-bold py-2 px-4 rounded-full'>예고편</button>
      </div>

      <div className='w-3/5 m-5 text-white' id='basic-info-box'>
        <div className='w-full m-2 flex justify-between' id="title-box">
          <text className='text-xl font-medium'>{title}</text>
          <button className='' onClick={(event)=>{setIsMarked(prev=>!prev)}}>
            {isMarked? (<BsBookmarkCheckFill className=' text-5xl grow-0 shrink-0 p-2 text-green-500' />) : (<BsFillBookmarkPlusFill className=' text-5xl grow-0 shrink-0 p-2' />) }
          </button>
        </div>
        <div className='w-full m-2 my-5 flex flex-col' id="story-box">
          <text className='text-base my-1 font-medium'>줄거리 정보</text>
          <text className='text-sm'>{story}</text>
        </div>
        <table className='table-fixed border-separate border-spacing-y-4 border-spacing-x-10 ' id="detail-info-list-box">
          <tbody className='' >
            <tr className='' id="score-box"><th>평점</th> <td><AiFillStar className='inline-block text-xl '/> {score}</td></tr>
            <tr className='' id="score-box"><th>개봉일자</th> <td>{date}</td></tr>
            <tr className='' id="score-box"><th>장르</th> <td>{genres.join(', ')}</td></tr>
            <tr className='' id="score-box"><th>국가</th> <td>{nation}</td></tr>
            <tr className='' id="score-box"><th>러닝타임</th> <td>{learningTime}</td></tr>
          </tbody>
        </table>
        {/* border로 선을만들때, border-style을 꼭 지정해주어야함. 아래는 solid로 설정 */}
        <div className='w-full border-solid border-b border-gray-400 '></div> 
        <button className='btn w-3/7 my-5 flex bg-amber-300 hover:bg-yellow-300 text-white font-bold p-3 rounded-full '>
          <BsFillShareFill className='align-middle mx-2' />
          <div className='align-middle mx-2'>카카오톡 공유하기</div> 
        </button>
      </div>
    </div>
  )
}

export default ContentBasicInfo;