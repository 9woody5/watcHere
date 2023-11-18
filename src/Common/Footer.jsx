import { useRecoilValue } from "recoil";
import { loginPageActiveState } from "../Common/CommonAtom";

export default function Footer() {
  const loginPageActive = useRecoilValue(loginPageActiveState);
  const footerClass = loginPageActive ? "bg-new-color" : "bg-white bg-opacity-10";

  return (
    <footer className={`flex items-center justify-center text-sm h-24 text-white ${footerClass} font-pretendard`}>
      Copyright © 2023 watcHere | All Rights Reserved
    </footer>
  );
}
