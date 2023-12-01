import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { loginPageActiveState } from "../Common/CommonAtom";

import LoginTitle from "../Components/Login/LoginTitle";
import LoginButton from "../Components/Login/LoginButton";

const LoginPage = () => {
  const [, setLoginPageActive] = useRecoilState(loginPageActiveState);

  useEffect(() => {
    setLoginPageActive(true);
    return () => {
      setLoginPageActive(false);
    };
  }, [setLoginPageActive]);

  return (
    <div className="font-pretendard wrap flex-1 login-select relative h-[500px] bg-cover bg-[url('../src/assets/img/login_background_img.jpeg')]">
      <div className="absolute top-0 left-0 w-[100%] bg-custom-gradient">
        <main className="flex flex-col items-center justify-center">
          <LoginTitle />
          <div className="btn-wrap text-white mt-[32.097px] mb-[32.097px] w-[445.781px]">
            <LoginButton buttonText="네이버" buttonType="naver" />
            <LoginButton buttonText="카카오" buttonType="kakao" />
            <LoginButton buttonText="구글" buttonType="google" />
          </div>
        </main>
      </div>
    </div>
  );
};

export default LoginPage;
