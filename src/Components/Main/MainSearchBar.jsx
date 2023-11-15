import { useNavigate } from "react-router-dom";
import logo from "../../assets/img/watcHere_logo.svg";
import { IoSearchCircleSharp } from "react-icons/io5";
import { useEffect, useState } from "react";

const MainSearchBar = () => {
  // 로고가 동시에 뜨도록
  useEffect(() => {
    const image = new Image();
    image.src = logo;
  }, []);

  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  // 검색 결과 페이지로 이동
  const handleSubmit = (event) => {
    event.preventDefault();
    // 검색어 로직 영역

    // 검색 값이 있을 때만 결과 페이지로 이동시킴
    if (searchValue === "") {
      return;
    } else {
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
              className="input input-bordered rounded-full w-full mt-5 pr-16"
              value={searchValue}
              onChange={handleInputChange}
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
        </div>
      </div>
    </>
  );
};

export default MainSearchBar;
