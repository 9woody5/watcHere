// import mockData from "../../resources/mockData.json";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { GetData } from "../../Network/Connect";
import Connect from "../../Network/Connect.json";
import { LuChevronDown } from "react-icons/lu";
import { useQuery } from "@tanstack/react-query";
import SkeletonLoader from "./SkeletonLoader";

const ResultByCategories = () => {
  // 기본 이미지 URL
  const baseImageUrl = "https://image.tmdb.org/t/p/w500";

  // 이미지 URL을 동적으로 생성하는 함수
  const generateImageUrl = (path) => {
    // 만약 path가 "/"로 시작하지 않으면 그대로 반환
    if (!path || !path.startsWith("/")) {
      return path;
    }

    // "/"로 시작하는 path인 경우 기본 URL과 조합하여 반환
    return `${baseImageUrl}${path}`;
  };

  // 검색 결과 배열을 랜덤하게 섞는 함수(종합 결과와 겹치지 않게)
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // 검색 결과 데이터 연결 함수
  const fetchResultData = async () => {
    try {
      const maxPage = 3; // 최대 4페이지까지만 가져옴
      let query = searchQuery;
      let allDataTV = [];
      let allDataMovie = [];

      const genreFilter = (data, genre) => {
        return data.filter((item) => item.genres.some((g) => g.toLowerCase() === genre));
      };

      for (let page = 1; page <= maxPage; page++) {
        let queryString = `?query=${query}&page=${page}`;
        const responseTV = await GetData(Connect["mainUrl"] + Connect["searchTVData"] + queryString);
        const responseMovie = await GetData(Connect["mainUrl"] + Connect["searchMovieData"] + queryString);

        const mapData = (item) => ({
          id: item.id,
          title: item.name || item.title,
          poster_path: generateImageUrl(item.poster_path),
          genres: item.genres ? item.genres.map((genre) => genre.name) : [],
          director_name: item.director_name,
          runtime: item.runtime,
        });

        // TV 데이터를 처리
        const dataTV = (responseTV.data.results || []).map((item) => {
          const mappedItem = mapData(item);
          mappedItem.type = "tv"; // type을 'tv'로 설정
          return mappedItem;
        });

        // Movie 데이터를 처리
        const dataMovie = (responseMovie.data.results || []).map((item) => {
          const mappedItem = mapData(item);
          mappedItem.type = "movie"; // type을 'movie'로 설정
          return mappedItem;
        });

        allDataTV = [...allDataTV, ...dataTV];
        allDataMovie = [...allDataMovie, ...dataMovie];
      }

      const filteredDataTV = allDataTV.filter((item) => item.poster_path !== null && item.poster_path !== "");
      const filteredDataMovie = allDataMovie.filter((item) => item.poster_path !== null && item.poster_path !== "");

      const animationDataTV = genreFilter(filteredDataTV, "애니메이션");
      const nonAnimationDataTV = filteredDataTV.filter((item) => !animationDataTV.includes(item));

      const animationDataMovie = genreFilter(filteredDataMovie, "애니메이션");
      const nonAnimationDataMovie = filteredDataMovie.filter((item) => !animationDataMovie.includes(item));

      const suffledDataTV = shuffleArray(nonAnimationDataTV);
      const suffledDataMovie = shuffleArray(nonAnimationDataMovie);

      return {
        dataTV: suffledDataTV,
        dataMovie: suffledDataMovie,
        dataAnime: shuffleArray([...animationDataTV, ...animationDataMovie]),
      };
    } catch (error) {
      console.error("데이터 조회 에러", error);
      throw error;
    }
  };

  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("query");
  const category = ["영화", "드라마", "예능", "애니메이션"];
  const dataCate = ["movie", "drama", "tvshow", "anime"];
  const [showAllStates, setShowAllStates] = useState(dataCate.map(() => false));

  // react-query로 데이터 연결 및 관리
  const { data: searchResults = { dataTV: [], dataMovie: [], dataAnime: [] }, isLoading } = useQuery({
    queryKey: ["search-result-by-categories", searchQuery],
    queryFn: fetchResultData,
    staleTime: 60000,
  });

  const categoriesWithcontent = category
    .map((categoryTitle, index) => {
      let data;
      switch (dataCate[index]) {
        case "movie":
          data = searchResults.dataMovie || [];
          break;
        case "drama":
          data = searchResults.dataTV || [];
          break;
        case "anime":
          data = searchResults.dataAnime || [];
          break;
        default:
          data = [];
      }
      return {
        title: categoryTitle,
        data,
      };
    })
    .filter((category) => category.data.length !== 0);

  const handleShowAllToggle = (index) => {
    const newShowAllStates = [...showAllStates];
    newShowAllStates[index] = !newShowAllStates[index];
    setShowAllStates(newShowAllStates);
  };

  return (
    <div>
      {isLoading ? (
        // 로딩 중일 때 스켈레톤 UI를 표시
        <>
          <SkeletonLoader />
        </>
      ) : (
        categoriesWithcontent.map(({ title, data }, index) => {
          // 마지막 섹션일 땐 hr태그 제거
          const isLastSection = index === categoriesWithcontent.length - 1;
          const displayedData = showAllStates[index] ? data : data.slice(0, 6);

          return (
            <section key={index} className="result_wrap mt-14 font-pretendard">
              <div className="headline flex justify-between items-center">
                <div className="title flex items-center">
                  <h3 className="text-xl font-bold text-left text-white ml-6 mr-1">{title}</h3>
                  <span className="text-white">({data.length})건</span>
                </div>
                <button
                  onClick={() => handleShowAllToggle(index)}
                  className={`text-white px-3 py-1 bg-zinc-700 rounded-lg "hover:bg-zinc-900 transition duration-150 ease-in-out  ${
                    data.length < 7 ? "hidden" : ""
                  }`}
                >
                  <LuChevronDown
                    size={20}
                    color="white"
                    style={{
                      transform: `rotate(${showAllStates[index] ? -180 : 0}deg)`,
                      transition: "transform 0.3s ease-in-out",
                    }}
                  />
                </button>
              </div>
              <ul className="mt-4 flex flex-wrap">
                {displayedData.map((content, contentIndex) => (
                  <li
                    key={contentIndex}
                    className=" flex items-center mb-2 w-1/3 hover:bg-zinc-900 p-3 rounded-lg transition duration-150 ease-in-out"
                  >
                    <Link to={`/${content.type}/${content.id}`} className="w-full content_item">
                      <div className="flex items-start h-full w-full">
                        <div className="img_box w-24 h-36 rounded-md overflow-hidden">
                          <img
                            className="w-full h-full object-cover bg-center flex-1"
                            src={content.poster_path}
                            alt={content.title}
                            loading="lazy"
                          />
                        </div>
                        <p className="ml-6 flex flex-col text-sm w-[50%]">
                          <span className="text-white block text-lg font-pretendardBold">{content.title}</span>
                          {content.director_name && (
                            <span className="text-white  block">감독: {content.director_name}</span>
                          )}
                          {content.runtime && <span className="text-white  block">러닝타임: {content.runtime}분</span>}
                          {content.first_air_date && (
                            <span className="text-white  block">방영일: {content.first_air_date}</span>
                          )}
                          {content.release_date && (
                            <span className="text-white  block">개봉일: {content.release_date}</span>
                          )}
                          {content.genres && content.genres.length > 0 && (
                            <span className="text-white  block">장르: {content.genres[0]}</span>
                          )}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
              {!isLastSection && <hr className="opacity-30 mt-4" />}
            </section>
          );
        })
      )}
    </div>
  );
};

export default ResultByCategories;
