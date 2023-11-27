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
import LoginPage from "./Pages/LoginPage";
import OAuth2RedirectHandler from "./Components/Login/OAuth2RedirectHandler";

import UsersPage from "./Pages/UsersPage";
import BookmarkList from "./Components/Users/BookmarkList";
import ResultPage from "./Pages/ResultPage";

function App() {
  return (
    <Router>
      <Reset />
      <Routes>
        <Route path="/" element={<ContentSite />}>
          <Route index element={<MainPage />} />
          <Route path="drama" element={<ContentCategory />} />
          <Route path="movie" element={<ContentCategory />} />
          <Route path="tvShow" element={<ContentCategory />} />
          <Route path="animation" element={<ContentCategory />} />
          <Route path="contentDetail/:idx" element={<ContentDetail />} />
          <Route path="contentDetail" element={<ContentDetail />} />
          <Route path='movie/:id' element={<ContentDetail />} />
          <Route path='tv/:id' element={<ContentDetail />} />
          <Route path="resultpage" element={<ResultPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="oauth/redirect" element={<OAuth2RedirectHandler />} />
          <Route path="mypage" element={<UsersPage />} />
          <Route path="mypage/bookmark-list" element={<BookmarkList />} />
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
