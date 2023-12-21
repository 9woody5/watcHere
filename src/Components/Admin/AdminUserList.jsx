// 코어 라이브러리
import { useCallback, useEffect, useState } from "react";

// 관리자용 유저 스테이터스

// 그래픽 라이브러리
import {
  MdOutlineSearch,
  MdKeyboardArrowRight,
  MdKeyboardArrowLeft,
} from "react-icons/md";

// 커스텀 라이브러리
import DateFormat, { TIME_FORMATTER_MM_dd_yy } from "../../Common/DateFormat";

// 전용 모달 컴포넌트
import { ChangeUserStateModal, CheckUserInfoModal } from "./AdminModal";

// 네트워크 라이브러리
import connect from "../../Network/Connect.json";
import { GetDataJwt } from "../../Network/Connect";

/**
 *
 * @param {boolean} bool false: 활동중 true: 정지
 * @returns
 */
const activateStateComponent = (bool) => {
  if (bool) {
    return <div className="text-[#DA0707] bg-[#FFF0F0] p-1">정지 </div>;
  } else {
    return <div className="text-[#0CAF60] bg-[#E7F7EF] p-1">활동 중 </div>;
  }
};

const activateActionComponent = (bool) => {
  if (bool) {
    return <div className="text-[#0CAF60] bg-[#E7F7EF] p-1">해제 하기</div>;
  } else {
    return <div className="text-[#DA0707] bg-[#FFF0F0] p-1">정지 하기 </div>;
  }
};

