import { SwiperComponent } from "../Content/SwiperComponent";
// import mockData from "../../resources/mockData.json";
import { GetData } from "../../Network/Connect";
import Connect from "../../Network/Connect.json";
import "./SearchResult.css";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const ResultAll = () => {
  // 검색 결과 데이터 연결 함수
  // /api/v1/search?query=avatar&contentType=MOVIE&page=1
  const fetchResultData = async () => {
    let query = searchQuery;
    let page = "1";

    // Fetch "MOVIE" data
    let movieQueryString = `?query=${query}&contentType=MOVIE&page=${page}`;
    const movieResponse = await GetData(Connect["mainUrl"] + Connect["searchData"] + movieQueryString);
    const movieData = movieResponse.data.results || [];

    // Fetch "TV" data
    let tvQueryString = `?query=${query}&contentType=TV&page=${page}`;
    const tvResponse = await GetData(Connect["mainUrl"] + Connect["searchData"] + tvQueryString);
    const tvData = tvResponse.data.results || [];

    // Combine "MOVIE" and "TV" data
    const combinedData = [...movieData, ...tvData];

    console.log(combinedData);
    return combinedData;
  };

  // react-query로 데이터 연결 및 관리
  const { data: combinedData } = useQuery({
    queryKey: ["search-result"],
    queryFn: fetchResultData,
  });

  const autoplayEnabled = false;
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("query");
  const searchResults = combinedData?.results || [];
  const selectedContent = searchResults.find((content) =>
    content.title.toLowerCase() === searchQuery ? searchQuery.toLowerCase() : ""
  );

  return (
    <>
      <section className="result_wrap pb-8 font-pretendard">
        {selectedContent ? (
          <>
            {console.log(searchResults)}
            <p className="text-xl font-bold text-left text-white">🔎 ‘{searchQuery}’의 검색 결과입니다. </p>;
            <SwiperComponent
              customSlidesPerView={5}
              contents={searchResults?.results}
              autoplayEnabled={autoplayEnabled}
            />
          </>
        ) : (
          <div className="text-white">
            <p>‘{searchQuery}’ 에 해당하는 콘텐츠가 없어요😅</p>
            <p className="mt-2">입력하신 검색어를 다시 확인해 주세요</p>
          </div>
        )}
      </section>
      <hr className="opacity-30" />
    </>
  );
};

export default ResultAll;
