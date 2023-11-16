import { atom } from "recoil";

export const footerEnabledRecoil = atom({
  key: "fotterenabledRecoil",
  default: true,
});

export const chatState = atom({
  key: "chatState",
  default: {
    isHovered: false,
    isClicked: false,
  },
});
