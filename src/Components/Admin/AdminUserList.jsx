// 코어 라이브러리
import { useEffect, useState } from "react";

// 더미데이터
import dummyUserList from "../../resources/userInfo.json";
import dummyPageNation from "../../resources/pagenition.json";

// 관리자용 유저 스테이터스
import {
  ADMIN_MENU_USER_ACTIVATE,
  ADMIN_MENU_USER_BAN,
  ADMIN_MENU_USER_WITHDRAW,
} from "./AdminEnum";

// 그래픽 라이브러리
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
  MdKeyboardArrowRight,
  MdKeyboardArrowLeft,
} from "react-icons/md";

// 커스텀 라이브러리
import DateFormat, { TIME_FORMATTER_MM_dd_yy } from "../../Common/DateFormat";

// 전용 모달 컴포넌트
import { ChangeUserStateModal, CheckUserInfoModal } from "./AdminModal";

export default function AdminUserList() {
  const [userList, setUserList] = useState([]);
  const [nowPage, setNowPage] = useState(1);
  const [nowBlock, setNowBlock] = useState(1);
  const [maxBlock, setMaxBlock] = useState(0);
  const [maxPage, setMaxPage] = useState(10);
  const [userInfo, setUserInfo] = useState({});
  /**
   * 서버에서 유저리스트를 받아오는 함수
   *
   * 서버 오류시  Connect 에서  null 을 리턴하게 된다.
   *
   * null 값이 들어올경우에는 임시 json 파일을 로딩해서 정보를 보여준다.
   */
  const getUserData = async () => {
    // const response = await GetData("url");
    const response = null;
    if (response !== null) {
      setUserList(response);
    } else {
      setUserList(dummyUserList.user_data);
    }
  };
  /**
   * 페이지 이동을 블록단위로 하는 기능
   *
   * @param {int} block --- 움직일 블록 번호
   */
  const handlePageBlock = (block) => {
    setNowBlock(block);
    setNowPage(1);
  };
  /**
   * 구현기능 : 페이지 이동
   *
   * 이슈 : Arrow가 불필요한 시점에 노출되는 문제
   *
   */
  const handlePageClick = (page) => {
    if (page <= 0) {
      if (nowBlock > 1) {
        setNowPage(maxPage);
        setNowBlock(nowBlock - 1);
      }
    } else if (page > maxPage) {
      if (nowBlock < maxBlock) {
        setNowPage(1);
        setNowBlock(nowBlock + 1);
      }
    } else {
      setNowPage(page);
    }
  };

  const handleUserState = (user, modalId) => {
    setUserInfo(user);
    document.getElementById(modalId).showModal();
    // 네트워크 API 작업 완료 후 작업 진행
    // putUserActivateStatus(userInfo.id);
  };
  /**
   *
   * @param {int} type 활동중 0 정지 1 탈퇴 2
   * @returns
   */
  const activateStateComponent = (type) => {
    switch (type) {
      case ADMIN_MENU_USER_ACTIVATE:
        return <div className="text-[#0CAF60] bg-[#E7F7EF] p-1">활동 중 </div>;
      case ADMIN_MENU_USER_BAN:
        return <div className="text-[#DA0707] bg-[#FFF0F0] p-1">정지 </div>;
      case ADMIN_MENU_USER_WITHDRAW:
        return <div className="text-[#2C2C2C] bg-[#F2F2F2] p-1">탈퇴 </div>;
      default:
        return;
    }
  };

  const activateActionComponent = (type) => {
    switch (type) {
      case ADMIN_MENU_USER_ACTIVATE:
        return (
          <div className="w-[50%] text-[#DA0707] border rounded-md h-6 flex items-center justify-center border-black">
            정지하기
          </div>
        );
      case ADMIN_MENU_USER_BAN:
        return (
          <div className="w-[50%] text-[#0CAF60]  border rounded-md h-6 flex items-center justify-center border-black">
            해제하기
          </div>
        );
      default:
        return;
    }
  };

  useEffect(() => {
    setMaxBlock(parseInt(dummyPageNation.total_page / maxPage));
    getUserData();
  }, [maxPage]);

  return (
    <div className="h-full bg-gray-300 flex flex-col justify-center">
      <div className="h-2/3 xl:h-full bg-white mx-4">
        <div className="flex mt-10 ">
          <div className="w-[30%] text-2xl font-bold text-center items-center">
            사용자 관리
          </div>
          <div className="w-[70%] flex items-center ">
            <div className="w-[30%] bg-gray-100 mr-4 rounded-sm"> Filters</div>
            <input
              className="border-2 bg-gray-100 rounded-md w-[70%] mr-4 text-sm"
              placeholder="Search by ID, product, or others..."
            />
          </div>
        </div>
        <div className="flex items-center text-center border-y-2 py-4 mt-4 text-xs">
          <div className="w-[20%] xl:w-[25%] md:hidden">사용자 계정</div>
          <div className="w-[20%] xl:w-[25%] md:w-1/3">가입 일자</div>
          <div className="w-[20%] xl:w-[25%] md:w-1/3">닉네임</div>
          <div className="w-[20%] xl:w-[25%] md:w-1/3">활동 상태</div>
          <div className="w-[20%] xl:hidden">상태 변경</div>
        </div>
        <div className="h-[60%] overflow-y-auto">
          {userList?.map((element, idx) => (
            <div
              className="flex items-center text-center mt-1 border-b-2 py-1 text-xs"
              onClick={() => handleUserState(element, "checkUserInfoModal")}
              key={idx}
            >
              <div className="w-[20%] xl:w-[25%]  md:hidden">
                <div className="text-black">{element.email} </div>
                <div>{element.email} </div>
              </div>
              <div className="w-[20%] xl:w-[25%] md:w-1/3 text-black font-bold">
                {DateFormat(element.join_date, TIME_FORMATTER_MM_dd_yy)}
              </div>
              <div className="w-[20%] xl:w-[25%] md:w-1/3 text-black font-bold">
                {element.nick_name}
              </div>
              <div className="w-[20%] xl:w-[25%] md:w-1/3 px-10">
                {activateStateComponent(element.activate)}
              </div>
              <div
                className="w-[20%] flex justify-center px-10 border-10 cursor-pointer xl:hidden"
                onClick={() => handleUserState(element, "changeUserStateModal")}
              >
                {activateActionComponent(element.activate)}
              </div>
            </div>
          ))}
        </div>
        <div className="text-xl mt-4 ml-4 flex justify-between items-center">
          <div className="flex items-center justify-center">
            <div> show Result :</div>
            <div>
              <div className="dropdown">
                <label tabIndex={0} className="btn m-1 ">
                  {maxPage}
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow bg-gray-200 rounded-box"
                >
                  <li>
                    <a onClick={() => setMaxPage(10)}>10</a>
                  </li>
                  <li>
                    <a onClick={() => setMaxPage(5)}>5</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center mr-4">
            {nowBlock > 1 && (
              <div>
                <MdKeyboardDoubleArrowLeft
                  onClick={() => {
                    handlePageBlock(nowBlock - 1);
                  }}
                />
              </div>
            )}
            <div>
              <MdKeyboardArrowLeft
                onClick={() => handlePageClick(nowPage - 1)}
              />
            </div>

            {Array.from({ length: maxPage }, (_, index) => (
              <button
                key={index}
                className={`mx-2 ${
                  nowPage === index + 1 ? "text-blue-700 font-bold" : ""
                }`}
                onClick={() => handlePageClick(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <div>
              <MdKeyboardArrowRight
                onClick={() => handlePageClick(nowPage + 1)}
              />
            </div>
            {nowBlock < maxBlock && (
              <div>
                <MdKeyboardDoubleArrowRight
                  onClick={() => {
                    handlePageBlock(nowBlock + 1);
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <ChangeUserStateModal props={userInfo} />
      <CheckUserInfoModal props={userInfo} />
    </div>
  );
}
