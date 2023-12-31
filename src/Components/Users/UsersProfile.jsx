import { useState, useEffect } from "react";
import UserFavoriteContents from "./UserFavoriteContents";
import ProfileEditModal from "./ProfileEditModal";
import { useRecoilState } from "recoil";
import { userInfoState } from "../../Common/CommonAtom";
import { FaGear } from "react-icons/fa6";
import { BiSolidUserCircle } from "react-icons/bi";

const UsersProfile = () => {
  // 사용자 정보를 저장할 상태
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  useEffect(() => {
    // 사용자 정보를 불러오는 함수
    const fetchUserInfo = async () => {
      const token = localStorage.getItem("token"); // 로컬 스토리지에서 토큰 가져오기
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
            full_poster_path: data.poster,
          });
        } else {
          // 에러 처리
          console.error("사용자 정보를 불러오는데 실패했습니다.");
        }
      } catch (error) {
        console.error("오류 발생:", error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleUserDeletion = async () => {
    // 경고창 표시
    const isConfirmed = window.confirm("정말로 탈퇴하시겠습니까?");

    if (isConfirmed) {
      const token = localStorage.getItem("token"); // 토큰 가져오기
      try {
        const response = await fetch(
          "https://kdt-sw-6-team05.elicecoding.com/api/v1/users/me",
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          // 탈퇴 처리 성공
          alert("탈퇴되었습니다.");

          // 로컬 스토리지에서 토큰 삭제
          localStorage.removeItem("token");

          // 메인 페이지로 리다이렉트
          window.location.href = "/";
        } else {
          // 에러 처리
          alert("탈퇴 처리 중 문제가 발생했습니다.");
        }
      } catch (error) {
        console.error("오류 발생:", error);
        alert("오류가 발생했습니다.");
      }
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className=" relative flex items-center justify-between border-solid border-2 border-custom-light-gray rounded-sm bg-custom-middle-gray w-[60%] h-[320px] ">
      <div className="user-profile w-[25%] ">
        <div className="flex flex-col items-center justify-center user-profile-photo  w-[50%] ">
          {userInfo.profile_image ? (
            <img
              src={userInfo.profile_image}
              alt="User Profile"
              className="absolute translate-x-[50%] translate-y-[-8%] rounded-full"
              style={{ width: "10vw", height: "10vw" }}
            />
          ) : (
            <BiSolidUserCircle
              size="10vw"
              color="#9bb0a5"
              className="absolute translate-x-[50%] translate-y-[-8%]"
            />
          )}

          <ProfileEditModal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
          />
        </div>
      </div>

      <div className="flex flex-col justify-center  w-[15%] font-normal text-[15px] text-white translate-x-[0%] translate-y-[-15%]">
        <p className="font-pretendardBold text-lg">닉네임</p>
        <p>{userInfo.nickname}</p>
        <br />
        <p className="text-lg font-pretendardBold">이메일</p>
        <p>{userInfo.email}</p>
      </div>

      <div className="favorite-profile w-[40%] h-[auto]">
        <UserFavoriteContents />
      </div>

      <div className=" dropdown dropdown-end profile-setting w-[10%] translate-y-[-250%] ">
        <label
          tabIndex={0}
          className=" relative btn btn-ghost btn-circle avatar hover:bg-zinc-70 "
        >
          <button className=" ">
            <FaGear size={22} />
          </button>

          <ul
            tabIndex={0}
            className=" absolute top-full left-0 menu menu-sm dropdown-content z-[1] p-2 shadow bg-base-100 text-zinc-600 rounded-box w-28"
          >
            <li>
              <button onClick={() => setIsModalOpen(true)}>프로필 편집</button>
            </li>
            <li>
              <button
                onClick={handleUserDeletion}
                className=" text-red-600 hover:text-red-600"
              >
                회원탈퇴
              </button>
            </li>
          </ul>
        </label>
      </div>
    </div>
  );
};

export default UsersProfile;
