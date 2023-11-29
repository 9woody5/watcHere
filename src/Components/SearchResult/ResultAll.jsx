import { SwiperComponent } from "../Content/SwiperComponent";
import { GetData } from "../../Network/Connect";
import Connect from "../../Network/Connect.json";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import "./SearchResult.css";
import noResult from "../../assets/img/no_results.png";

const ResultAll = () => {
  // 기본 이미지 URL
  const baseImageUrl = "https://image.tmdb.org/t/p/w500";
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("query");

  // 이미지 URL을 동적으로 생성하는 함수
  const generateImageUrl = (path) => {
    // 만약 path가 "/"로 시작하지 않으면 그대로 반환
    if (!path || !path.startsWith("/")) {
      return path;
    }

    // "/"로 시작하는 path인 경우 기본 URL과 조합하여 반환
    return `${baseImageUrl}${path}`;
  };
  // 검색 결과 데이터 연결 함수
  const fetchResultData = async () => {
    let query = searchQuery;
    let page = "1";
    let queryString = `?query=${query}&page=${page}`;

    // /api/v1/search/tv?query=%EC%82%AC%EB%9E%8C&page=1
    // tv는 name, 영화는 title

    const responseTV = await GetData(Connect["mainUrl"] + Connect["searchTVData"] + queryString);
    const responseMovie = await GetData(Connect["mainUrl"] + Connect["searchMovieData"] + queryString);

    const dataTV = responseTV.data.results || [];
    const dataMovie = responseMovie.data.results || [];

    // TV와 MOVIE 데이터 합치기
    const combinedData = [
      ...dataMovie.map((item) => ({
        id: item.id,
        title: item.title,
        poster_path: generateImageUrl(item.poster_path),
        runtime: item.runtime,
        director_name: item.director_name,
        release_date: item.release_date,
        popularity: item.popularity,
        type: "movie",
      })),
      ...dataTV.map((item) => ({
        id: item.id,
        title: item.name,
        poster_path: generateImageUrl(item.poster_path),
        director_name: item.director_name,
        first_air_date: item.first_air_date,
        popularity: item.popularity,
        type: "tv",
      })),
    ];

    // popularity 값을 기준으로 내림차순으로 정렬
    const sortedData = combinedData.sort((a, b) => b.popularity - a.popularity);

    const filteredData = sortedData.filter((item) => item.poster_path !== null && item.poster_path !== "");

    return filteredData;
  };

  // react-query로 데이터 연결 및 관리
  const {
    data: combinedData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["search-result-all", searchQuery],
    queryFn: fetchResultData,
    staleTime: 60000,
  });

  const autoplayEnabled = false;
  const searchResults = Array.isArray(combinedData) ? combinedData : [];
  const selectedContent = searchResults.find((content) =>
    content.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <section className="result_wrap pb-8 font-pretendard">
        {isLoading ? (
          <div role="status" className="animate-pulse space-y-0 space-x-8 rtl:space-x-reverse flex items-center">
            <div
              className="flex items-center justify-center w-full bg-zinc-500 rounded-lg dark:bg-gray-700"
              style={{ height: "calc(100vh - 50vh)" }}
            ></div>
            <div
              className="flex items-center justify-center w-full sm:hidden bg-zinc-500 rounded-lg dark:bg-gray-700"
              style={{ height: "calc(100vh - 50vh)" }}
            ></div>
            <div
              className="flex items-center justify-center w-full md:hidden bg-zinc-500 rounded-lg dark:bg-gray-700"
              style={{ height: "calc(100vh - 50vh)" }}
            ></div>
            <div
              className="flex items-center justify-center w-full md:hidden bg-zinc-500 rounded-lg dark:bg-gray-700"
              style={{ height: "calc(100vh - 50vh)" }}
            ></div>
            <div
              className="flex items-center justify-center w-full md:hidden bg-zinc-500 rounded-lg dark:bg-gray-700"
              style={{ height: "calc(100vh - 50vh)" }}
            ></div>
          </div>
        ) : isError || searchResults.length === 0 ? (
          <div className="text-white">
            {isError ? (
              <>
                <div className="text-white">
                  <p>에러가 발생했습니다 😓</p>
                  <p className="mt-2">잠시 후 다시 시도해 주세요</p>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center mt-4 md:mt-12">
                <p className="text-lg font-pretendardBold">‘{searchQuery}’ 에 해당하는 콘텐츠가 없어요😅</p>
                <p className="mt-2">입력하신 검색어를 다시 확인해 주세요</p>
                <div className="w-[400px]">
                  <img src={noResult} alt="no-results" />
                </div>
              </div>
            )}
          </div>
        ) : (
          selectedContent && (
            <>
              <p className="text-xl font-bold text-left text-white">🔎 ‘{searchQuery}’의 검색 결과입니다. </p>;
              <SwiperComponent customSlidesPerView={5} contents={searchResults} autoplayEnabled={autoplayEnabled} />
            </>
          )
        )}
      </section>
      {!isError && searchResults.length > 0 && <hr className="opacity-30" />}
    </>
  );
};

export default ResultAll;
