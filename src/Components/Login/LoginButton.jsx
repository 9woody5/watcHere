import React from "react";

const LoginButton = ({ buttonText, buttonType }) => {
  // 이벤트 핸들러 함수
  const handleLogin = (type) => {
    console.log(`${type} 로그인 시도`);
    // 여기에 로그인 로직 추가
  };
  const getBackgroundImage = (type) => {
    switch (type) {
      case "naver":
        return 'url("../src/assets/img/logo/naver_icon.png")';
      case "kakao":
        return 'url("../src/assets/img/logo/free-icon-kakao-talk-3991999.png")';
      case "google":
        return 'url("../src/assets/img/logo/free-icon-google-2991148.png")';
      case "apple":
        return 'url("../src/assets/img/logo/imgbin_apple-logo-png.png")';
      default:
        return "none";
    }
  };

  const buttonStyle = {
    backgroundImage: getBackgroundImage(buttonType),
    backgroundPosition: "16.0485px 50%",
    backgroundRepeat: "no-repeat",
    backgroundSize: "19.2582px",
  };

  return (
    <div>
      <button
        className={`block bg-transparent border border-custom-gray rounded-sm cursor-pointer font-normal text-center text-[14.2618px] h-[52.0781px] w-[445.781px] py-[17.9208px] mb-[15.699px] custom-background-class hover:border-custom-light-gray hover:text-custom-hover-gray icon-${buttonType}`}
        style={buttonStyle}
        onClick={() => handleLogin(buttonType)}
      >
        {buttonText}로 시작하기
      </button>
    </div>
  );
};

export default LoginButton;
