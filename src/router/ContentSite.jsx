import { Outlet, useLocation } from "react-router-dom";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import ChatIcon from "../Components/Main/ChatIcon";

export default function ContentSite() {
  const location = useLocation();
  const isHeaderEnabled = !["/", "admin", "/login"].includes(location.pathname);
  const isFooterEnabled = !["/admin", "/login"].includes(location.pathname);
  const isChatEnabled = !["/admin", "/login"].includes(location.pathname);
  // const [isLoggedIn, setLoggedIn] = useState(true);
  return (
    <div className="flex flex-col min-h-screen">
      {isHeaderEnabled && <Header />}
      <div className="flex-1">
        <Outlet />
      </div>
      {isChatEnabled && <ChatIcon />}
      {isFooterEnabled && <Footer />}
    </div>
  );
}
