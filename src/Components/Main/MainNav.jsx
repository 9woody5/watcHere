import { Link, useNavigate } from "react-router-dom";
import { HiSquares2X2 } from "react-icons/hi2";
import { BiSolidUserCircle } from "react-icons/bi";
import UseAuth from "../../Common/UseAuth";

const MainNav = () => {
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
    <>
      <div className="navbar flex justify-end px-3 h-20 font-pretendard z-50">
        <div className="w-[100%] mx-2 flex justify-end items-center">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle hover:bg-zinc-700 mr-4">
              <button className="category">
                <HiSquares2X2 className="menu-icon" size="35" color="#9bb0a5" />
              </button>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-28"
            >
              <li>
                <Link to="/movie">영화</Link>
              </li>
              <li>
                <Link to="/drama">드라마</Link>
              </li>
              <li>
                <Link to="/tvShow">예능</Link>
              </li>
              <li>
                <Link to="/animation">애니메이션</Link>
              </li>
            </ul>
          </div>
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
                  <Link to="/mypage">
                    <button>내 정보</button>
                  </Link>
                </li>
                <li>
                  <Link to="/login">
                    <button onClick={handleLogoutClick}>로그아웃</button>
                  </Link>
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
    </>
  );
};

export default MainNav;
