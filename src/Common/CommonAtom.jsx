//글로벌 스테이트 관리용 리코일 파일
import { atom } from "recoil";

export const loginPageActiveState = atom({
  key: "loginPageActiveState",
  default: false,
});

// 채팅 닉네임
export const usernameState = atom({
  key: "usernameState",
  default: {
    nickname: "",
    email: "",
  },
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
    full_poster_path: "",
  },
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

/* 컨텐츠 상세페이지 관련 */
// 리뷰 목록
export const reviewsState = atom({
  key: "reviewsState",
  default: [],
});

// 마이 리뷰 목록
export const myReviewState = atom({
  key: "myReviewState",
  default: [],
});

// 리뷰 페이지
export const reviewPageState = atom({
  key: "reviewPageState",
  default: 0,
});
// 리뷰 필터
export const reviewFilterState = atom({
  key: "reviewFilterState",
  default: "createdAt",
});

// 마이 페이지 콘텐츠 좋아요 리스트
export const movieListState = atom({
  key: "movieListState", // 고유한 key
  default: [], // 초기값은 빈 배열
});
