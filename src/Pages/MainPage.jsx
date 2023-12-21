import { useRecoilState } from "recoil";
import MainSearchBar from "../Components/Main/SearchBar/MainSearchBar";
import MainContent from "./../Components/Main/MainContent";
import { mainNavEnabled } from "../Common/CommonAtom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import MainNav from "../Components/Main/MainNav";
import logo from "../assets/img/watcHere_logo.svg";

const MainPage = () => {
  const [, setMainNavState] = useRecoilState(mainNavEnabled);
  const location = useLocation();
  const isMainPage = location.pathname === "/";

  // 로고가 동시에 뜨도록
  useEffect(() => {
    const image = new Image();
    image.src = logo;
  }, []);

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
<<<<<<< HEAD
          <div className="flex justify-center">
=======
          <div className="flex justify-center mb-5">
>>>>>>> 0a8094c027b3d11969c640fbf7a375981643a86d
            <img src={logo} alt="logo" className="w-[300px]" />
          </div>

          <MainSearchBar />
          <MainContent numberOfContent={30} />
        </div>
      </div>
    </>
  );
};

export default MainPage;
