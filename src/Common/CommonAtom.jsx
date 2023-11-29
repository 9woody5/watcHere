//글로벌 스테이트 관리용 리코일 파일
import { atom } from "recoil";

export const loginPageActiveState = atom({
  key: "loginPageActiveState",
  default: false,
});

// 로그인 상태를 위한 atom 정의
export const isLoggedInState = atom({
  key: "isLoggedInState",
  default: false,
});

// 유저 상태 전역으로 관리하기 위한 정의
export const userInfoState = atom({
  key: "userInfoState", // 고유한 키
  default: {
    // 초기 상태
    nickname: "",
    email: "",
    profile_image: "",
  },
});

// 유저가 좋아하는 컨텐츠 전역으로 관리하기 위한 정의
export const userFavoriteContentState = atom({
  key: "userFavoriteContentState",
  default: {}, // 초기 상태를 빈 객체로 설정
});

export const footerEnabledRecoil = atom({
  key: "footerEnabledRecoil",
  default: true,
});

export const navEnabledRecoil = atom({
  key: "navenabledRecoil",
  default: true,
});

export const chatState = atom({
  key: "chatState",
  default: {
    isHovered: false,
    isClicked: false,
  },
});

export const mainNavEnabled = atom({
  key: "mainNavState",
  default: {
    default: false,
  },
});
