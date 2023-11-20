import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  loginPageActiveState,
  navEnabledRecoil,
  footerEnabledRecoil,
} from "../Common/CommonAtom";

import LoginTitle from "../Components/login/LoginTitle";
import LoginButton from "../Components/login/LoginButton";

const LoginPage = () => {
  const [, setLoginPageActive] = useRecoilState(loginPageActiveState);

  useEffect(() => {
    setLoginPageActive(false);
    return () => {
      setLoginPageActive(true);
    };
  }, [setLoginPageActive]);

  return (
    <div className="wrap login-select relative h-screen w-screen bg-cover bg-[url('../src/assets/img/login_background_img.jpeg')]">
      <div className="absolute top-0 left-0 w-[100%] h-[100%] bg-custom-gradient">
        <main className="flex flex-col items-center justify-center">
          <LoginTitle />
          <div className="btn-wrap  text-white font-noto-sans-kr text-[10.699px] mt-[32.097px] mb-[32.097px] w-[445.781px]">
            <LoginButton buttonText="네이버" buttonType="naver" />
            <LoginButton buttonText="카카오" buttonType="kakao" />
            <LoginButton buttonText="구글" buttonType="google" />
            <LoginButton buttonText="애플" buttonType="apple" />
          </div>
        </main>
      </div>
    </div>
  );
};

export default LoginPage;
