import { useRecoilValue } from "recoil";
import { loginPageActiveState } from "../Common/CommonAtom";

export default function Footer() {
  const loginPageActive = useRecoilValue(loginPageActiveState);
  const footerClass = loginPageActive
    ? "border-t border-solid border-1 border-custom-gray bg-new-color  "
    : "bg-white bg-opacity-10 ";
  return (
    <footer className={`${footerClass} flex items-center justify-center text-sm h-16 text-white font-pretendard`}>
      Copyright © 2023 watcHere | All Rights Reserved
    </footer>
  );
}
