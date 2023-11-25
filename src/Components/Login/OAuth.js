// const REDIRECT_URL = `http://kdt-sw-6-team05.elicecoding.com/oauth/redirect`;
const REDIRECT_URL = `http://localhost:5173/oauth/redirect`;

const KAKAO = {
  AUTH_URL: `http://kdt-sw-6-team05.elicecoding.com/oauth2/authorization/kakao?redirect_uri=${REDIRECT_URL}`,
};

const GOOGLE = {
  AUTH_URL: `http://kdt-sw-6-team05.elicecoding.com/oauth2/authorization/google?redirect_uri=${REDIRECT_URL}`,
};
const NAVER = {
  AUTH_URL: `http://kdt-sw-6-team05.elicecoding.com/oauth2/authorization/naver?redirect_uri=${REDIRECT_URL}`,
};

export { KAKAO, GOOGLE, NAVER };
