import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import { Reset } from "styled-reset";
import "./App.css";

import MainPage from "./Pages/MainPage";
import Footer from "./Common/Footer";
import ErrorPage from "./Common/Error";
import MainNav from "./Components/MainNav";

function App() {
  // 기본 로그인 상태 false로 설정
  const [isLoggedIn, setLoggedIn] = useState(false);
  // 로그인 로직 작성 시, setLoggedIn(true)로 설정

  return (
    <BrowserRouter>
      <div className="App">
        <Reset />
        <div className="w-full flex flex-col h-screen">
          <MainNav isLoggedIn={isLoggedIn} />
          <div className=" w-[90%] m-auto flex-1">
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/*" element={<ErrorPage to="/" />} />
            </Routes>
          </div>
          <div className="w-full flex justify-center">
            <div className=" w-[100%]">
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
