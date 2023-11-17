import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Reset } from "styled-reset";
import "./App.css";

import MainPage from "./Pages/MainPage";
import ErrorPage from "./Common/Error";
import AdmimMain from "./Pages/AdminMain";
import ContentDetail from "./Pages/ContentDetail";
import ContentCategory from "./Components/Category/CategoryContent";
import DummyContentDetail from "./Components/Category/dummyContentDetail";
import ContentSite from "./router/ContentSite";
import AdminSite from "./router/AdminSite";

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
  return <RouterProvider router={router} />;
}

export default App;
