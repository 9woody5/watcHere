import { useEffect, useState } from "react";

import logo from "../../assets/img/watcHere_logo.svg";

const LoginTitle = () => {
  useEffect(() => {
    const image = new Image();
    image.src = logo;
  }, []);

  return (
    <div className="head-title-wrap mx-[-4rem] my-10 mb-12 text-center flex flex-col first-letter:justify-center items-center font-pretendard">
      <img src={logo} alt="" className="mx-[-4rem] my-10 mb-12" />
      <h3 className="head-title font-noto-sans-kr relative  text-white text-[2.5rem]">
        반가워요!🥳
        <br />
        계정을 선택해주세요.
      </h3>
    </div>
  );
};

export default LoginTitle;
