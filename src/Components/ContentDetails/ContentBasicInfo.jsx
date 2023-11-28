import React,{useState} from 'react';
import { AiFillStar } from 'react-icons/ai';
import {TrailerVideoModal} from './Modals';

import { BsFillBookmarkPlusFill, BsBookmarkCheckFill, BsFillShareFill } from 'react-icons/bs';

import ContentCreators from './ContentCreators';


function ContentBasicInfo(props) {
  const {img, title, story, score, date, genres, nation, learningTime, videoId, actors, director} = props;
  const [isMarked, setIsMarked] = useState(false);

  // related Modal
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
    };

  return (
    <div className='w-full flex'>

      <div className='w-2/5 b-3 flex flex-col  items-center'>
        <div className=''>
          <img className='m-5 object-cover' style={{ height: '580px' }} src={img}/>
        </div>
        <button className='w-full mt-6 btn bg-white/10 hover:bg-white/20 text-white font-bold py-2 px-4 rounded-full' onClick={openModal}>예고편</button>
        <TrailerVideoModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        youtubeId={videoId}
        />
      </div>

      <div className='w-3/5 ml-16 text-white'>
        <div className='w-full m-2 flex justify-between'>
          <div className='text-xl font-medium'>{title}</div>
          <button className='' onClick={(event)=>{setIsMarked(prev=>!prev)}}>
            {isMarked? (<BsBookmarkCheckFill className=' text-5xl grow-0 shrink-0 p-2 text-green-500' />) : (<BsFillBookmarkPlusFill className=' text-5xl grow-0 shrink-0 p-2' />) }
          </button>
        </div>
        <div className='w-full m-2 my-5 flex flex-col'>
          <div className='text-base my-1 font-medium'>줄거리 정보</div>
          <div className='text-sm'>{story}</div>
        </div>
        <table className='table-fixed border-separate border-spacing-y-4 border-spacing-x-2 '>
          <tbody className=''>
            <tr className='text-left'><th>평점</th><td><AiFillStar className='inline-block text-xl '/>{score}</td></tr>
            <tr className='text-left'><th>개봉일자</th><td>{date}</td></tr>
            <tr className='text-left'><th>장르</th><td>{genres.join(', ')}</td></tr>
            {/* <tr className='text-left'><th>국가</th><td>{nation}</td></tr> */}
            <tr className='text-left'><th>러닝타임</th><td>{learningTime}</td></tr>
          </tbody>
        </table>
        {/* border로 선을만들때, border-style을 꼭 지정해주어야함. 아래는 solid로 설정 */}
        <div className='mt-10 w-full border-solid border-b border-gray-400 '></div> 
        <button className='btn w-3/7 my-5 flex bg-amber-300 hover:bg-yellow-300 text-white font-bold p-3 rounded-full '>
          <BsFillShareFill className='align-middle mx-2' />
          <div className='align-middle mx-2'>카카오톡 공유하기</div> 
        </button>
        <ContentCreators actors={actors} director={director} ></ContentCreators>
      </div>
      
    </div>
  )
}

export default ContentBasicInfo;