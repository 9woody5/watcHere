import { Outlet } from "react-router-dom";
import Footer from "../Common/Footer";
// import MainNav from "../Components/Main/MainNav";
import ChatIcon from "../Components/Main/ChatIcon";
import { useState } from "react";
export default function ContentSite() {
  const [isLoggedIn, setLoggedIn] = useState(true);
  return (
    <div className="flex flex-col min-h-screen">
      {/* <MainNav /> */}
      <div className="flex-1">
        <Outlet />
      </div>
      <ChatIcon />
      <Footer />
    </div>
  );
}
