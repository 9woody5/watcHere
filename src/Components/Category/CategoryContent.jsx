// 코어 라이브러리
import { useCallback, useEffect, useState } from "react";

// 더미데이터
import ottList from "../../resources/ottlist.json";

// 커스텀 컴포넌트
import CategorySwiper from "./CategorySwiper";

// 네트워크 라이브러리
import Connect from "../../Network/Connect.json";
import { GetData, GetDataJwt } from "../../Network/Connect";
import { useLocation } from "react-router-dom";

export default function ContentCategory() {
  const location = useLocation();

  const [categoryList, setCategoryList] = useState([]);
  const [ottHotContentList, setOttHotContentList] = useState([]);
  const [ottNewContentList, setOttNewContentList] = useState([]);
  const [ottRatingContentList, setOttRatingContentList] = useState([]);
  const [selectOtt, setSelectOtt] = useState(ottList.ott_list[0]);

  const getCategoryData = useCallback(
    async (sorting, ott) => {
      let page = 1;
      let sort = sorting || "POPULARITY_DESC";
      let provider = ott || "NETFLIX";
      let type = "";
      let anime = false;
      switch (location.pathname) {
        case "/movie":
          type = "MOVIE";
          break;
        case "/tv":
          type = "TV";
          break;
        case "/animation":
          type = "TV";
          anime = true;
          break;
        default:
          type = "MOVIE";
          break;
      }

      let queryString = `?page=${page}&sort=${sort}&provider=${provider}&contentType=${type}&anime=${anime}`;

      const response = await GetData(
        Connect["mainUrl"] + Connect["categoryList"] + queryString
      );
      return response.data.results;
    },
    [location.pathname]
  );

  const getWatchHereData = useCallback(async () => {
    let page = 0;
    let size = 10;
    let queryString = `?page=${page}&size=${size}`;
    let response;

    // api 별로 주소 가 다른 문제
    // 드라마와 애니메이션이 api 가 없기 때문에 임시적으로 다른 데이터를 끼워넣음
    switch (location.pathname) {
      case "/movie":
        response = await GetData(
          Connect["mainUrl"] + Connect["movieClickList"] + queryString
        );
        setCategoryList(response.data.content);
        break;

      case "/tv":
        response = await GetData(
          Connect["mainUrl"] + Connect["tvClickList"] + queryString
        );
        setCategoryList(response.data.content);
        break;
      case "/animation":
        queryString = `?page=1&sort=POPULARITY_DESC&provider=${selectOtt.name}&contentType=MOVIE&anime=true`;
        response = await GetData(
          Connect.mainUrl + Connect.categoryList + queryString
        );
        setCategoryList(response.data.results);
        break;
      default:
        break;
    }
  }, [location.pathname, selectOtt]);

  const handleSelectOtt = async (id) => {
    //여기서 Ott 값을 바꿔 페이지 참조값을 갱신
    setSelectOtt(id);
  };

  const getOttData = useCallback(async () => {
    // selectOtt 값이  변경될때마다 서버에서 ott 데이터를 받아옴
    // network waterfall이 발생 할 수 있으나 사이트 이용 경험상 sekleton component 가 대기하고 있기 때문에
    // 하나라도 빨리 보여주는게 좋을것으로 판단.
    setOttHotContentList(
      await getCategoryData("POPULARITY_DESC", selectOtt.name)
    );
    setOttNewContentList(
      await getCategoryData("RELEASE_DATE_DESC", selectOtt.name)
    );
    setOttRatingContentList(
      await getCategoryData("VOTE_AVERAGE_DESC", selectOtt.name)
    );
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
          <div className="mt-10 text-3xl text-white font-bold">
            👀 watchHere 에서 리뷰 많은 컨텐츠 모아보기
          </div>
          <div className=" flex">
            <CategorySwiper props={categoryList} type={"movie"} />
          </div>
        </div>
        {/* 가운데 버튼 영역 */}
        <div className="mt-20 w-full flex flex-wrap items-center justify-around">
          {ottList.ott_list.map((element, idx) => (
            <button
              className={`border-2 w-80 h-12 m-2 rounded-3xl text-xl font-bold border-[#40AD80] text-white ${
                element.id === selectOtt.id && "bg-emerald-700"
              }`}
              key={idx}
              onClick={() => handleSelectOtt(element)}
            >
              {element.name}
            </button>
          ))}
        </div>
        <div className="mt-10 text-3xl text-white font-bold">
          🔥 지금 {selectOtt.name} 에서 인기 많은 컨텐츠
        </div>
        <div className="flex">
          <CategorySwiper props={ottHotContentList} />
        </div>
        <div className="mt-20 text-3xl text-white font-bold">
          📢 새로 업데이트 된 {selectOtt.name} 컨텐츠
        </div>
        <div className="flex">
          <CategorySwiper props={ottNewContentList} />
        </div>
        <div className="mt-20 text-3xl text-white font-bold">
          ⭐ 높은 평점을 받은 {selectOtt.name} 컨텐츠
        </div>
        <div className="mb-10 flex">
          <CategorySwiper props={ottRatingContentList} />
        </div>
      </div>
    </div>
  );
}
