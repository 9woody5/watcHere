import { useEffect } from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/img/watcHere_logo.svg";

const LoginTitle = () => {
  useEffect(() => {
    const image = new Image();
    image.src = logo;
  }, []);

  return (
    <div className="head-title-wrap mx-[-4rem] my-10 mb-12 text-center flex flex-col first-letter:justify-center items-center font-pretendard">
      <Link to={"/"} className="w-[300px] mx-[-3rem] my-10 mb-12">
        <img src={logo} alt="" />
      </Link>
      <h3 className="flex flex-col gap-2 head-title font-pretendard relative  text-white text-[1.5rem]">
        <span>반가워요!🥳</span>
        <span className="font-pretendardBold">계정을 선택해주세요.</span>
      </h3>
    </div>
  );
};

export default LoginTitle;
