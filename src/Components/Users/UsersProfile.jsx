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
          });
        } else {
          // 에러 처리
          console.error("사용자 정보를 불러오는데 실패했습니다.");
        }
        // console.log("데이터", data);
      } catch (error) {
        console.error("오류 발생:", error);
      }
    };

    fetchUserInfo();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className=" relative flex items-center justify-between border-solid border-2 border-custom-light-gray rounded-sm bg-custom-middle-gray w-[60%] h-[250px] ">
      <div className="user-profile w-[25%] ">
        <div className="flex flex-col flex-shrink-1 items-center justify-center user-profile-photo   w-[50%] ">
          {userInfo.profile_image ? (
            <img
              src={userInfo.profile_image}
              alt="User Profile"
              className="absolute translate-x-[50%] translate-y-[-10%] rounded-full"
              style={{ width: "10vw", height: "10vw" }}
            />
          ) : (
            <BiSolidUserCircle
              size="8vw"
              color="9bb0a5"
              className="absolute translate-x-[50%] translate-y-[-25%]"
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

      <div className="flex flex-col justify-center  w-[15%] font-normal text-start text-sm text-white translate-x-[0%] translate-y-[-35%]">
        <p className="text-base font-bold">닉네임</p>
        <p>{userInfo.nickname}</p>
        <br />
        <p className="text-base font-bold">이메일</p>
        <p>{userInfo.email}</p>
      </div>
      <div className="favorite-profile w-[40%]">
        <UserFavoriteContents />
      </div>
      <div className="flex items-center justify-end dropdown dropdown-end profile-setting w-[10%]">
        <label
          tabIndex={0}
          className="btn btn-ghost btn-circle avatar hover:bg-zinc-700"
          style={{
            position: "absolute",
            transform: "translate(-50%, -170%)",
          }}
        >
          <button>
            <FaGear size={22} />
          </button>
        </label>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-28 text-black"
        >
          <li>
            <button onClick={() => setIsModalOpen(true)}>프로필 편집</button>
          </li>
          <li>
            <button>회원탈퇴</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UsersProfile;
