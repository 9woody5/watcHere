// 코어 라이브러리
import { useCallback, useEffect, useState } from "react";

// 더미데이터
import ottList from "../../resources/ottlist.json";

// 커스텀 컴포넌트
import CategorySwiper from "./CategorySwiper";

// 네트워크 라이브러리
import Connect from "../../Network/Connect.json";
import { GetData } from "../../Network/Connect";

export default function ContentCategory() {
  const [categoryList, setCategoryList] = useState([]);
  const [ottHotContentList, setOttHotContentList] = useState([]);
  const [ottNewContentList, setOttNewContentList] = useState([]);
  const [ottRatingContentList, setOttRatingContentList] = useState([]);
  const [selectOtt, setSelectOtt] = useState(ottList.ott_list[0]);

  const handleSelectOtt = async (id) => {
    //여기서 Ott 값을 바꿔 페이지 참조값을 갱신
    setSelectOtt(id);
  };
  const getOttData = useCallback(async () => {
    // selectOtt 값이  변경될때마다 서버에서 ott 데이터를 받아옴
    console.log(selectOtt.id);
    setOttHotContentList(await getCategoryData());
    setOttNewContentList(await getCategoryData());
    setOttRatingContentList(await getCategoryData());
  }, [selectOtt]);

  /**
   * 추후 useEffect 에서 페이지 로딩시 데이터를 가져오는 역활
   */
  const pageInitData = useCallback(async () => {
    setCategoryList(await getCategoryData());
  }, []);

  const getCategoryData = async () => {
    const min = 1;
    const max = 20;
    const randomValue = Math.floor(Math.random() * (max - min + 1)) + min;
    let page = randomValue;
    let sort = "POPULARITY_DESC";
    let provider = "NETFLIX";
    let type = "MOVIE";
    let queryString = `?page=${page}&sort=${sort}&provider=${provider}&contentType=${type}`;

    const response = await GetData(
      Connect["mainUrl"] + Connect["categoryList"] + queryString
    );
    return response.data.results;
  };

  useEffect(() => {
    pageInitData();
  }, [pageInitData]);

  useEffect(() => {
    getOttData();
  }, [getOttData]);
  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-[90%]">
        <div>
          <div className="mt-10 text-3xl text-white font-bold">
            👀 watchHere 에서 리뷰 많은 컨텐츠 모아보기
          </div>
          <div className="mt-10 flex">
            <CategorySwiper props={categoryList} />
          </div>
        </div>
        {/* 가운데 버튼 영역 */}
        <div className="mt-10 w-full flex flex-wrap items-center justify-around">
          {ottList.ott_list.map((element, idx) => (
            <button
              className={`my-4 border-2 w-40 h-12 rounded-3xl text-xl font-bold border-[#40AD80] ${
                element.id === selectOtt.id && "bg-[#40AD80] text-white"
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
        <div className="mt-10 flex">
          <CategorySwiper props={ottHotContentList} />
        </div>
        <div className="mt-10 text-3xl text-white font-bold">
          📢 새로 업데이트 된 {selectOtt.name} 컨텐츠
        </div>
        <div className="mt-10 flex">
          <CategorySwiper props={ottNewContentList} />
        </div>
        <div className="mt-10 text-3xl text-white font-bold">
          ⭐ 높은 평점을 받은 {selectOtt.name} 컨텐츠
        </div>
        <div className="mt-10 flex">
          <CategorySwiper props={ottRatingContentList} />
        </div>
      </div>
    </div>
  );
}
