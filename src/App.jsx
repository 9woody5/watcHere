import { BrowserRouter, Route, Routes } from "react-router-dom";

import Main from "./Pages/Main";
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
    <div className="App">
      <Reset />
      <div className="w-full flex justify-center">
        <div className=" w-[80%]">
          <BrowserRouter>
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
