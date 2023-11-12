// react-router-dom
// 사이트내 라우팅을 진행합니다.
// Link to 혹은 useNaviagte 를 사용해서 페이지를 전환할 수 있습니다.
import { BrowserRouter, Route, Routes } from "react-router-dom";

import MainSearch from "./Common/Main";
import Footer from "./Common/Footer";
import ErrorPage from "./Common/Error";
//lazy 로딩
// https://react.dev/reference/react/lazy
// 장점 : webpack시에 따로 파일을 분리해서 최초 사이트 로딩시 무거운 데이터 컴포넌트들을 같이 로딩하지 않습니다.
// 사이트 로딩이 빨라지기 때문에 무거운 컴포넌트의 경우에는 가급적 lazy 를쓰면 좋지만 해당 페이지를 눌렀을대 js 엔진이 실행되기 때문에
// 상황에 따라서 컴포넌트를 분리할 수 있다면 꼭 내부 설계에도 분리하여야 합니다.
// 단점 : lazy 를 많이쓰면 해당 페이지를 로딩할때마다 js 파일을 읽어오기 때문에 잘못하면 전체적으로 사이트가 느려보일 수 있습니다.
import { lazy } from "react";
const MainContent = lazy(() => import("./Contents/MainContent"));

function App() {
  return (
    <div className="App">
      <div className="w-full flex justify-center">
        <div className=" w-[80%]">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<MainSearch />} />
              <Route path="/Main" element={<MainContent />} />
              <Route path="/*" element={<ErrorPage to="/"></ErrorPage>}></Route>
            </Routes>
          </BrowserRouter>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <div className=" w-[80%]">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
