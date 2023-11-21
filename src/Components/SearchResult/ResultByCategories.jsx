import mockData from "../../resources/mockData.json";
import { SwiperComponent } from "../Content/SwiperComponent";

const ResultByCategories = () => {
  const contents = mockData;
  const category = ["영화", "드라마", "예능", "애니메이션"];

  return (
    <div>
      <div className="result_wrap">
        <p className="text-xl font-bold text-left text-white">{category[0]}</p>;
        <SwiperComponent contents={contents} />
      </div>
    </div>
  );
};

export default ResultByCategories;
