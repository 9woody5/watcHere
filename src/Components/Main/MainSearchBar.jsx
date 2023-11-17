import { useNavigate } from "react-router-dom";
import logo from "../../assets/img/watcHere_logo.svg";
import { IoSearchCircleSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import mockData from "../../resources/mockData.json";

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

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);

    const suggestions = titles.filter((title) => title.toLowerCase().includes(value.toLowerCase()));
    setAutocompleteValue(suggestions);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchValue(suggestion);
    setAutocompleteValue([]);
    navigate("/resultPage");
  };

  const renderAutocompleteValue = () => {
    return (
      <ul className="">
        {autoCompleteValue.map((suggestion) => {
          <li key={suggestion} onClick={() => handleSuggestionClick(suggestion)}>
            {suggestion}
          </li>;
        })}
      </ul>
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
        <div className="w-[70%] relative">
          <form className="w-full" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="찾고 계신 콘텐츠를 알려주세요 👀"
              className="input rounded-full w-full mt-5 pr-16 transition-all duration-300 ease-in-out hover:ring-2 focus:ring-4 ring-emerald-500 outline-none border-none"
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
            {autoCompleteValue.length > 0 && renderAutocompleteValue}
          </form>
        </div>
      </div>
    </>
  );
};

export default MainSearchBar;
