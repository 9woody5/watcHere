import dummyUserList from "../resources/userInfo.json";
import {
  ADMIN_MENU_USER_ACTIVATE,
  ADMIN_MENU_USER_BAN,
  ADMIN_MENU_USER_WITHDRAW,
} from "./adminEnum";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
  MdKeyboardArrowRight,
  MdKeyboardArrowLeft,
} from "react-icons/md";
import DateFormat, { TIME_FORMATTER_MM_dd_yy } from "../Common/DateFormat";
import { useEffect, useState } from "react";
import { PostData } from "../Network/Connect";

export default function AdminUserList() {
  const [userList, setUserList] = useState([]);
  /**
   * 서버에서 유저리스트를 받아오는 함수
   *
   * 서버 오류시  Connect 에서  null 을 리턴하게 된다.
   *
   * null 값이 들어올경우에는 임시 json 파일을 로딩해서 정보를 보여준다.
   */
  const getUserData = async () => {
    // const response = await GetData("url");
    const response = null;
    if (response !== null) {
      setUserList(response);
    } else {
      setUserList(dummyUserList.user_data);
    }
  };
  const putUserActivateStatus = async (uid) => {
    // 중간에 모달작업 진행해서 사용자의 최종컨펌을 1회 더 받아야함
    let jsonData = {};
    jsonData["uId"] = uid;
    const response = await PostData("url", JSON.stringify(jsonData));
    console.log(response);
  };
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <div className="h-full bg-gray-300 flex flex-col justify-center">
      <div className="h-2/3 bg-white mx-4">
        <div className="flex mt-10 ">
          <div className="w-[30%] text-2xl font-bold text-center items-center">
            사용자 관리
          </div>
          <div className="w-[70%] flex items-center ">
            <div className="w-[30%] bg-gray-100 mr-4 rounded-sm"> Filters</div>
            <input
              className="border-2 bg-gray-100 rounded-md w-[70%] mr-4 text-sm"
              placeholder="Search by ID, product, or others..."
            />
          </div>
        </div>
        <div className="flex items-center text-center border-y-2 py-4 mt-4 text-xs">
          <div className="w-[20%]">사용자 계정</div>
          <div className="w-[20%]">가입 일자</div>
          <div className="w-[20%]">닉네임</div>
          <div className="w-[20%]">활동 상태</div>
          <div className="w-[20%]">상태 변경</div>
        </div>
        <div className="h-[60%] overflow-y-auto">
          {userList?.map((element, idx) => (
            <div
              className="flex items-center text-center mt-1 border-b-2 py-1 text-xs"
              key={idx}
            >
              <div className="w-[20%]">
                <div className="text-black">{element.email} </div>
                <div>{element.email} </div>
              </div>
              <div className="w-[20%] text-black font-bold">
                {DateFormat(element.join_date, TIME_FORMATTER_MM_dd_yy)}
              </div>
              <div className="w-[20%] text-black font-bold">
                {element.nick_name}
              </div>
              <div className="w-[20%] px-10">
                {activateStateComponent(element.activate)}
              </div>
              <div
                className="w-[20%] flex justify-center px-10 border-10 cursor-pointer"
                onClick={() => putUserActivateStatus(element.uid)}
              >
                {activateActionComponent(element.activate)}
              </div>
            </div>
          ))}
        </div>
        <div className="text-sm mt-4 ml-4 flex justify-between items-center">
          <div className="flex items-center justify-center">
            <div> show Result :</div>
            <div> 리스트박스</div>
          </div>
          <div className="flex items-center justify-center mr-4">
            <div>
              <MdKeyboardDoubleArrowLeft />
            </div>
            <div>
              <MdKeyboardArrowLeft />
            </div>
            <div> 1,2,3,4,5,6</div>
            <div>
              <MdKeyboardArrowRight />
            </div>
            <div>
              <MdKeyboardDoubleArrowRight />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const activateStateComponent = (type) => {
  return (
    <>
      {type === ADMIN_MENU_USER_ACTIVATE && (
        <div className="text-[#0CAF60] bg-[#E7F7EF] p-1">활동 중 </div>
      )}
      {type === ADMIN_MENU_USER_BAN && (
        <div className="text-[#DA0707] bg-[#FFF0F0] p-1">정지 </div>
      )}
      {type === ADMIN_MENU_USER_WITHDRAW && (
        <div className="text-[#2C2C2C] bg-[#F2F2F2] p-1">탈퇴 </div>
      )}
    </>
  );
};

const activateActionComponent = (type) => {
  return (
    <>
      {type === ADMIN_MENU_USER_ACTIVATE && (
        <div className="w-[50%] text-[#DA0707] border-2 border-black">
          정지하기
        </div>
      )}
      {type === ADMIN_MENU_USER_BAN && (
        <div className="w-[50%] text-[#0CAF60] border-2 border-black">
          해제하기
        </div>
      )}
    </>
  );
};
