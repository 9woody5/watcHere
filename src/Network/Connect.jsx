// 전체적으로 내부 코드의 수정이 필요한 부분입니다.
// 실제 API 와 데이터 연동 없이 CRUD 베이스 통신용 코드 입니다.
// 추후 API 제작시 해당 코드는 변동될 수 있습니다.
// 기본적으로는 다른 컴포넌트에서 Connect.json 과 Connect.js 파일을 임포트 한 후에
// 펑션명+Url + data(object) 으로 보내셔야 합니다.
// 전체적으로 API 나오면 조정작업이 진행됩니다.

// 네트워크 통신용 코드

import axios from "axios";
import { useCookies } from "react-cookie";

const header = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Cache-Control": "no-cache",
};
// 쿠키 구현부 테스트 필요합니다.
export async function PostLogin(url, data) {
  const [, setCookie] = useCookies(["accessToken"]);
  try {
    const response = await axios.post(url, data);
    setCookie("accessToken", response);
    return response;
  } catch (e) {
    console.log(e);
    return false;
  }
}

//통상적으로 데이터를 API 에서 받아올 경우
export async function GetData(url) {
  try {
    const response = await axios.get(url, {
      headers: { ...header },
    });
    return response;
  } catch (e) {
    console.log(e);
    return null;
  }
}

//데이터를 Post 로 보낸 후 결과값이 없고 성공여부만 존재할 경우
export async function PostData(url, data) {
  try {
    await axios.post(url, data).then((e) => {
      return e;
    });
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}
//데이터를 Post 로 보낸후 해당 결과값을 받아와서 표시해야할 경우
export async function PostDataGetResponse(url, data) {
  try {
    const response = await axios.post(url, data);
    return response;
  } catch (e) {
    console.log(e);
    return null;
  }
}
//파라메터 혹은 쿼리스트링에 따른 API 설계에 따라 추후 변경
export async function PutData(url, data) {
  try {
    await axios.put(url, data).then((e) => {
      return e;
    });
    return true;
  } catch (e) {
    console.log(e);
    return null;
  }
}

//파라메터 혹은 쿼리스트링에 따른 API 설계에 따라 추후 변경
export async function DelData(url) {
  try {
    await axios.delete(url).then((e) => {
      return e;
    });
    return true;
  } catch (e) {
    console.log(e);
    return null;
  }
}

// export const kakaoLogin = async (token) => {
//   try {
//     const response = await axios.post(
//       "http://kdt-sw-6-team05.elicecoding.com/login/kakao",
//       { token }
//     );
//     const jwtToken = response.data.jwtToken;
//     localStorage.setItem("jwtToken", jwtToken);
//     axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;

//     // 사용자 정보를 반환한다고 가정합니다.
//     return response.data.user;
//   } catch (err) {
//     console.error("카카오 로그인 에러", err);
//     throw err; // 에러를 던져줌
//   }
// };

// export const kakaoLogin = async (token, history) => {
//   try {
//     const res = await axios.get(
//       `http://kdt-sw-6-team05.elicecoding.com/oauth/redirect?token=${token}`
//     );
//     console.log(res);

//     const ACCESS_TOKEN = res.data.accessToken;
//     localStorage.setItem("token", ACCESS_TOKEN); // 예시로 로컬에 저장
//     history.replace("/"); // 토큰을 받았고 로그인 성공시 메인화면으로 전환
//   } catch (err) {
//     console.log("소셜 로그인 에러", err);
//     window.alert("로그인에 실패하였습니다.");
//     history.replace("/login");
//   }
// };
