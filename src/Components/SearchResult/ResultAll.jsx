import { SwiperComponent } from "../Content/SwiperComponent";
import mockData from "../../resources/mockData.json";
import "./SearchResult.css";

const ResultAll = () => {
  const text = "검색어";
  const contents = mockData;
  const autoplayEnabled = false;

  return (
    <>
      <section className="result_wrap pb-8">
        <p className="text-xl font-bold text-left text-white">🔎 ‘{text}’의 검색 결과입니다. </p>;
        <SwiperComponent customSlidesPerView={5} contents={contents} autoplayEnabled={autoplayEnabled} />
      </section>
      <hr className="opacity-30" />
    </>
  );
};

export default ResultAll;
