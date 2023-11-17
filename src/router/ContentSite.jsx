import { Outlet } from "react-router-dom";
import Footer from "../Common/Footer";
import MainNav from "../Components/Main/MainNav";
import Chat from "../Components/Main/Chat";
export default function ContentSite() {
  return (
    <div className="min-h-screen">
      <MainNav />
      <Outlet />
      <Chat />
      <Footer />
    </div>
  );
}
