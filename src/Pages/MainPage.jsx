import { useRecoilState } from "recoil";
import MainSearchBar from "../Components/Main/MainSearchBar";
import MainContent from "./../Components/Main/MainContent";
import { mainNavEnabled } from "../Common/CommonAtom";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import MainNav from "../Components/Main/MainNav";

const MainPage = () => {
  // 기본 로그인 상태 false로 설정
  const [isLoggedIn, setLoggedIn] = useState(false);
  // 로그인 로직 작성 시, setLoggedIn(true)로 설정
  const [, setMainNavState] = useRecoilState(mainNavEnabled);
  const location = useLocation();
  const isMainPage = location.pathname === "/";

  useEffect(() => {
    if (isMainPage) {
      setMainNavState(true);
    }
  }, [isMainPage, setMainNavState]);

  return (
    <>
      <MainNav isLoggedIn={isLoggedIn} />
      <MainSearchBar />
      <MainContent numberOfContent={30} />
    </>
  );
};

export default MainPage;