export default function AdminUserList() {
  const [userList, setUserList] = useState({});
  const [nowPage, setNowPage] = useState(0);
  const [maxPage, setMaxPage] = useState(5);
  const [userInfo, setUserInfo] = useState({});
  const [filter, setFilter] = useState(true);
  const [searchText, setSearchText] = useState("");
  /**
   * 서버에서 유저리스트를 받아오는 함수
   *
   * 서버 오류시  Connect 에서  null 을 리턴하게 된다.
   *
   * null 값이 들어올경우에는 임시 json 파일을 로딩해서 정보를 보여준다.
   */
  const getUserList = useCallback(
    async (searchText) => {
      let queryString;
      if (searchText) {
        queryString = `?offset=${nowPage}&limit=${maxPage}&ban=${!filter}&nickname_prefix=${searchText}`;
      } else {
        queryString = `?offset=${nowPage}&limit=${maxPage}&ban=${!filter}`;
      }

      const response = await GetDataJwt(
        connect["mainUrl"] + connect["adminUserList"] + queryString
      );
      setUserList(response.data);
    },
    [filter, maxPage, nowPage]
  );

  /**
   * 구현기능 : 페이지 이동
   *
   * 이슈 : Arrow가 불필요한 시점에 노출되는 문제
   *
   */
  const handlePageClick = (page) => {
    if (page <= 0) {
      setNowPage(0);
    } else if (page >= userList.total_pages) {
      setNowPage(userList.total_pages - 1);
    } else {
      setNowPage(page);
    }
  };

  const handleUserState = (user, modalId) => {
    setUserInfo(user);
    document.getElementById(modalId).showModal();
  };

  const handleOnSearch = () => {
    // searchText 를 useCallback에 걸면 onChange시 마다 서버를 호출하기 때문에 별도의 함수 구조로 진행
    getUserList(searchText);
  };

  useEffect(() => {
    getUserList();
  }, [getUserList]);

  return (
    <div className="h-full bg-gray-300 flex flex-col justify-center">
      <div className="h-2/3 xl:h-full bg-white mx-4">
        <div className="flex mt-10 ">
          <div className="w-[30%] text-2xl font-bold text-center ">
            사용자 관리
          </div>
          <div className="w-[70%] flex items-center justify-center">
            <div className="w-[40%] flex items-center justify-center">
              <div
                className={`font-bold  p-2 ${
                  filter !== true
                    ? "text-2xl text-red-500"
                    : "text-sm text-gray-500"
                }`}
              >
                정지 유저
              </div>
              <input
                type="checkbox"
                className="toggle toggle-success toggle-lg"
                checked={filter}
                onChange={() => {
                  setFilter(!filter);
                  setNowPage(0);
                }}
              />
              <div
                className={`font-bold p-2 ${
                  filter ? "text-2xl text-[#0CAF60]" : "text-sm text-gray-500"
                }`}
              >
                전체 유저
              </div>
            </div>
            <div className=" w-[60%] flex items-center justify-center">
              <MdOutlineSearch
                className="text-5xl w-[10%]"
                onChange={handleOnSearch}
              />
              <input
                className="ml-2 border-2 bg-gray-100 w-[90%] rounded-md mr-4 text-xl h-14 text-black pl-2"
                placeholder="Search by ID, product, or others..."
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="h-10 mt-10 text-xl flex items-center justify-center text-center">
          <div className="w-[20%] xl:w-[25%] md:hidden">사용자 계정</div>
          <div className="w-[20%] xl:w-[25%] md:w-1/3">가입 일자</div>
          <div className="w-[20%] xl:w-[25%] md:w-1/3">닉네임</div>
          <div className="w-[20%] xl:w-[25%] md:w-1/3">활동 상태</div>
          <div className="w-[20%] xl:hidden">상태 변경</div>
        </div>
        <div className="h-[60%] overflow-y-auto mt-4">
          {userList.content?.map((element, idx) => (
            <div
              className="flex items-center text-center mt-1 border-b-2 py-1 text-lg"
              key={idx}
            >
              <div className="w-[20%] xl:w-[25%] md:hidden">
                <div className="text-black">{element.email} </div>
                <div>{element.email} </div>
              </div>
              <div className="w-[20%] xl:w-[25%] md:w-1/3 text-black font-bold">
                {DateFormat(element.created_at, TIME_FORMATTER_MM_dd_yy)}
              </div>
              <div
                className="w-[20%] xl:w-[25%] md:w-1/3 text-black font-bold"
                onClick={() => handleUserState(element, "checkUserInfoModal")}
              >
                {element.nickname}
              </div>
              <div className="w-[20%] xl:w-[25%] md:w-1/3 px-10">
                {activateStateComponent(element.ban)}
              </div>
              <div
                className="w-[20%] flex justify-center px-10 border-10 cursor-pointer xl:hidden"
                onClick={() => handleUserState(element, "changeUserStateModal")}
              >
                {activateActionComponent(element.ban)}
              </div>
            </div>
          ))}
        </div>
        <div className="text-xl mt-4 ml-4 flex justify-between items-center">
          <div className="flex items-center justify-center">
            <div> show Result :</div>
            <div>
              <div className="dropdown dropdown-bottom">
                <label
                  tabIndex={0}
                  className="btn  btn-success w-20 ml-4 text-xl"
                >
                  {maxPage}
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow-md rounded-box w-24 flex items-center justify-center text-xl text-black"
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
            <div>
              <MdKeyboardArrowLeft
                onClick={() => handlePageClick(nowPage - 1)}
              />
            </div>

            {Array.from({ length: userList.total_pages }, (_, index) => (
              <button
                key={index}
                className={`mx-2 ${
                  nowPage === index ? "text-blue-700 font-bold" : ""
                }`}
                onClick={() => handlePageClick(index)}
              >
                {index + 1}
              </button>
            ))}
            <div>
              <MdKeyboardArrowRight
                onClick={() => handlePageClick(nowPage + 1)}
              />
            </div>
          </div>
        </div>
      </div>
      <ChangeUserStateModal
        props={userInfo}
        userList={userList}
        setUserList={setUserList}
        getUserList={getUserList}
      />
      <CheckUserInfoModal props={userInfo} />
    </div>
  );
}
