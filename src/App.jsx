import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Reset } from "styled-reset";
import "./App.css";

import MainPage from "./Pages/MainPage";
import ChatIcon from "./Components/Main/ChatIcon";
import Footer from "./Common/Footer";
import ErrorPage from "./Common/Error";
import AdmimMain from "./Pages/AdminMain";
// import ContentDetail from "./Pages/ContentDetail/";
import ContentCategory from "./Components/Category/CategoryContent";
import DummyContentDetail from "./Components/Category/dummyContentDetail";
import { footerEnabledRecoil } from "./Common/CommonAtom";
import { useRecoilState } from "recoil";

function App() {
  const [footerEnabled] = useRecoilState(footerEnabledRecoil);

  return (
    <BrowserRouter>
      <div className="App">
        <Reset />
        <div className="w-full flex flex-col h-screen">
          <div className=" w-[100%] m-auto flex-1">
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/Admin" element={<AdmimMain />} />
              <Route path="/Category" element={<ContentCategory />} />
              <Route
                path="/ContentDetail/:idx"
                element={<DummyContentDetail />}
              />
              <Route path="/*" element={<ErrorPage to="/" />} />
            </Routes>
          </div>
          <ChatIcon />
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
