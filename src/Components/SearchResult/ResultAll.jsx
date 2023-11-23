import { SwiperComponent } from "../Content/SwiperComponent";
import mockData from "../../resources/mockData.json";
import "./SearchResult.css";
import { useLocation } from "react-router-dom";

const ResultAll = () => {
  const autoplayEnabled = false;
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("query");
  const selectedContent = mockData.find((content) =>
    content.Title.toLowerCase() === searchQuery ? searchQuery.toLowerCase() : ""
  );

  return (
    <>
      <section className="result_wrap pb-8 font-pretendard">
        {selectedContent ? (
          <>
            <p className="text-xl font-bold text-left text-white">🔎 ‘{searchQuery}’의 검색 결과입니다. </p>;
            <SwiperComponent customSlidesPerView={5} contents={[selectedContent]} autoplayEnabled={autoplayEnabled} />
          </>
        ) : (
          <p className="text-white">
            <p>‘{searchQuery}’ 에 해당하는 콘텐츠가 없어요😅</p>
            <p className="mt-2">입력하신 검색어를 다시 확인해 주세요</p>
          </p>
        )}
      </section>
      <hr className="opacity-30" />
    </>
  );
};

export default ResultAll;
