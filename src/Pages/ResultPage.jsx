import ResultAll from "../Components/SearchResult/ResultAll";
import ResultByCategories from "../Components/SearchResult/ResultByCategories";

const ResultPage = () => {
  return (
    <div className="px-28 py-10">
      <ResultAll />
      <ResultByCategories />
    </div>
  );
};

export default ResultPage;
