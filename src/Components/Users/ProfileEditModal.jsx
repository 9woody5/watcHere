import { useState, useRef } from "react";
import Modal from "react-modal";
import { useRecoilState } from "recoil";
import {
  userInfoState,
  userFavoriteContentState,
} from "../../Common/CommonAtom";
import { IoIosArrowForward } from "react-icons/io";
import { AiFillPlayCircle } from "react-icons/ai";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)", // 오버레이 배경색
    zIndex: 1000, // z-index
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "1px solid #ccc", // 테두리
    background: "#4e4e4e", // 배경색
    overflow: "auto", // 내용이 많을 경우 스크롤
    WebkitOverflowScrolling: "touch",
    borderRadius: "4px", // 모서리 둥글게
    outline: "none",
    padding: "20px", // 패딩
  },
};

const getBackgroundImage = (type) => {
  switch (type) {
    case "NETFLIX":
      return "../src/assets/img/logo/logo_netflix.png";
    case "WATCHA":
      return "../src/assets/img/logo/logo_watcha_rd.png";
    case "WAVVE":
      return "../src/assets/img/logo/logo_wavve.png";
    case "DISNEY_PLUS":
      return "../src/assets/img/logo/logo_disney_plus.png";
    case "PARAMOUNT_PLUS":
      return "../src/assets/img/logo/logo_Paramount_Plus.png";
    default:
      return "";
  }
};

const DropdownItem = ({ serviceName, children, onClick }) => {
  const buttonStyle = {
    backgroundPosition: "16.0485px 50%",
    backgroundRepeat: "no-repeat",
    width: "19.2582px",
    height: "19.2582px",
    borderRadius: "100%",
    objectFit: "cover", // React에서는 'object-fit' 대신 'objectFit'을 사용
  };

  return (
    <li onClick={() => onClick(serviceName)}>
      <div className="flex justify-start">
        <img
          src={getBackgroundImage(serviceName)}
          alt={serviceName}
          style={buttonStyle}
        />
        <p>{children}</p>
      </div>
    </li>
  );
};

