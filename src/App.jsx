import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Reset } from "styled-reset";
import "./App.css";

import MainPage from "./Pages/MainPage";
import ErrorPage from "./Common/Error";
import AdmimMain from "./Pages/AdminMain";
import ContentDetail from "./Pages/ContentDetail";
import ContentCategory from "./Components/Category/CategoryContent";
import ContentSite from "./router/ContentSite";
import AdminSite from "./router/AdminSite";

function App() {
  return (
    <Router>
      <Reset />
      <Routes>
        <Route path="/" element={<ContentSite />}>
          <Route index element={<MainPage />} />
          <Route path="category" element={<ContentCategory />} />
          <Route path="contentDetail/:idx" element={<ContentDetail />} />
          <Route path="contentDetail" element={<ContentDetail />} />
        </Route>
        <Route path="/admin" element={<AdminSite />}>
          <Route index element={<AdmimMain />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
