import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import { Reset } from "styled-reset";
import "./App.css";

import MainPage from "./Pages/MainPage";
import Footer from "./Common/Footer";
import ErrorPage from "./Common/Error";
import "./App.css";
import { Reset } from "styled-reset";
import AdmimMain from "./admin/Main";
import { footerEnabledRecoil } from "./Common/CommonAtom";
import { useRecoilState } from "recoil";
function App() {
  const [footerEnabled] = useRecoilState(footerEnabledRecoil);
  return (
    <BrowserRouter>
      <div className="App">
        <Reset />
        <div className="w-full flex flex-col h-screen">
          <MainNav isLoggedIn={isLoggedIn} />
          <div className=" w-[90%] m-auto flex-1">
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/Admin" element={<AdmimMain />} />
              <Route path="/*" element={<ErrorPage to="/"></ErrorPage>}></Route>
            </Routes>
          </BrowserRouter>
        </div>
      </div>
      {footerEnabled ? (
        <div className="w-full flex justify-center">
          <div className=" w-[80%] ">
            <Footer />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
