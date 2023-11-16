import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import { Reset } from "styled-reset";
import "./App.css";

import MainNav from "./Components/Main/MainNav";
import MainPage from "./Pages/MainPage";
import Chat from "./Components/Main/Chat";
import Footer from "./Common/Footer";
import ErrorPage from "./Common/Error";
import AdmimMain from "./Pages/AdminMain";
import ContentCategory from "./Components/CategoryContent";
import ContentDetail from "./Pages/ContentDetail/";
import ContentCategory from "./Components/Category/CategoryContent";
import DummyContentDetail from "./Components/Category/dummyContentDetail";
import { footerEnabledRecoil } from "./Common/CommonAtom";
import { useRecoilState } from "recoil";

function App() {
  // 기본 로그인 상태 false로 설정
  const [isLoggedIn, setLoggedIn] = useState(true);
  // 로그인 로직 작성 시, setLoggedIn(true)로 설정
  const [footerEnabled] = useRecoilState(footerEnabledRecoil);
  return (
    <BrowserRouter>
      <div className="App">
        <Reset />
        <div className="w-full flex flex-col h-screen">
          <MainNav isLoggedIn={isLoggedIn} />
          <div className=" w-[90%] m-auto flex-1">
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/Admin" element={<AdmimMain />} />
              <Route path="/Category" element={<ContentCategory />} />
              <Route path="/*" element={<ErrorPage to="/" />} />
            </Routes>
          </div>
          <Chat />
          {/* footer 영역 활성화 확인 */}
          {footerEnabled ? (
            <div className="w-full flex justify-center">
              <div className=" w-[100%] ">
                <Footer />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
