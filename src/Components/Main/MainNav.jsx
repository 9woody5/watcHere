import { Link, useNavigate } from "react-router-dom";
import { HiSquares2X2 } from "react-icons/hi2";
import { BiSolidUserCircle } from "react-icons/bi";
import UseAuth from "../../Common/UseAuth";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { userInfoState } from "../../Common/CommonAtom";

const MainNav = () => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await fetch("https://kdt-sw-6-team05.elicecoding.com/api/v1/users/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          if (response.ok) {
            setUserInfo({
              nickname: data.nickname,
              email: data.email,
              profile_image: data.profile_image,
            });
          } else {
            console.error("사용자 정보를 불러오는데 실패했습니다.");
          }
        } catch (error) {
          console.error("오류 발생:", error);
        }
      }
    };

    fetchUserInfo();
  }, []);

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
      <div className="navbar flex justify-end px-10 h-20 font-pretendard z-50">
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
                <Link to="/tv">TV</Link>
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
                  {userInfo.profile_image ? (
                    <img
                      src={userInfo.profile_image}
                      alt="User Profile"
                      className="rounded-full"
                      style={{ width: "45px", height: "45px" }}
                    />
                  ) : (
                    <BiSolidUserCircle size="45" color="9bb0a5" />
                  )}
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
    </>
  );
};

export default MainNav;
