// 필터 기능 추가

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { IoSearchCircleSharp } from "react-icons/io5";
import SearchRecords from "./SearchRecords";
import logo from "../../../assets/img/watcHere_logo.svg";
import mockData from "../../../resources/mockData.json";

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
  // 로고가 동시에 뜨도록
  useEffect(() => {
    const image = new Image();
    image.src = logo;
  }, []);

  const [searchValue, setSearchValue] = useState("");
  const [autoCompleteValue, setAutocompleteValue] = useState([]);
  const [selectedItemIndex, setSelectedItemIndex] = useState(-1);
  const navigate = useNavigate();

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

  // mockData에서 title가져오기
  const titles = mockData.map((item) => item.Title);

  // 검색 기능 로직
  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);

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
    // 중복된 값 제거, 개수 제한(예: 4개)
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
    navigate("/resultPage");
  };

  const handleClearAllRecentSearches = () => {
    localStorage.removeItem("recentSearches");
    setRecentSearches([]);
  };

  const handleRemoveRecentSearch = (index) => {
    const updatedRecentSearches = [...recentSearches];
    updatedRecentSearches.splice(index, 1);
    localStorage.setItem("recentSearches", JSON.stringify(updatedRecentSearches));
    setRecentSearches(updatedRecentSearches);
  };

  // 검색 결과 페이지로 이동
  const handleSubmit = (event) => {
    event.preventDefault();
    // 검색어 로직 영역

    // 검색 값이 있을 때만 결과 페이지로 이동시킴
    if (searchValue !== "") {
      navigate("/resultPage");
    }
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
        <img src={logo} alt="" />
        <div className="w-[90%] relative">
          <form className="w-full z-10 absolute" onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
            <input
              type="text"
              placeholder="찾고 계신 콘텐츠를 알려주세요 👀"
              className="input rounded-full w-full mt-5 pr-16 transition-all duration-300 ease-in-out hover:ring-2 focus:ring-4 ring-emerald-500 outline-none border-none z-10"
              value={searchValue}
              onChange={handleInputChange}
              autoComplete="true"
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
            {searchValue && autoCompleteValue.length > 0 && (
              <SearchRecords
                autoCompleteValue={autoCompleteValue}
                handleSearchInteraction={handleSearchInteraction}
                selectedItemIndex={selectedItemIndex}
                setSelectedItemIndex={setSelectedItemIndex}
                recentSearches={recentSearches}
                handleClearAllRecentSearches={handleClearAllRecentSearches}
                handleRemoveRecentSearch={handleRemoveRecentSearch}
              />
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default MainSearchBar;
