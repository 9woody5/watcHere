import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiSolidUserCircle } from "react-icons/bi";
import { useRecoilState } from "recoil";
import { userInfoState } from "../Common/CommonAtom";
import UseAuth from "./UseAuth";
import Hlogo from "../assets/img/H_logo.svg";
import MainSearchBar from "../Components/Main/SearchBar/MainSearchBar";
import "../styles/header.css";

const Header = () => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await fetch(
            "https://kdt-sw-6-team05.elicecoding.com/api/v1/users/me",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
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

  const searchCustomStyle = {
    minWidth: "40vw",
    marginTop: "-87px",
    marginRight: "-80px",
  };

  return (
    <div className="navbar min-w-[540px] px-3 h-20 font-pretendard z-50 border-b-[1px] border-solid border-emerald-500">
      <div className="w-[100%] flex justify-around items-center">
        <div className="ml-8 w-[23px] h-full mr-4">
          <Link to={"/"}>
            <img className="h-[45px]" src={Hlogo} alt="logo" />
          </Link>
        </div>
        <ul className="text-white text-[16px] flex justify-center gap-4">
          <li className="w-[80px]">
            <Link to={"/movie"}>영화</Link>
          </li>
          <li className="w-[80px]">
            <Link to={"/drama"}>드라마</Link>
          </li>
          <li className="w-[80px]">
            <Link to={"/tv"}>예능</Link>
          </li>
          <li className="w-[80px]">
            <Link to={"/animation"}>애니메이션</Link>
          </li>
        </ul>
        <MainSearchBar className="main_search_bar" style={searchCustomStyle} />
        {isLoggedIn ? (
          // 로그인 된 상태
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="btn btn-ghost btn-circle avatar hover:bg-zinc-700"
            >
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
