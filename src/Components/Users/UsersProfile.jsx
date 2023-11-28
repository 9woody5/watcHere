import { FaGear } from "react-icons/fa6";

const UsersProfile = () => {
  const getProfileBackgroundImage = () => {
    return 'url("src/assets/img/temporarily-profile-img.jpeg")';
  };

  const profilePhotoStyle = {
    backgroundImage: getProfileBackgroundImage(),
    position: "absolute",
    transform: "translate(50%, -25%)",
    backgroundSize: "135px",
    backgroundRepeat: "no-repeat",
    width: "135px",
    height: "135px",
  };

  return (
    <div className=" relative flex items-center justify-between border-solid border-2 border-custom-light-gray rounded-sm bg-custom-middle-gray w-[60%] h-[250px] ">
      <div className="user-profile w-[33%] ">
        <div className="flex flex-col flex-shrink-1 items-center justify-center user-profile-photo   w-[50%] ">
          <div
            className=" rounded-full "
            style={{ ...profilePhotoStyle }}
          ></div>
          <button
            className="btn btn-ghost avatar hover:bg-zinc-700"
            style={{
              position: "absolute",
              transform: "translate(65%, 150%)",
            }}
          >
            프로필 수정
          </button>
        </div>
      </div>
      <div className="flex flex-col flex-grow-3 w-[33%] font-normal text-center text-sm text-white">
        <h2>닉네임</h2>
        <p>EliceRabbit</p>
        <br />
        <h2>이메일</h2>
        <p>elise@elise.com</p>
      </div>
      <div className="flex items-center justify-end dropdown dropdown-end profile-setting w-[33%]">
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
          className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-28 text-black"
        >
          <li>
            <button>계정변경</button>
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
