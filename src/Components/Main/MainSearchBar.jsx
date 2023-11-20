import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { IoSearchCircleSharp } from "react-icons/io5";
import AutocompleteSuggestions from "./AutocompleteSuggestions";
import RecentSearches from "./RecentSearches";
import logo from "../../assets/img/watcHere_logo.svg";
import mockData from "../../resources/mockData.json";

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
  const navigate = useNavigate();

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

  const handleSuggestionClick = (suggestion) => {
    console.log("출력");
    setSearchValue(suggestion);
    setAutocompleteValue([]);
    navigate("/resultPage");
    addToRecentSearches(suggestion);
    setRecentSearches(getRecentSearches());
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

  const renderRecentSearches = () => {
    if (recentSearches.length > 0) {
      return (
        <>
          <div className="flex justify-between items-center">
            <span className="w-20 h-6 flex justify-center items-center rounded-full text-xs font-pretendardBold text-white bg-emerald-700 ">
              최근 검색
            </span>
            <button
              className="text-xs font-pretendardBold w-14 h-5 text-zinc-400 underline"
              onClick={handleClearAllRecentSearches}
            >
              전체 삭제
            </button>
          </div>
          <ul>
            {recentSearches.map((search, index) => (
              <li className="px-1 text-sm flex justify-between" key={index}>
                <span className="text-black cursor-pointer" onClick={() => handleSuggestionClick(search)}>
                  {search}
                </span>
                <button
                  className="border-emerald-500 border-1 border-solid rounded-lg px-2 text-xs ml-5"
                  onClick={() => handleRemoveRecentSearch(index)}
                >
                  삭제
                </button>
              </li>
            ))}
          </ul>
        </>
      );
    }
  };

  const renderAutocompleteValue = () => {
    return (
      <div className="bg-white w-full h-auto flex flex-col gap-1 pt-10 pb-5 px-4 rounded-b-3xl mt-[-25px]">
        {renderRecentSearches()}
        <span className="w-20 h-6 my-1 flex justify-center items-center rounded-full text-xs font-pretendardBold text-white bg-emerald-700 ">
          연관 콘텐츠
        </span>
        <ul>
          {autoCompleteValue.map((suggestion) => (
            <li className="px-1 text-sm flex" key={suggestion} onClick={() => handleSuggestionClick(suggestion)}>
              <span className="text-black cursor-pointer">{suggestion}</span>
            </li>
          ))}
        </ul>
      </div>
    );
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

  // 아이콘 동적 스타일링
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
          <form className="w-full z-10 absolute" onSubmit={handleSubmit}>
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
            {searchValue && autoCompleteValue.length > 0 && renderAutocompleteValue()}
          </form>
        </div>
      </div>
    </>
  );
};

export default MainSearchBar;
