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
  const [, setFooterEnabled] = useRecoilState(footerEnabledRecoil); // 푸터를 활성화 할지 말지를 결정합니다.
  const [, setNavEnabled] = useRecoilState(navEnabledRecoil); // nav를 활성화 할지 말지를 결정합니다.
  const [, setLoginPageActive] = useRecoilState(loginPageActiveState);

  useEffect(() => {
    setLoginPageActive(true);
    return () => {
      setLoginPageActive(false);
    };
  }, [setLoginPageActive]);

  useEffect(() => {
    setNavEnabled(false); // 로그인페이지는 기본 네브가 비활성화이기 때문에 useEffect 에서 푸터를 비활성화 합니다.
  }, [setNavEnabled]);
  useEffect(() => {
    setFooterEnabled(true); // 로그인페이지는 기본 푸터가 활성화이기 때문에 useEffect 에서 푸터를 활성화 합니다.
  }, [setFooterEnabled]);

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
