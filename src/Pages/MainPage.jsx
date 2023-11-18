import { useRecoilState } from "recoil";
import MainSearchBar from "../Components/Main/MainSearchBar";
import MainContent from "./../Components/Main/MainContent";
import { mainNavEnabled } from "../Common/CommonAtom";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import MainNav from "../Components/Main/MainNav";

const MainPage = () => {
  // 기본 로그인 상태 false로 설정
  const [isLoggedIn, setLoggedIn] = useState(true);
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
      <div className="flex w-full h-full flex-col">
        <MainNav isLoggedIn={isLoggedIn} />
        <div className="min-h-full">
          <MainSearchBar />
          <MainContent numberOfContent={30} />
        </div>
      </div>
    </>
  );
};

export default MainPage;