const ProfileEditModal = ({ isOpen, onRequestClose }) => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [favoriteContent, setFavoriteContent] = useRecoilState(
    userFavoriteContentState
  );
  const [nickname, setNickname] = useState(userInfo.nickname);
  const [title, setTitle] = useState(""); // 새로운 제목 상태
  const [profileImage, setProfileImage] = useState(userInfo.profile_image);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedServiceName, setSelectedServiceName] = useState("");

  // 드롭다운 토글 함수
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // 드롭다운 아이템 클릭 핸들러
  const handleDropdownItemClick = (serviceName) => {
    setSelectedServiceName(serviceName);
    setDropdownOpen(false); // 드롭다운 닫기
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("nickname", nickname);
    if (fileInputRef.current.files[0]) {
      formData.append("profile_image", fileInputRef.current.files[0]);
    }

    try {
      const response = await fetch(
        "https://kdt-sw-6-team05.elicecoding.com/api/v1/users/me",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            // 'Content-Type' 헤더는 설정하지 않습니다. FormData를 사용할 때 브라우저가 자동으로 설정합니다.
          },
          body: formData,
        }
      );

      const data = await response.json();
      if (response.ok) {
        setUserInfo({ ...userInfo, nickname, profile_image: profileImage });
      } else {
        console.error("프로필 수정 실패: ", data);
      }
    } catch (error) {
      console.error("오류 발생: ", error);
    }

    // Recoil 상태 업데이트
    setFavoriteContent({
      serviceName: selectedServiceName,
      title: title,
    });

    onRequestClose();
  };

  const fileInputRef = useRef();

  // 파일 변경 핸들러
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // 파일을 읽어서 미리보기 URL 생성
      const reader = new FileReader();
      reader.onloadend = () => {
        // 파일 읽기가 끝나면 URL을 profileImage 상태에 저장
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // 버튼 클릭 핸들러
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // 숨겨진 input을 트리거
    } else {
      console.error("File input not initialized");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      ariaHideApp={false}
      style={customStyles}
    >
      <h2
        tabIndex="0"
        className="font-mono mb-5 text-4xl text-white text-center font-normal "
      >
        프로필 편집
      </h2>
      <div className="user-wrap01">
        <div className="flex justify-center items-center ">
          <img
            src={userInfo.profile_image}
            alt="사용자 이미지"
            className="rounded-full w-[150px] h-[150px]"
          />
        </div>
      </div>
      <button
        type="button"
        className="flex justify-center items-center mt-6 mx-auto py-2.5 pr-4.5 pl-0 text-base text-white"
        onClick={handleButtonClick}
      >
        프로필 이미지 변경 <IoIosArrowForward />
      </button>
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
        style={{ display: "none" }} // 숨김 처리
        accept="image/*" // 이미지 파일만 허용
      />
      <div className="profile-wrap02 mx-auto py-2.5 px-0 text-gray-400">
        <label htmlFor="name-change">이름변경</label>
        <input
          id="name-change"
          type="text"
          placeholder="1자~10자까지 가능합니다. (띄어쓰기 포함)"
          className="input-style01 w-[300px] h-[54px] text-sm text-gray-400 mx-5 p-0 px-5 bg-[#2e2e2e] border-none rounded-lg align-middle"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
      </div>

      <div className="flex justify-center items-center mx-auto py-2.5 px-0 text-gray-400 ">
        <div className="dropdown dropdown-start profile-setting">
          <label htmlFor="contents-icons" tabIndex={0}>
            <button onClick={toggleDropdown}>
              {selectedServiceName ? (
                <img
                  src={getBackgroundImage(selectedServiceName)}
                  alt={`${selectedServiceName}`}
                  className="rounded-full w-[50px] h-[50px] object-cover"
                />
              ) : (
                <AiFillPlayCircle size={45} />
              )}
            </button>
          </label>
          {dropdownOpen && (
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-40 text-black"
            >
              <DropdownItem
                serviceName="NETFLIX"
                onClick={handleDropdownItemClick}
              >
                NETFLIX
              </DropdownItem>
              <DropdownItem
                serviceName="WATCHA"
                onClick={handleDropdownItemClick}
              >
                WATCHA
              </DropdownItem>
              <DropdownItem
                serviceName="WAVVE"
                onClick={handleDropdownItemClick}
              >
                WAVVE
              </DropdownItem>
              <DropdownItem
                serviceName="DISNEY_PLUS"
                onClick={handleDropdownItemClick}
              >
                DISNEY PLUS
              </DropdownItem>
              <DropdownItem
                serviceName="PARAMOUNT_PLUS"
                onClick={handleDropdownItemClick}
              >
                PARAMOUNT PLUS
              </DropdownItem>
            </ul>
          )}
        </div>

        <input
          id="contents-title"
          type="text"
          placeholder="영화나 TV 프로그램 제목 입력 (띄어쓰기 포함)"
          className="input-style01 w-[300px] h-[54px] text-sm text-gray-400 m-5 p-0 px-5 bg-[#2e2e2e] border-none rounded-lg align-middle"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <ul className="flex justify-between items-center">
        <div className="w-[200px] h-[52px] text-base leading-[50px] text-white border-none bg-[#5e5e5e] rounded-xl mr-2">
          <a
            href="#"
            onClick={onRequestClose}
            className="flex justify-center items-center"
          >
            취소
          </a>
        </div>
        <div className="w-[200px] h-[52px] text-base leading-[50px] text-white border-none bg-[#40AD80] rounded-xl">
          <a
            href="#"
            onClick={handleSave}
            className="flex justify-center items-center"
          >
            확인
          </a>
        </div>
      </ul>
    </Modal>
  );
};

export default ProfileEditModal;
