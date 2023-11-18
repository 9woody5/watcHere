import { atom } from "recoil";

export const loginPageActiveState = atom({
  key: "loginPageActiveState",
  default: false,
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
