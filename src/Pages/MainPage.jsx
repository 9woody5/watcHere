import { useRecoilState } from "recoil";
import MainSearchBar from "../Components/Main/SearchBar/MainSearchBar";
import MainContent from "./../Components/Main/MainContent";
import { mainNavEnabled } from "../Common/CommonAtom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import MainNav from "../Components/Main/MainNav";

const MainPage = () => {
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
        <MainNav />
        <div className="min-h-full px-10">
          <MainSearchBar />
          <MainContent numberOfContent={30} />
        </div>
      </div>
    </>
  );
};

export default MainPage;
