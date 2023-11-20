import ResultAll from "../Components/SearchResult/ResultAll";
import ResultByCategories from "../Components/SearchResult/ResultByCategories";

const ResultPage = () => {
  return (
    <div className="px-36">
      <ResultAll />
      <ResultByCategories />
    </div>
  );
};

export default ResultPage;
