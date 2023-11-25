import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { isLoggedInState } from "./CommonAtom";

const UseAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return [isLoggedIn, setIsLoggedIn];
};

export default UseAuth;
