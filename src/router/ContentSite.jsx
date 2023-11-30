import { Outlet, useLocation } from "react-router-dom";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import ChatIcon from "../Components/Chat/ChatIcon";
import { useState } from "react";

export default function ContentSite() {
  const [isChatFormVisible, setIsChatFormVisible] = useState(false);

  const location = useLocation();
  const isHeaderEnabled = !["/", "admin", "/login"].includes(location.pathname);
  const isFooterEnabled = !["/admin"].includes(location.pathname);
  const isChatEnabled = !["/admin", "/login"].includes(location.pathname);
  return (
    <div className="flex flex-col min-h-screen">
      {isHeaderEnabled && <Header />}
      <div className="flex-1">
        <Outlet />
      </div>
      {isChatEnabled && <ChatIcon isChatFormVisible={isChatFormVisible} setIsChatFormVisible={setIsChatFormVisible} />}
      {isFooterEnabled && <Footer />}
    </div>
  );
}
