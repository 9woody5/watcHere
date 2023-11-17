import { atom } from "recoil";

export const loginPageActiveState = atom({
  key: "loginPageActiveState",
  default: false,
});
export const footerEnabledRecoil = atom({
  key: "fotterenabledRecoil",
  default: true,
});
export const navEnabledRecoil = atom({
  key: "navenabledRecoil",
  default: true,
});
