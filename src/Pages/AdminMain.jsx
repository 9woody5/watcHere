import { useEffect, useState } from "react";
import { ADMIN_MENU_USER, ADMIN_MENU_REVIEW } from "../admin/AdminEnum";
import { GoPeople } from "react-icons/go";
import { GrDocumentText } from "react-icons/gr";
import { footerEnabledRecoil } from "../Common/CommonAtom";
import { useRecoilState } from "recoil";
import AdminUserList from "./AdminUserList";
import AdminReviewList from "./AdminReviewList";
export default function AdmimMain() {
  const [selectMenu, setSelectNemu] = useState(ADMIN_MENU_USER); // 현재 버튼의 상태를 봅니다.
  const [, setFooterEnabled] = useRecoilState(footerEnabledRecoil); // 푸터를 활성화 할지 말지를 결정합니다.

  useEffect(() => {
    setFooterEnabled(false); // 관리자페이지는 기본 푸터가 비활성화이기 때문에 useEffect 에서 푸터를 비활성화 합니다.
  }, [setFooterEnabled]);

  return (
    <div className="flex justify-center h-screen">
      <div className="w-[30%] border-2 bg-[#2C2C2C] flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-center mt-10">
            <div className="text-3xl text-[#9BB0A5]">watc</div>
            <div className="text-3xl text-[#40AD80]">H</div>
            <div className="text-3xl text-[#9BB0A5]">ere</div>
          </div>
          <div
            className={`flex items-center justify-left mx-10 pl-6 h-10 rounded-md text-md font-semibold mt-10 ${
              selectMenu === ADMIN_MENU_USER
                ? "bg-[#40ad80] text-white"
                : "text-gray-400"
            }`}
            onClick={() => {
              setSelectNemu(ADMIN_MENU_USER);
            }}
          >
            <div>
              <GoPeople />
            </div>
            <div className="ml-2">사용자 관리</div>
          </div>

          <div
            className={`flex items-center justify-left mx-10 pl-6 h-10 rounded-md text-md font-semibold ${
              selectMenu === ADMIN_MENU_REVIEW
                ? "bg-[#40ad80] text-white"
                : "text-gray-400"
            }`}
            onClick={() => {
              setSelectNemu(ADMIN_MENU_REVIEW);
            }}
          >
            <div>
              <GrDocumentText />
            </div>
            <div className="ml-2">리뷰 관리</div>
          </div>
        </div>
        <div className="mx-10 mb-5">
          <div className="flex items-center text-white ">
            <div>이미지</div>
            <div className="ml-4">
              <div>관리자</div>
              <div>이메일</div>
            </div>
          </div>

          <div>
            <button className="text-black rounded-md p-2 font-semibold bg-white mt-4">
              로그아웃
            </button>
          </div>
        </div>
      </div>
      <div className="w-[70%] border-2">
        {selectMenu === ADMIN_MENU_USER && <AdminUserList />}
        {selectMenu === ADMIN_MENU_REVIEW && <AdminReviewList />}
      </div>
    </div>
  );
}
