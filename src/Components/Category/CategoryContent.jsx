// 코어 라이브러리
import { useCallback, useEffect, useState } from "react";

// 더미데이터
import ottList from "../../resources/ottlist.json";

// 커스텀 컴포넌트
import CategorySwiper from "./CategorySwiper";

// 네트워크 라이브러리
import Connect from "../../Network/Connect.json";
import { GetData } from "../../Network/Connect";
import { useLocation } from "react-router-dom";

// 더미데이터
import dummyMovieList from "../../resources/movieInfo.json";

export default function ContentCategory() {
  const location = useLocation();

  const [categoryList, setCategoryList] = useState([]);
  const [ottHotContentList, setOttHotContentList] = useState([]);
  const [ottNewContentList, setOttNewContentList] = useState([]);
  const [ottRatingContentList, setOttRatingContentList] = useState([]);
  const [selectOtt, setSelectOtt] = useState(ottList.ott_list[0]);

  const getCategoryData = useCallback(
    async (sorting, ott) => {
      // const min = 1;
      // const max = 20;
      // const randomValue = Math.floor(Math.random() * (max - min + 1)) + min;
      let page = 1;
      let sort = sorting || "POPULARITY_DESC";
      let provider = ott || "NETFLIX";
      let type = "";
      let anime = false;
      switch (location.pathname) {
        case "/movie":
          type = "MOVIE";
          break;
        case "/drama":
          type = "MOVIE";
          break;
        case "/tv":
          type = "TV";
          break;
        case "/animation":
          type = "TV";
          break;
        default:
          type = "MOVIE";
          break;
      }

      let queryString = `?page=${page}&sort=${sort}&provider=${provider}&contentType=${type}&anime=${anime}`;
      const response = await GetData(Connect["mainUrl"] + Connect["categoryList"] + queryString);
      // 서버에서 데이터를 못받아왔을때 준비된 더미데이터 사용
      if (response !== null) {
        return response.data.results;
      } else {
        return dummyMovieList.movie_list_info;
      }
    },
    [location.pathname]
  );

  const getWatchHereData = useCallback(async () => {
    let page = 1;
    let size = 10;
    let type = "";
    let queryString = `?page=${page}&size=${size}`;
    let response;

    // api 별로 주소 가 다른 문제
    // 드라마와 애니메이션이 api 가 없기 때문에 임시적으로 다른 데이터를 끼워넣음
    switch (location.pathname) {
      case "/movie":
        type = "movieClickList";
        response = await GetData(Connect["mainUrl"] + Connect[type] + queryString);
        if (response !== null) {
          setCategoryList(response.data.content);
        } else {
          setCategoryList(dummyMovieList.movie_list_info);
        }
        break;
      case "/drama":
        response = await getCategoryData("VOTE_AVERAGE_DESC", selectOtt.name);
        if (response !== null) {
          setCategoryList(response);
        } else {
          setCategoryList(dummyMovieList.movie_list_info);
        }
        break;
      case "/tv":
        type = "tvClickList";
        response = await GetData(Connect["mainUrl"] + Connect[type] + queryString);
        if (response !== null) {
          setCategoryList(response.data.content);
        } else {
          setCategoryList(dummyMovieList.movie_list_info);
        }
        break;
      case "/animation":
        response = await getCategoryData("VOTE_AVERAGE_DESC", selectOtt.name);
        if (response !== null) {
          setCategoryList(response);
        } else {
          setCategoryList(dummyMovieList.movie_list_info);
        }
        break;
      default:
        break;
    }

    // // 서버에서 데이터를 못받아왔을때 준비된 더미데이터 사용
    // if (response !== null) {
    //   setCategoryList(response.data.content);
    // } else {
    //   setCategoryList(dummyMovieList.movie_list_info);
    // }
  }, [location.pathname, getCategoryData, selectOtt]);

  const handleSelectOtt = async (id) => {
    //여기서 Ott 값을 바꿔 페이지 참조값을 갱신
    setSelectOtt(id);
  };

  const getOttData = useCallback(async () => {
    // selectOtt 값이  변경될때마다 서버에서 ott 데이터를 받아옴
    // network waterfall이 발생 할 수 있으나 사이트 이용 경험상 sekleton component 가 대기하고 있기 때문에
    // 하나라도 빨리 보여주는게 좋을것으로 판단.
    setOttHotContentList(await getCategoryData("POPULARITY_DESC", selectOtt.name));
    setOttNewContentList(await getCategoryData("RELEASE_DATE_DESC", selectOtt.name));
    setOttRatingContentList(await getCategoryData("VOTE_AVERAGE_DESC", selectOtt.name));
  }, [getCategoryData, selectOtt]);

  useEffect(() => {
    getWatchHereData();
  }, [getWatchHereData]);

  useEffect(() => {
    getOttData();
  }, [getOttData]);

  return (
    <div className="w-full flex items-center justify-center font-pretendard">
      <div className="w-[90%]">
        <div>
          <div className="mt-10 text-3xl text-white font-bold">👀 watchHere 에서 리뷰 많은 컨텐츠 모아보기</div>
          <div className=" flex">
            <CategorySwiper props={categoryList} />
          </div>
        </div>
        {/* 가운데 버튼 영역 */}
        <div className="mt-20 w-full flex flex-wrap items-center justify-around">
          {ottList.ott_list.map((element, idx) => (
            <button
              className={`border-2 w-80 h-12 rounded-3xl text-xl font-bold border-[#40AD80] text-white ${
                element.id === selectOtt.id && "bg-emerald-700"
              }`}
              key={idx}
              onClick={() => handleSelectOtt(element)}
            >
              {element.name}
            </button>
          ))}
        </div>
        <div className="mt-10 text-3xl text-white font-bold">🔥 지금 {selectOtt.name} 에서 인기 많은 컨텐츠</div>
        <div className="flex">
          <CategorySwiper props={ottHotContentList} />
        </div>
        <div className="mt-20 text-3xl text-white font-bold">📢 새로 업데이트 된 {selectOtt.name} 컨텐츠</div>
        <div className="flex">
          <CategorySwiper props={ottNewContentList} />
        </div>
        <div className="mt-20 text-3xl text-white font-bold">⭐ 높은 평점을 받은 {selectOtt.name} 컨텐츠</div>
        <div className="mb-10 flex">
          <CategorySwiper props={ottRatingContentList} />
        </div>
      </div>
    </div>
  );
}
