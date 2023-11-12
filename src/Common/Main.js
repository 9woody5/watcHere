import React from "react";

// 리액트에서는 a href 를 사용하지 말아주세요
// 반드시 Link 를 사용해주셔야 합니다.
// A href 를 사용해서 페이지를 넘길 경우 Recoil 혹은 useState 에 저장된 모든 데이터가 초기화 되어버리기 때문에
// 페이지를 새로 init 해야합니다.
// Link 를 사용하기 위해서는 가급적 상단에 <BrowserRouter> 를 선언해주고 그 안에서 페이지 이동을 Link to 로 합니다.
// react-router-dom은  v5 와 v6 가 많이 바뀐데다가 바뀐지 얼마 안되서 인터넷에 구현방법이 섞여있으니 꼭 공식 레퍼런스 메뉴얼을 보셔야합니다.

import { Link } from "react-router-dom";

export default function MainSearch() {
  return (
    <>
      <div className="w-full h-full mt-20">
        <div className="flex items-end justify-center">
          <div className="text-xl">Watc</div>
          <div className="text-3xl font-bold">H</div>
          <div className="text-xl">ere</div>
        </div>
        <div className="flext w-full justify-center">
          <input
            className="border-2 border-black w-[88%] h-10 rounded-3xl p-4"
            placeholder="좋아하는 컨텐츠의 이름을 입력해주세요"
          />
          <button className="w-[10%] ml-4 border-2 rounded-md bg-yellow-400 h-10">
            <Link to={"/Main"}>검색 </Link>
          </button>
        </div>
        <div className="flex w-full mt-40">
          <div className="w-[30%] border-2">
            <div className="flex items-center justify-around">
              <div className="w-[10%]">랭킹</div>
              <div className="w-[30%]">이미지</div>
              <div className="w-[60%">이름</div>
            </div>
            <div className="flex items-center justify-around">
              <div className="w-[10%]">1</div>
              <div className="w-[30%]">이미지</div>
              <div className="w-[60%">이름</div>
            </div>
            <div className="flex items-center justify-around">
              <div className="w-[10%]">2</div>
              <div className="w-[30%]">이미지</div>
              <div className="w-[60%">이름</div>
            </div>
            <div className="flex items-center justify-around">
              <div className="w-[10%]">3</div>
              <div className="w-[30%]">이미지</div>
              <div className="w-[60%">이름</div>
            </div>
          </div>
          <div className="w-[70%] flex">
            <div className="w-[20%] h-[100%] border-2 mx-1">
              <div className="">
                <img src="image 26.png" alt="" />
              </div>
              <div>제목</div>
            </div>
            <div className="w-[20%] h-[100%] border-2  mx-1">
              <div className="">
                <img src="image 26.png" alt="" />
              </div>
              <div>제목</div>
            </div>
            <div className="w-[20%] h-[100%] border-2  mx-1">
              <div className="">
                <img src="image 26.png" alt="" />
              </div>
              <div>제목</div>
            </div>
            <div className="w-[20%] h-[100%] border-2  mx-1">
              <div className="">
                <img src="image 26.png" alt="" />
              </div>
              <div>제목</div>
            </div>
            <div className="w-[20%] h-[100%] border-2  mx-1">
              <div className="">
                <img src="image 26.png" alt="" />
              </div>
              <div>제목</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
