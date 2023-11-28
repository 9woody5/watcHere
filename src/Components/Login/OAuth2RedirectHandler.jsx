import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OAuth2RedirectHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 인가 코드(토큰) 추출
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token");

    if (token) {
      // 로컬 저장소에 토큰 저장
      localStorage.setItem("token", token);

      // 메인 페이지로 리디렉션
      navigate("/"); // '/'를 메인 페이지 라우트로 대체하세요
    } else {
      // URL에서 토큰이 없는 경우 처리
      console.error("Token not found in URL");
      navigate("/login"); // 로그인 페이지 또는 오류 페이지로 리디렉션 가능
    }
  }, []);

  return <div>로그인 처리 중...</div>;
};

export default OAuth2RedirectHandler;
