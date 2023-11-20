import { SwiperComponent } from "../Content/SwiperComponent";
import mockData from "../../resources/mockData.json";

const ResultAll = () => {
  const text = "검색어";
  const contents = mockData;

  return (
    <div>
      <div className="result_wrap">
        <p className="text-xl font-bold text-left text-white">🔎 ‘{text}’의 검색 결과입니다. </p>;
        <SwiperComponent contents={contents} />
      </div>
    </div>
  );
};

export default ResultAll;
