import { useRecoilValue } from "recoil";
import { loginPageActiveState } from "../Common/CommonAtom";

export default function Footer() {
  const loginPageActive = useRecoilValue(loginPageActiveState);
  const footerClass = loginPageActive
    ? "bg-white bg-opacity-10"
    : "bg-new-color";

  return (
    <footer
      className={` border-t border-solid border-1 border-custom-gray flex items-center justify-center text-sm h-16 text-white ${footerClass} font-pretendard`}
    >
      Copyright © 2023 watcHere | All Rights Reserved
    </footer>
  );
}
