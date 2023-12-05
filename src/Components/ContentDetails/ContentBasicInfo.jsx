import React, { useState, useEffect } from "react";
import { AiFillStar } from "react-icons/ai";

import { TrailerVideoModal } from "./Modals";
import { BsFillBookmarkPlusFill, BsBookmarkCheckFill, BsFillShareFill } from "react-icons/bs";
import * as Fetchers from './Fetchers'; 
import ContentCreators from "./ContentCreators";

function ContentBasicInfo(props) {
  const { img, title, story, score, date, genres, nation, learningTime, videoId, contentType, id } = props;
  const [isMarked, setIsMarked] = useState(null);

  const token = localStorage.getItem("token");

  // related Modal
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(()=>{
    if(isMarked===true){
      Fetchers.callPostLikesAPI(contentType, id, token);
    }
    else if (isMarked===false){
      Fetchers.callDeleteLikesAPI(contentType, id, token);
    }

  }, [isMarked])

  useEffect(()=>{
    Fetchers.callGetLikesAPI(contentType, id, token)
      .then(({data})=>setIsMarked(data))
  }, [id, token])


  return (
    <div className="w-full flex">
      <div className="w-2/5 b-3 flex flex-col  items-center">
        <div className="">
          <img className="object-cover" style={{ height: "420px" }} src={img} />
        </div>
        <button
          className="w-full mt-6 btn bg-white/10 hover:bg-white/20 text-white font-bold py-2 px-4 rounded-full disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
          disabled={videoId ? false : true}
          onClick={openModal}
        >
          {videoId ? "예고편" : "예고편 없음"}
        </button>
        <TrailerVideoModal isOpen={modalIsOpen} onRequestClose={closeModal} youtubeId={videoId} />
      </div>

      <div className="w-3/5 ml-16 text-white">
        <div className="w-full m-2 flex justify-between">
          <div className="text-3xl font-pretendardBold">{title}</div>
          <button
            className=""
            onClick={(event) => {
              if (token){
                setIsMarked((prev) => !prev);
              }
              else{
                alert('북마크를 위해 로그인을 먼저 해주세요!');
              }
            }}
          >
            {isMarked ? (
              <BsBookmarkCheckFill className=" text-5xl grow-0 shrink-0 p-2 text-green-500" />
            ) : (
              <BsFillBookmarkPlusFill className=" text-5xl grow-0 shrink-0 p-2" />
            )}
          </button>
        </div>
        <div className="w-full m-2 my-5 flex flex-col">
          <div className="text-base my-1 text-emerald-500 font-pretendardBold">줄거리 정보</div>
          <div className="text-sm">{story}</div>
        </div>
        <table className="table-fixed border-separate border-spacing-y-4 border-spacing-x-2 ">
          <tbody className="">
            <tr className="text-left">
              <th className="font-pretendardBold text-emerald-500">박스오피스 평점 </th>
              <td>
                <AiFillStar className="inline-block text-xl " />
                {score}
              </td>
            </tr>
            {date ? (
              <tr className="text-left">
                <th className="font-pretendardBold text-emerald-500">개봉일자</th>
                <td>{date}</td>
              </tr>
            ) : (
              <></>
            )}
            <tr className="text-left">
              <th className="font-pretendardBold text-emerald-500">장르</th>
              <td>{genres.join(", ")}</td>
            </tr>
            {learningTime ? (
              <tr className="text-left">
                <th className="font-pretendardBold text-emerald-500">러닝타임</th>
                <td>{learningTime}분</td>
              </tr>
            ) : (
              <></>
            )}
          </tbody>
        </table>
        {/* border로 선을만들때, border-style을 꼭 지정해주어야함. 아래는 solid로 설정 */}
        {/* <div className="mt-10 w-full border-solid border-b border-gray-400 "></div> */}
        {/* <ContentCreators actors={actors} director={director}></ContentCreators> */}
      </div>
    </div>
  );
}

export default ContentBasicInfo;
