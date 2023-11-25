import { Link, useNavigate } from "react-router-dom";
import { BiSolidUserCircle } from "react-icons/bi";
import UseAuth from "./UseAuth";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = UseAuth();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false); // 로그아웃 처리
    navigate("/login");
  };

  return (
    <div className="navbar flex justify-end px-3 h-20 font-pretendard z-50 border-b-1 border-emerald-500">
      <div className="w-[100%] mx-8 flex justify-end items-center">
        {isLoggedIn ? (
          // 로그인 된 상태
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar hover:bg-zinc-700">
              <button className="rounded-full">
                <BiSolidUserCircle size="45" color="9bb0a5" />
              </button>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-28"
            >
              <li>
                <Link to="/mypage">내 정보</Link>
              </li>
              <li>
                <button onClick={handleLogoutClick}>로그아웃</button>
              </li>
            </ul>
          </div>
        ) : (
          // 비로그인 상태
          <button
            onClick={handleLoginClick}
            className="font-pretendard text-white leading-4 w-16 h-8 bg-emerald-500 md:hover:bg-emerald-700 transition-colors rounded flex justify-center items-center"
          >
            로그인
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
