import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { IoSearchCircleSharp } from "react-icons/io5";
import SearchRecords from "./SearchRecords";
import logo from "../../../assets/img/watcHere_logo.svg";
import Connect from "../../../Network/Connect.json";
import { GetData } from "../../../Network/Connect";
// import mockData from "../../../resources/mockData.json";

// 초성 검색 기능
const isChosungMatch = (query, target) => {
  const reg = new RegExp(query.split("").map(pattern).join(".*?"), "i");
  const matches = reg.exec(target);
  return Boolean(matches);
};

const reESC = /[\\^$.*+?()[\]{}|]/g;
const reChar = /[가-힣]/;
const reJa = /[ㄱ-ㅎ]/;
const offset = 44032;

const orderOffest = [
  ["ㄱ", 44032],
  ["ㄲ", 44620],
  ["ㄴ", 45208],
  ["ㄷ", 45796],
  ["ㄸ", 46384],
  ["ㄹ", 46972],
  ["ㅁ", 47560],
  ["ㅂ", 48148],
  ["ㅃ", 48736],
  ["ㅅ", 49324],
];

const con2syl = Object.fromEntries(orderOffest);
const pattern = (ch) => {
  let r;
  if (reJa.test(ch)) {
    const begin = con2syl[ch] || (ch.charCodeAt(0) - 12613) * 588 + con2syl["ㅅ"];
    const end = begin + 587;
    r = `[${ch}\\u${begin.toString(16)}-\\u${end.toString(16)}]`;
  } else if (reChar.test(ch)) {
    const chCode = ch.charCodeAt(0) - offset;
    if (chCode % 28 > 0) return ch;
    const begin = Math.floor(chCode / 28) * 28 + offset;
    const end = begin + 27;
    r = `[\\u${begin.toString(16)}-\\u${end.toString(16)}]`;
  } else r = ch.replace(reESC, "\\$&");
  return `(${r})`;
};

const MainSearchBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [autoCompleteValue, setAutocompleteValue] = useState([]);
  const [selectedItemIndex, setSelectedItemIndex] = useState(-1);
  const [isSearchRecordsVisible, setSearchRecordsVisible] = useState(false);
  const navigate = useNavigate();

  // 로고가 동시에 뜨도록
  useEffect(() => {
    const image = new Image();
    image.src = logo;
  }, []);

  // 데이터 연결 함수
  const fetchMostViewedData = async () => {
    let page = 1;
    let sort = "POPULARITY_DESC";
    let provider = "NETFLIX";
    let type = "MOVIE";
    let queryString = `?page=${page}&sort=${sort}&provider=${provider}&contentType=${type}`;

    const response = await GetData(Connect["mainUrl"] + Connect["categoryList"] + queryString);
    return response.data;
  };

  // 전체 데이터는 어떻게 가져오는지?
  const fetchSearchData = async () => {
    let query = searchValue;
    let type = "MOVIE";
    let page = "1";
    let queryString = `?query=${query}&contentType=${type}&page=${page}`;

    const response = await GetData(Connect["mainUrl"] + Connect["searchData"] + queryString);
    return response.data;
  };

  // react-query로 데이터 연결 및 관리
  const { data: mostViewedData } = useQuery({
    queryKey: ["most-viewed-data"],
    queryFn: fetchMostViewedData,
  });

  const { data: searchData } = useQuery({
    queryKey: ["search-data"],
    queryFn: fetchSearchData,
    enabled: searchValue !== "", // Only fetch when searchValue is not empty
  });

  // 검색 영역 내부에 접근할 때만 검색 내역 활성화
  const searchBoxRef = useRef(null);

  const handleSearchBoxClick = (event) => {
    if (searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
      setSearchRecordsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleSearchBoxClick);

    return () => {
      document.removeEventListener("click", handleSearchBoxClick);
    };
  }, []);

  const handleSearchBarClick = () => {
    // 검색 바 클릭 시 검색 결과 활성화
    setSearchRecordsVisible(true);
  };

  const handleKeyDown = (event) => {
    // 방향키 Down
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setSelectedItemIndex((prevIndex) => (prevIndex < autoCompleteValue.length - 1 ? prevIndex + 1 : prevIndex));
    }
    // 방향키 Up
    else if (event.key === "ArrowUp") {
      event.preventDefault();
      setSelectedItemIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
    }
    // 엔터 키
    else if (event.key === "Enter" && selectedItemIndex !== -1) {
      handleSearchInteraction(autoCompleteValue[selectedItemIndex]);
    }
  };

  // 콘텐츠 title가져오기(추후 api주소 수정)
  const titles = mostViewedData?.results ? mostViewedData.results.map((item) => item.title) : [];

  // 검색 기능 로직
  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);

    // searchValue가 0이 되면 키보드 이벤트 초기화
    setSelectedItemIndex(value.length === 0 ? -1 : selectedItemIndex);

    const suggestions = titles.filter(
      (title) => title.toLowerCase().includes(value.toLowerCase()) || isChosungMatch(value, title)
    );
    setAutocompleteValue(suggestions);
  };

  // 로컬 스토리지에 최근 검색 내역 추가하기
  const addToRecentSearches = (searchValue) => {
    const recentSearches = JSON.parse(localStorage.getItem("recentSearches")) || [];
    // 배열에 검색 내역 추가
    recentSearches.unshift(searchValue);
    // 중복된 값 제거, 개수 5개로 제한
    const uniqueRecentSearches = [...new Set(recentSearches)].slice(0, 5);
    localStorage.setItem("recentSearches", JSON.stringify(uniqueRecentSearches));
  };

  // 로컬 스토리지에서 검색 내역 가져오기
  const getRecentSearches = () => {
    return JSON.parse(localStorage.getItem("recentSearches")) || [];
  };

  useEffect(() => {
    // 컴포넌트 마운트 시 로컬 스토리지에서 최근 검색 내역 렌더링
    const recentSearches = getRecentSearches();
    setRecentSearches(recentSearches);
  }, []);

  const [recentSearches, setRecentSearches] = useState([]);

  const handleSearchInteraction = (value, index) => {
    setSearchValue(value);
    setAutocompleteValue([]);
    addToRecentSearches(value);
    setRecentSearches(getRecentSearches());
    setSelectedItemIndex(index);

    const selectedContent = searchData.results.find((content) => content.title === value);
    if (selectedContent) {
      const encodedSearchValue = encodeURIComponent(value);
      navigate(`/resultPage?query=${encodedSearchValue}`);
    }
  };

  const handleClearAllRecentSearches = () => {
    localStorage.removeItem("recentSearches");
    setRecentSearches([]);
  };

  const handleRemoveRecentSearch = (index, e) => {
    e.stopPropagation();
    const updatedRecentSearches = [...recentSearches];
    updatedRecentSearches.splice(index, 1);
    localStorage.setItem("recentSearches", JSON.stringify(updatedRecentSearches));
    setRecentSearches(updatedRecentSearches);
  };

  // 검색 결과 페이지로 이동
  const handleSubmit = (event) => {
    event.preventDefault();

    // 입력 값 인코딩
    const encodedSearchValue = encodeURIComponent(searchValue);

    // 입력된 쿼리 파라미터에 해당되는 결과 페이지로 이동
    navigate(`/resultPage?query=${encodedSearchValue}`);
  };

  // 검색 아이콘 동적 스타일링
  const addHoverClass = (event) => {
    if (searchValue !== "") {
      const pathElement = event.currentTarget.querySelector("path");
      const circleElement = event.currentTarget.querySelector("circle");
      pathElement.classList.add("hover");
      circleElement.classList.add("hover");
    }
  };

  const removeHoverClass = (event) => {
    if (searchValue !== "") {
      const pathElement = event.currentTarget.querySelector("path");
      const circleElement = event.currentTarget.querySelector("circle");
      pathElement.classList.remove("hover");
      circleElement.classList.remove("hover");
    }
  };

  return (
    <>
      <div className="search_box flex flex-col first-letter:justify-center items-center font-pretendard">
        <img src={logo} alt="logo" className="w-[300px]" />
        <div className="search_bar w-[90%] relative" ref={searchBoxRef}>
          <form className="w-full z-20 absolute" onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
            <input
              type="text"
              placeholder="찾고 계신 콘텐츠를 알려주세요 👀"
              className="input rounded-full w-full mt-5 pr-16 transition-all duration-300 ease-in-out hover:ring-2 focus:ring-4 ring-emerald-500 outline-none border-none z-10"
              value={searchValue}
              onChange={handleInputChange}
              autoComplete="true"
              onClick={handleSearchBarClick}
            />
            <button type="submit" disabled={searchValue === ""}>
              <i
                style={{ position: "absolute", top: "19px", right: "0" }}
                onMouseOver={addHoverClass}
                onMouseLeave={removeHoverClass}
              >
                <IoSearchCircleSharp size="50px" color="40AD80" />
              </i>
            </button>
          </form>
          {isSearchRecordsVisible && searchValue && autoCompleteValue.length > 0 && (
            <SearchRecords
              autoCompleteValue={autoCompleteValue}
              handleSearchInteraction={handleSearchInteraction}
              selectedItemIndex={selectedItemIndex}
              setSelectedItemIndex={setSelectedItemIndex}
              recentSearches={recentSearches}
              handleClearAllRecentSearches={handleClearAllRecentSearches}
              handleRemoveRecentSearch={handleRemoveRecentSearch}
              searchValue={searchValue}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default MainSearchBar;
