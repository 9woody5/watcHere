import { useState } from "react";
import {
  ADMIN_MENU_USER,
  ADMIN_MENU_REVIEW,
} from "../Components/Admin/AdminEnum";
import { GoPeople } from "react-icons/go";
import { GrDocumentText } from "react-icons/gr";
import AdminUserList from "../Components/Admin/AdminUserList";
import AdminReviewList from "../Components/Admin/AdminReviewList";

export default function AdmimMain() {
  const [selectMenu, setSelectNemu] = useState(ADMIN_MENU_USER); // 현재 버튼의 상태를 봅니다.

  return (
    <div className="flex min-h-screen w-[80%] xl:w-full ">
      <div className="w-1/5 xl:w-96 border-2 bg-[#2C2C2C] flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-center mt-10">
            <div className="text-3xl text-[#9BB0A5]">watc</div>
            <div className="text-3xl text-[#40AD80]">H</div>
            <div className="text-3xl text-[#9BB0A5]">ere</div>
          </div>
          <div
            className={`flex items-center justify-left mx-10 px-5 h-10 rounded-md text-md font-semibold mt-10 ${
              selectMenu === ADMIN_MENU_USER
                ? "bg-[#40ad80] text-white"
                : "text-gray-400"
            }`}
            onClick={() => {
              setSelectNemu(ADMIN_MENU_USER);
            }}
          >
            <GoPeople className="md:w-8 md:h-8" />
            <div className="ml-2 md:hidden">사용자 관리</div>
          </div>

          <div
            className={`flex items-center justify-left mx-10 px-5 h-10 rounded-md text-md font-semibold ${
              selectMenu === ADMIN_MENU_REVIEW
                ? "bg-[#40ad80] text-white"
                : "text-gray-400"
            }`}
            onClick={() => {
              setSelectNemu(ADMIN_MENU_REVIEW);
            }}
          >
            <GrDocumentText className="md:w-8 md:h-8" />
            <div className="ml-2 md:hidden">리뷰 관리</div>
          </div>
        </div>
        <div className="mx-10 mb-5">
          <div className="flex items-center text-white xl:hidden">
            <div>이미지</div>
            <div className="ml-4">
              <div>관리자</div>
              <div>이메일</div>
            </div>
          </div>
          <div className="border-2 flex flex-col items-center justify-center text-white xl:block 2xl:hidden">
            <div>이미지</div>
            <div>관리자</div>
            <div>이메일</div>
          </div>
          <div>
            <button className="text-black rounded-md p-2 font-semibold bg-white mt-4">
              로그아웃
            </button>
          </div>
        </div>
      </div>
      <div className="w-4/5 border-2">
        {selectMenu === ADMIN_MENU_USER && <AdminUserList />}
        {selectMenu === ADMIN_MENU_REVIEW && <AdminReviewList />}
      </div>
    </div>
  );
}
