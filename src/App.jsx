import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useState } from "react";
import { Reset } from "styled-reset";
import "./App.css";

import MainPage from "./Pages/MainPage";

import ChatIcon from "./Components/Main/ChatIcon";
import ErrorPage from "./Common/Error";
import AdmimMain from "./Pages/AdminMain";
import ContentDetail from "./Pages/ContentDetail";
import ContentCategory from "./Components/Category/CategoryContent";
import DummyContentDetail from "./Components/Category/dummyContentDetail";

import ContentSite from "./router/ContentSite";
import { AdminSite } from "./router/AdminSite";
const router = createBrowserRouter([
  {
    path: "/",
    element: <ContentSite />,
    errorElement: <ErrorPage to="/" />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: "category",
        element: <ContentCategory />,
      },
      {
        path: "contentDetail/:idx",
        element: <DummyContentDetail />,
      },
      {
        path: "contentDetail",
        element: <ContentDetail />,
      },
    ],
  },

  {
    path: "/admin",
    element: <AdminSite />,
    errorElement: <ErrorPage to="/" />,
    children: [
      {
        index: true,
        element: <AdmimMain />,
      },
    ],
  },
]);
function App() {
  // 기본 로그인 상태 false로 설정
  const [isLoggedIn, setLoggedIn] = useState(true);
  // 로그인 로직 작성 시, setLoggedIn(true)로 설정
  return (
    <RouterProvider router={router} />
    // <BrowserRouter>
    //   <div className="App">
    //     <Reset />
    //     <div className="w-full bg-grey-200 min-h-screen">
    //       <MainNav isLoggedIn={isLoggedIn} />
    //       <Routes>
    //         <Route path="/" element={<MainPage />} />
    //         <Route path="/Admin" element={<AdmimMain />} />
    //         <Route path="/Category" element={<ContentCategory />} />
    //         <Route
    //           path="/ContentDetail/:idx"
    //           element={<DummyContentDetail />}
    //         />
    //         <Route path="/*" element={<ErrorPage to="/" />} />
    //       </Routes>
    //     </div>
    //     <Chat />
    //     {footerEnabled ? (
    //       <div className="w-full flex justify-center">
    //         <div className=" w-[100%] ">
    //           <Footer />
    //         </div>
    //       </div>
    //     ) : null}
    //   </div>
    // </BrowserRouter>
  );
}

export default App;
