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
import LoginPage from "./Pages/LoginPage";
import UsersPage from "./Pages/UsersPage";
import { footerEnabledRecoil } from "./Common/CommonAtom";
import { navEnabledRecoil } from "./Common/CommonAtom";
import { useRecoilState } from "recoil";

function App() {
  // 기본 로그인 상태 false로 설정
  const [isLoggedIn, setLoggedIn] = useState(true);
  // 로그인 로직 작성 시, setLoggedIn(true)로 설정
  const [footerEnabled] = useRecoilState(footerEnabledRecoil);
  const [navEnabled] = useRecoilState(navEnabledRecoil);
  return (
    <BrowserRouter>
      <div className="App">
        <Reset />
        <div className="w-full flex flex-col h-screen">
          {navEnabled ? <MainNav isLoggedIn={isLoggedIn} /> : null}
          <div className=" w-[100%] m-auto flex-1">
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/Admin" element={<AdmimMain />} />
              <Route path="/Category" element={<ContentCategory />} />
              <Route path="/Login" element={<LoginPage />} />
              <Route path="/Users" element={<UsersPage />} />
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
