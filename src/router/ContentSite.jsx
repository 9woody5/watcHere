import { Outlet } from "react-router-dom";
import Footer from "../Common/Footer";
import MainNav from "../Components/Main/MainNav";
import ChatIcon from "../Components/Main/ChatIcon";
import { useState } from "react";
export default function ContentSite() {
  const [isLoggedIn, setLoggedIn] = useState(true);
  return (
    // <div className="min-h-screen">
    // <div className="h-screen">
    <div>
      <MainNav />
      <Outlet />
      <ChatIcon />
      <Footer />
    </div>
  );
}
