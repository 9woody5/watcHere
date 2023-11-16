import { BrowserRouter, Route, Routes } from "react-router-dom";

import Main from "./Pages/Main";
import ContentDetail from "./Pages/ContentDetail";
import Footer from "./Common/Footer";
import ErrorPage from "./Common/Error";
import "./App.css";
import { Reset } from "styled-reset";

function App() {
  return (
    <div className="App">
      <Reset />
      <div className="w-full flex justify-center">
        <div className=" w-[80%]">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/title/" element={<ContentDetail/>} />
              <Route path="/*" element={<ErrorPage to="/"></ErrorPage>}></Route>
            </Routes>
          </BrowserRouter>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <div className=" w-[100%]">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
