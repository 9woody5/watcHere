import { useNavigate } from "react-router-dom";
import logo from "../assets/img/watcHere_logo.svg";
import { IoSearchCircleSharp } from "react-icons/io5";
import { useEffect } from "react";

const MainSearchBar = () => {
  // 로고가 동시에 뜨도록
  useEffect(() => {
    const image = new Image();
    image.src = logo;
  }, []);

  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    // 검색어 로직 영역
    navigate("/resultPage");
  };

  const addHoverClass = (event) => {
    const pathElement = event.currentTarget.querySelector("path");
    const circleElement = event.currentTarget.querySelector("circle");
    pathElement.classList.add("hover");
    circleElement.classList.add("hover");
  };

  const removeHoverClass = (event) => {
    const pathElement = event.currentTarget.querySelector("path");
    const circleElement = event.currentTarget.querySelector("circle");
    pathElement.classList.remove("hover");
    circleElement.classList.remove("hover");
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
            />
          </form>
          <button type="submit" onClick={handleSubmit}>
            <i
              style={{ position: "absolute" ,top: "19px", right: "0"}}
              onMouseOver={addHoverClass}
              onMouseLeave={removeHoverClass}
            >
              <IoSearchCircleSharp size="50px" color="40AD80" />
            </i>
          </button>
        </div>
      </div>
    </>
  );
};

export default MainSearchBar;
