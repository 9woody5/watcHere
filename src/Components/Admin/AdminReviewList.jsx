// 코어 라이브러리
import { useCallback, useEffect, useState } from "react";

// 그래픽 라이브러리
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";

// 커스텀 라이브러리
import DateFormat, { TIME_FORMATTER_MM_dd_yy } from "../../Common/DateFormat";
import { TextOverflow } from "../../Common/TextOverflow";

// 네트워크 라이브러리
import { GetDataJwt } from "../../Network/Connect";
import Connect from "../../Network/Connect.json";
import { DeleteUserReview } from "./AdminModal";

export default function AdminUserList() {
  // const [pageState, usePageState] = useState({
  //   reviewList: [],
  //   nowPage: 0,
  //   maxPage: 10,
  //   reviewData: {},
  // });
  const [reviewList, setReviewList] = useState([]);
  const [nowPage, setNowPage] = useState(0);
  const [maxPage, setMaxPage] = useState(10);
  const [reviewData, setReviewData] = useState({});
  /**
   * 서버에서 유저리스트를 받아오는 함수
   *
   * 서버 오류시  Connect 에서  null 을 리턴하게 된다.
   *
   * null 값이 들어올경우에는 임시 json 파일을 로딩해서 정보를 보여준다.
   */
  const getReviewList = useCallback(async () => {
    let queryString = `?page=${nowPage}&size=${maxPage}`;
    const response = await GetDataJwt(
      Connect.mainUrl + Connect.adminReviewList + queryString
    );

    setReviewList(response.data);
  }, [nowPage, maxPage]);

  /**
   * 구현기능 : 페이지 이동
   *
   * 이슈 : Arrow가 불필요한 시점에 노출되는 문제
   *
   */
  const handlePageClick = (page) => {
    if (page <= 0) {
      setNowPage(0);
    } else if (page >= reviewList.total_pages) {
      setNowPage(reviewList.total_pages - 1);
    } else {
      setNowPage(page);
    }
  };
  const handleViewReview = (content) => {
    setReviewData(content);
    document.getElementById("deleteUserReview").showModal();
  };

  useEffect(() => {
    getReviewList();
  }, [getReviewList]);

  return (
    <div className="h-full bg-gray-300 flex flex-col justify-center">
      <div className="h-2/3 bg-white mx-4">
        <div className="flex mt-10 ">
          <div className="w-[30%] text-2xl font-bold text-center items-center">
            리뷰 관리
          </div>
          <div className="w-[70%] flex items-center">
            <div className="w-[30%] bg-gray-100 mr-4 rounded-sm h-14">
              {" "}
              Filters
            </div>
            <input
              className="border-2 bg-gray-100 rounded-md w-[70%] mr-4 text-sm h-14"
              placeholder="Search by ID, product, or others..."
            />
          </div>
        </div>
        <div className="h-10 mt-10 text-xl flex items-center justify-center text-center">
          <div className="w-[15%] md:hidden">사용자 계정</div>
          <div className="w-[15%] md:hidden">작성 일자</div>
          <div className="w-[10%] md:w-[20%]">닉네임</div>
          <div className="w-[10%] md:w-[20%]">신고 횟수</div>
          <div className="w-[40%] md:w-[60%]">리뷰 내역</div>
        </div>
        <div className="h-[60%] overflow-y-auto mt-4">
          {reviewList.content?.map((element, idx) => (
            <div
              className="flex items-center justify-center text-center mt-1 border-b-2 py-1 text-lg"
              key={idx}
              onClick={() => handleViewReview(element)}
            >
              <div className="w-[15%] xl:w-[20%] md:hidden">
                <div className="text-black">{element.author.email} </div>
                <div>{element.email} </div>
              </div>
              <div className="w-[15%] xl:w-[20%] md:hidden text-black font-bold">
                {/* {DateFormat(element.write_date, TIME_FORMATTER_MM_dd_yy)} */}
              </div>
              <div className="w-[10%] xl:w-[15%] text-black font-bold">
                {element.author.nickname}
              </div>
              <div className="w-[10%] xl:w-[15%] px-10">{element.reports}</div>
              <div className="w-[40%] xl:w-[60%] flex justify-center px-10 border-10 cursor-pointer">
                {TextOverflow(element.detail, 40)}
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
                    <a onClick={() => setMaxPage(20)}>20</a>
                  </li>
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

            {Array.from({ length: reviewList.total_pages }, (_, index) => (
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
      <DeleteUserReview props={reviewData} getReviewList={getReviewList} />
    </div>
  );
}
