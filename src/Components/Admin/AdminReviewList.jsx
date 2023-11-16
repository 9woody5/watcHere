import dummyReviewList from "../../resources/userreview.json";
import dummyPageNation from "../../resources/pagenition.json";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
  MdKeyboardArrowRight,
  MdKeyboardArrowLeft,
} from "react-icons/md";
import DateFormat, { TIME_FORMATTER_MM_dd_yy } from "../../Common/DateFormat";
import { useEffect, useState } from "react";
// import { PostData } from "../Network/Connect";
import { textOverflow } from "../../Common/TextOverflow";

export default function AdminUserList() {
  const [userList, setUserList] = useState([]);
  const [nowPage, setNowPage] = useState(1);
  const [nowBlock, setNowBlock] = useState(1);
  const [maxBlock, setMaxBlock] = useState(0);
  const [maxPage, setMaxPage] = useState(10);
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
      setUserList(dummyReviewList.user_data);
    }
  };

  /**
   * 페이지 이동을 블록단위로 하는 기능
   * @param {int} block --- 움직일 블록 번호
   */
  const handlePageBlock = (block) => {
    setNowBlock(block);
    setNowPage(1);
  };
  /**
   * 구현기능 : 페이지 이동
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
  // const putUserActivateStatus = async (uid) => {
  //   // 중간에 모달작업 진행해서 사용자의 최종컨펌을 1회 더 받아야함
  //   let jsonData = {};
  //   jsonData["uId"] = uid;
  //   const response = await PostData("url", JSON.stringify(jsonData));
  //   console.log(response);
  // };
  useEffect(() => {
    setMaxBlock(parseInt(dummyPageNation.total_page / maxPage));
    getUserData();
  }, [maxPage]);

  return (
    <div className="h-full bg-gray-300 flex flex-col justify-center">
      <div className="h-2/3 bg-white mx-4">
        <div className="flex mt-10 ">
          <div className="w-[30%] text-2xl font-bold text-center items-center">
            리뷰 관리
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
          <div className="w-[15%]">사용자 계정</div>
          <div className="w-[15%]">작성 일자</div>
          <div className="w-[10%]">닉네임</div>
          <div className="w-[10%]">신고 횟수</div>
          <div className="w-[40%]">리뷰 내역</div>
        </div>
        <div className="h-[60%] overflow-y-auto">
          {userList?.map((element, idx) => (
            <div
              className="flex items-center text-center mt-1 border-b-2 py-1 text-xs"
              key={idx}
            >
              <div className="w-[15%]">
                <div className="text-black">{element.email} </div>
                <div>{element.email} </div>
              </div>
              <div className="w-[15%] text-black font-bold">
                {DateFormat(element.write_date, TIME_FORMATTER_MM_dd_yy)}
              </div>
              <div className="w-[10%] text-black font-bold">
                {element.nick_name}
              </div>
              <div className="w-[10%] px-10">{element.reports}</div>
              <div className="w-[40%] flex justify-center px-10 border-10 cursor-pointer">
                {textOverflow(element.review, 10)}
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
    </div>
  );
}
