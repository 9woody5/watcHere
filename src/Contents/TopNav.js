// Top 네이게이션 메뉴입니다.

import React from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function TopNav() {
  return (
    <>
      <div className="w-full flex justify-between items-center bg-[] h-20 border-b-2 border-b-[#384b41]">
        <div className="w-[40%] flex items-center justify-center text-xl font-bold">
          <div className="w-[10%] text-[#40AD80] text-3xl">
            <Link to={"/"}>H</Link>
          </div>
          <div className="w-[20%] xs:hidden sm:block">영화</div>
          <div className="w-[20%]">드라마</div>
          <div className="w-[20%]">예능</div>
          <div className="w-[20%]">애니메이션</div>
        </div>
        <div className="w-[60%] items-center justify-center">
          <input
            className=" border-gray-400  w-2/3 p-2 h-10 border-b-2"
            placeholder="여기에 키워드를 넣어주세요"
          />
          <button className="w-[20%] bg-yellow-200 rounded-xl h-10 ml-2 font-bold text-xl">
            검색
          </button>
        </div>
      </div>
      <div className="xs:block sm:hidden">
        이것이 반응형
        <AiOutlineMenu />
      </div>
    </>
  );
}
