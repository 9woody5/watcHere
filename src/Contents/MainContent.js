// 메인컨텐츠의 바디 레이아웃 프레임
import React from "react";
import TopNav from "./TopNav";
export default function MainContent() {
  return (
    <>
      <div className="w-full flex justify-center ">
        <div className="w-full ">
          <TopNav />
        </div>
      </div>
      <div className="w-full h-screen flex bg-[#40ad80]">
        <div className="w-[30%] h-full border-2">
          <div className="border-2 border-black">컨텐츠 1</div>
          <div className="border-2 border-black">컨텐츠 2</div>
          <div className="border-2 border-black">컨텐츠 3</div>
          <div className="border-2 border-black">컨텐츠 4</div>
          <div className="border-2 border-black">컨텐츠 5</div>
        </div>
        <div className="w-[70%] h-full border-2">
          {/* 임시로 iframe 을 사용해서 데이터를 가져옴 */}
          여기가 메인 페이지
          <iframe
            src="https://www.themoviedb.org/"
            className="w-full h-[100%]"
            alt=""
          />
        </div>
      </div>
    </>
  );
}
