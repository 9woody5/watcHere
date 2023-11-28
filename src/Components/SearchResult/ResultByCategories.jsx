import mockData from "../../resources/mockData.json";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { GetData } from "../../Network/Connect";
import Connect from "../../Network/Connect.json";
import { LuChevronDown } from "react-icons/lu";
import { useQuery } from "@tanstack/react-query";

const ResultByCategories = () => {
  // 검색 결과 데이터 연결 함수
  // /api/v1/search?query=avatar&contentType=MOVIE&page=1
  const fetchResultData = async () => {
    let query = searchQuery;
    let type = "MOVIE";
    let page = "1";
    let queryString = `?query=${query}&contentType=${type}&page=${page}`;

    const response = await GetData(Connect["mainUrl"] + Connect["searchData"] + queryString);
    console.log(response.data);
    return response.data;
  };
  // react-query로 데이터 연결 및 관리
  const { data: searchResult } = useQuery({
    queryKey: ["search-result"],
    queryFn: fetchResultData,
  });

  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("query");
  const selectedContent = searchResult?.results
    ? searchResult.results.find((content) =>
        content.title.toLowerCase() === searchQuery ? searchQuery.toLowerCase() : ""
      )
    : [];

  const searchResults = searchResult?.results || [];

  const contents = mockData;
  const category = ["영화", "TV 프로그램"];
  const dataCate = ["movie", "tvshow"];
  const [showAllStates, setShowAllStates] = useState(dataCate.map(() => false));

  const categoriesWithcontent = category
    .map((categoryTitle, index) => {
      let data = contents.filter((content) => content.category === dataCate[index]);

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
      {categoriesWithcontent.map(({ title, data }, index) => {
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
                className="text-white px-3 py-1 bg-zinc-700 rounded-lg hover:bg-zinc-900 transition duration-150 ease-in-out"
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
                  <Link to={`/contentDetail/${content.id}`} className="w-full content_item">
                    <div className="flex items-start h-full w-full">
                      <div className="img_box w-24 h-36 rounded-md overflow-hidden">
                        <img
                          className="w-full h-full object-cover bg-center flex-1"
                          src={content.poster_path}
                          alt={content.title}
                        />
                      </div>
                      <p className="ml-6 flex flex-col text-sm">
                        <span className="text-white block text-lg font-pretendardBold">{content.title}</span>
                        {/* <span className="text-white block">{content.Director}</span> */}
                        {/* <span className="text-white block">{content.Genre}</span> */}
                        {/* <span className="text-white block">{content.Released}</span> */}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
            {!isLastSection && <hr className="opacity-30 mt-4" />}
          </section>
        );
      })}
    </div>
  );
};

export default ResultByCategories;
